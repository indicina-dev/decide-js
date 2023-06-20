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
        // const jobID = jsonResponse?.data?.id || null
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

  // analyze(callback) {
  //   this.build_request_body();
  //   const json_response = this.client.post(this.request_body);
  //   const job_id = json_response?.data?.id || null;
  //   const analysis = new Analysis({
  //     data: json_response.data,
  //     status: json_response.status,
  //     statement_type: this.statement_type,
  //     job_id: job_id,
  //   });
  //   callback(analysis);
  // }

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
    // this.statement_type = StatementType.CSV
    // this.customer_id = customer.customer_id
    // this.csv_path = csv_path
  }

  // build_request_body () {
  //   this.request_body = {
  //     file_statement: this.csv_path,
  //     'customer[id]': this.customer_id
  //   }
  // }
}

class JSONStatement extends DecideStatement {
  constructor () {
    super('bsp', 'application/json')
  }
}

export { DecideStatement, PDFStatement, CSVStatement, JSONStatement }
