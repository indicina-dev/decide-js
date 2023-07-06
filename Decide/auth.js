/* eslint-disable no-undef */
import winston from 'winston';
import { LOGIN_URL } from "./globalVar.js"
import { DecideException } from './decideException.js'
import axios from 'axios'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ]
});

async function fetchAuthCode(url) {
  const client_id = process.env.INDICINA_CLIENT_ID;
  const client_secret = process.env.INDICINA_CLIENT_SECRET;

  logger.info('Fetching authorization token...');
  const options = {
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({ client_id, client_secret })
  }

  try {
    const response = await axios.request(options)
    if (response?.data?.status !== 'success') {
      throw new Error('Unable to fetch auth code.')
    }
    return response?.data?.data?.token
  } catch (error) {
    throw new DecideException(
      `Failed to fetch auth code. HTTP status: ${error.data}; Message: ${error?.message}`
    )
  }
}

class Auth {
  static __instance = null
  _code = null

  constructor() {
    if (!Auth.__instance) {
      Auth.__instance = this
    }
    return Auth.__instance
  }

  async refresh() {
    try {
      this._code = await fetchAuthCode(LOGIN_URL)
    } catch (error) {
      throw new DecideException('Error occurred while refreshing token', error);
    }
  }

  get code() {
    if (!this._code) {
      throw new Error(
        'Auth code not available. Call refresh() to fetch the code.'
      )
    }
    return this._code
  }

  set code(code) {
    throw new Error('You cannot set this value.')
  }
}

export { Auth }
