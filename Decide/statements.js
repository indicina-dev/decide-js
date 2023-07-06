import { Analysis } from './analysis.js'
import { DecideClient } from './decideClient.js'

class DecideStatement {
  constructor (path, content_type) {
    this.client = new DecideClient(`client/${path}`, content_type)
  }

  analyzeJSON ({ format, statement, customer, scorecardIds }) {
    const customerJson = {
      id: customer.customer_id
    }
    const requestBody = {
      customer: customerJson,
      bankStatement: {
        type: format,
        content: statement
      },
      scorecardIds: scorecardIds
    }
    return this.client.json(requestBody).then(jsonResponse => {
      return new Analysis(jsonResponse.data, jsonResponse.status, 'JSON')
    })
  }

  analyzePDF ({
    file,
    customerId,
    bankCode,
    currency,
    password,
    modelName
  }) {
    return this.client
      .pdf({ file, customerId, bankCode, currency, password, modelName })
      .then(jsonResponse => {
        const { jobId } = jsonResponse.data
        return new Analysis(
          jsonResponse?.data?.decideResponse,
          jsonResponse?.data?.status,
          'PDF',
          jobId
        )
      })
  }

  analyzeCSV ({
    file, 
    customer,
  }) {

    return this.client.csv({file, customerId: customer.customer_id}).then(jsonResponse => {
      return new Analysis(
        jsonResponse.data,
        jsonResponse.status,
        'CSV'
      )
    })
  }

 
  build_request_body () {
    throw new Error('Not implemented')
  }
}

class PDFStatement extends DecideStatement {
  constructor () {
    super('pdf/extract', 'multipart/form-data')
  }
}

class CSVStatement extends DecideStatement {
  constructor () {
    super('bsp/file', 'multipart/form-data')
  }
}

class JSONStatement extends DecideStatement {
  constructor () {
    super('bsp', 'application/json')
  }
}

export { DecideStatement, PDFStatement, CSVStatement, JSONStatement }
