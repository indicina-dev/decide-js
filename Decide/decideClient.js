import { Auth } from './auth.js'
import { BASE_URL } from './globalVar.js'
import fetch from 'isomorphic-fetch'
import { DecideException } from './decideException.js'
import FormData from 'form-data'
import fs from 'fs'

class DecideClient {
  constructor (path, content_type) {
    this.path = path
    this.content_type = content_type
    this.auth = new Auth()
  }

  async _req (method, kwargs) {
    const url = BASE_URL
    const full_path = new URL(this.path, url).toString()
    const headers = {
      ...this.headers,
      ...kwargs?.headers
    }

    let response = await fetch(full_path, {
      method,
      headers,
      body: kwargs?.body,
    })

    if (response.status === 401) {
      this.auth.refresh() // refresh token
      response = await fetch(full_path, {
        method,
        headers,
        body: kwargs.body,
      })
    }

    if (response.status !== 200) {
      throw new DecideException(response.status, await response.text())
    }

    return response
  }

  get headers () {
    return {
      Authorization: `Bearer ${this.auth.code}`,
      'content-type': 'application/json'
    }
  }

  set headers (headers) {
    throw new Error('You cannot assign a value to the headers.')
  }

  async get (kwargs) {
    const response = await this._req('GET', kwargs)
    return response.json()
  }

  async json ({ customer, bankStatement }) {
    const response = await this._req('POST', {
      body: JSON.stringify({ customer, bankStatement })
    })
    return response.json()
  }

  async pdf({file, bankCode, currency, password, customerId, modelName = 'bsp'}) {
  
    const formData = new FormData()
    formData.append('pdf', file)
    formData.append('bank_code', bankCode)
    formData.append('currency', currency)
    formData.append('customer_id', customerId)
    formData.append('model_name', modelName)
    if (password) {
      formData.append('password', password)
    }

    const headers = formData.getHeaders();

    // let response
    const response = await this._req('POST', { body: formData, headers });

    return response.json()
  }

  async csv({file, customerId}) {
    const formData = new FormData()
    formData.append('file_statement', file)
    formData.append('customer[id]', customerId)

    const headers = formData.getHeaders();

    const response = await this._req('POST', { body: formData, headers });

    return response.json()
  };

  async put (kwargs) {
    const response = await this._req('PUT', kwargs)
    return response.json()
  }
}

export { DecideClient }
