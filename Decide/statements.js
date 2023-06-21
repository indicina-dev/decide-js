import { Analysis } from './analysis.js'
import { DecideClient } from './decideClient.js'
import { Customer } from './customer.js'
import { Currency, StatementType } from './enums.js'

class DecideStatement {
  constructor (path, content_type) {
    this.client = new DecideClient(path, content_type)
  }

  analyzeJSON ({ format, statement, customer }) {
    const customerJson = {
      id: customer.customer_id
    }
    const requestBody = {
      customer: customerJson,
      bankStatement: {
        type: format,
        content: statement
      }
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
        const { jobId } = jsonResponse?.data
        return new Analysis(
          jsonResponse?.data,
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
