import winston from 'winston'
import { Auth } from './auth.js'
import { BASE_URL } from './globalVar.js'
import fetch from 'isomorphic-fetch'
import { DecideException, IllegalAssignmentException } from './decideException.js'
import FormData from 'form-data'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()]
})

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
      body: kwargs?.body
    })

    if (response.status === 401) {
      await this.auth.refresh() // Refresh the authentication token
      headers.Authorization = `Bearer ${this.auth.code}` // Update the authorization header
      response = await fetch(full_path, {
        method,
        headers,
        body: kwargs?.body
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

  async get () {
    try {
      const response = await this._req('GET')
      if (!response.ok) {
        throw new DecideException(response.status, await response.text())
      }
      return response.json()
    } catch (error) {
      throw new DecideException(500, error.message)
    }
  }

  async post (data) {
    const response = await this._req('POST', {
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async json ({ customer, bankStatement, scorecardIds }) {
    const response = await this._req('POST', {
      body: JSON.stringify({ customer, bankStatement, scorecardIds })
    })
    return response.json()
  }

  async getPdfAnalysis () {
    try {
      logger.info('Fetching analysis...')
      let pdf_analysis
      while (
        (pdf_analysis = await this.pdf_client.get())?.data?.status !== 'DONE'
      ) {
        await new Promise(resolve => setTimeout(resolve, 30000))
        logger.info('Analysis fetched. Retrieving PDF analysis...')
      }
      return pdf_analysis
    } catch (error) {
      throw new DecideException(500, error.message)
    }
  }

  async pdf ({
    file,
    bankCode,
    currency,
    password,
    customerId,
    modelName = 'bsp'
  }) {
    const formData = new FormData()
    formData.append('pdf', file)
    formData.append('bank_code', bankCode)
    formData.append('currency', currency)
    formData.append('customer_id', customerId)
    formData.append('model_name', modelName)
    if (password) {
      formData.append('password', password)
    }

    const headers = formData.getHeaders()
    const response = await this._req('POST', { body: formData, headers })
    const { jobId } = await response.json().data

    if (!jobId) {
      throw new IllegalAssignmentException('Failed to assign job ID')
    }

    this.pdf_client = new DecideClient(
      `client/pdf/extract/${jobId}/status`,
      'multipart/form-data'
    )

    const pdf_analysis = await this.getPdfAnalysis()
    return pdf_analysis
  }

  async csv ({ file, customerId }) {
    const formData = new FormData()
    formData.append('file_statement', file)
    formData.append('customer[id]', customerId)

    const headers = formData.getHeaders()

    const response = await this._req('POST', { body: formData, headers })

    return response.json()
  }

  async put (kwargs) {
    const response = await this._req('PUT', kwargs)
    return response.json()
  }


  async patch (body) {
    const response = await this._req('PATCH', { body: JSON.stringify(body) })
    return response.json()
  }

  async delete (kwargs) {
    const response = await this._req('DELETE', kwargs)
    return response.json()
  }
}

export { DecideClient }
