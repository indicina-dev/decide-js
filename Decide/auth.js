

import {MAX_RETRIES, LOGIN_URL} from "./globalVar.js"
import { DecideException  } from './decideException.js'
import axios from 'axios'
// const axios = require('axios')
const adapter = { retry: { retries: MAX_RETRIES } }

async function fetchAuthCode (url) {
  const client_id = 'dammytest'
  const client_secret = 'QQMK6EX-FDZ434Y-H5TQVMB-6M0MCD4'
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
  } catch (error) {x
    throw new DecideException(
      `Failed to fetch auth code. HTTP status: ${error.data}; Message: ${error?.message}`
    )
  }
}

class Auth {
  static __instance = null
  _code = null

  constructor () {
    if (!Auth.__instance) {
      Auth.__instance = this
    }
    return Auth.__instance
  }

  refresh() {
    try {
      // Used to refresh token
      this._code = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA4MDMxYjM1MmIifQ.eyJhdWQiOiJhM2JiMTIxNy1kMTg0LTQ4MzctYWExYy1hZWZmZjkwNTdmMDkiLCJleHAiOjE2ODcxODA4MTMsImlhdCI6MTY4NzE3NzIxMywiaXNzIjoib3JpZ2luYXRlLm5nIiwic3ViIjoiZTZlMDI0NzgtM2JkOC00Mjg2LWFlNzktN2ZjYTc1NTQwNTU1IiwianRpIjoiY2FmOGIwZWUtNmVjZi00YWFlLWI5M2ItM2IwNDVhNjRkMGNhIiwiYXV0aGVudGljYXRpb25UeXBlIjoiUEFTU1dPUkQiLCJlbWFpbCI6ImpvaG5zb24uYWRlYml5aUBpbmRpY2luYS5jbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhcHBsaWNhdGlvbklkIjoiYTNiYjEyMTctZDE4NC00ODM3LWFhMWMtYWVmZmY5MDU3ZjA5Iiwicm9sZXMiOltdLCJzaWQiOiI4NzEzMTZjMS1iNDBhLTQzOGMtYjE0OC01NDVjNjExYWRiZDgiLCJhdXRoX3RpbWUiOjE2ODcxNzcyMTMsInRpZCI6IjFhNjhhNjkwLTljMGUtNGMyYi04ZTNhLTYxM2YzZWIzYjhhNiIsIm1lcmNoYW50U2x1ZyI6ImluZGljaW5hIiwidXNlcklkIjoiNjQ1NTFiODA4NWE2MGI2MGEwYjEzNzI3IiwiYWNjb3VudElkIjoiNjQ1M2M2ODhlZWE5MDAzYTA0MGM1NDA5IiwidGVuYW50SWQiOiIxYTY4YTY5MC05YzBlLTRjMmItOGUzYS02MTNmM2ViM2I4YTYiLCJzbHVnIjoiaW5kaWNpbmEifQ.6KyWcOLtDHLeh87B963cPXzokeuYmh833IJZpweRTKQ"
    } catch (error) {
      throw new DecideClientException('Error occurred while refreshing token', error);
    }
  }
  

  get code () {
    if (!this._code) {
      throw new Error(
        'Auth code not available. Call refresh() to fetch the code.'
      )
    }
    return this._code
  }

  set code (code) {
    throw new IllegalAssignmentException('You cannot set this value.')
  }
}

export { Auth }