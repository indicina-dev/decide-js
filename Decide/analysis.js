import { StatementType } from './enums.js'
import { DecideClient } from './decideClient.js'
import { BaseModel } from './baseModel.js'
import { PDFStatus } from './enums.js'

class Analysis extends BaseModel {
  constructor (data, status, statement_type, job_id = null) {
    super(data)
    if (statement_type === StatementType.PDF) {
      this._status = PDFStatus[data.status]
      this.job_id = data?.jobId || job_id
    }
    this._status = status
    this.statement_type = statement_type
    if (this.statement_type.toLowerCase() === StatementType.PDF) {
      this.pdf_client = new DecideClient(
        `pdf/extract/${job_id}/status`,
        'multipart/form-data'
      )
      this.pdf_client.get()
      return this.pdf_client
    }
    this.BehaviouralAnalysis = new BehaviouralAnalysis();
    this.TransactionPatternAnalysis = new TransactionPatternAnalysis();
    this.SpendAnalysis = new SpendAnalysis();
    this.IncomeAnalysis = new IncomeAnalysis();
    this.CashFlowAnalysis = new CashFlowAnalysis();
  }

  async getTransactionTags () {
    this.taggedClient = new DecideClient(
      `analysis/${this.id}/tagged-transactions`,
      'application/json'
    )
    try {
      const jsonResponse = await this.taggedClient.get()
      this.status = jsonResponse['status']
      const expandedData = new BaseModel(jsonResponse["data"]);
      return expandedData; 
    } catch (error) {
      this.status = 'error'
      return error 
    }
  }

  async getstatus () {
    if (
      this.statement_type.toLowerCase() === StatementType.PDF &&
      ![PDFStatus.DONE, PDFStatus.FAILED].includes(this._status)
    ) {
      const json_response = await this.pdf_client.get()
      this._status = PDFStatus[json_response?.data?.status]
      if (this._status === PDFStatus.DONE) {
        super._init(json_response.data.decideResponse)
      }
    }
    return this._status
  }

  set status (value) {
    this._status = value
  }

  toString () {
    return JSON.stringify(this._data)
  }

  buildDictValues (key, value) {
    if (_analysis_call_dict.hasOwnProperty(key)) {
      return new _analysis_call_dict[key](value)
    }
    return value
  }
}

class BehaviouralAnalysis extends BaseModel {
  constructor () {
    super({})
    this.accountSweep = null
    this.gamblingRate = null
    this.inflowOutflowRate = null
    this.loanInflowRate = null
    this.loanRepaymentInflowRate = null
    this.loanRepayments = null
    this.topIncomingTransferAccount = null
    this.topTransferRecipientAccount = null
  }
}


class CashFlowAnalysis extends BaseModel {
  constructor () {
    super({})
    this.accountActivity = null
    this.averageBalance = null
    this.averageCredits = null
    this.averageDebits = null
    this.closingBalance = null
    this.firstDay = null
    this.lastDay = null
    this.monthPeriod = null
    this.netAverageMonthlyEarnings = null
    this.noOfTransactingMonths = null
    this.totalCreditTurnover = null
    this.totalDebitTurnover = null
    this.yearInStatement = null
  }
}

class IncomeAnalysis extends BaseModel {
  constructor () {
    super({})
    this.averageOtherIncome = null
    this.averageSalary = null
    this.confidenceIntervalOnSalaryDetection = null
    this.expectedSalaryDay = null
    this.lastSalaryDate = null
    this.medianIncome = null
    this.numberOtherIncomePayments = null
    this.numberOfSalaryPayments = null
    this.salaryEarner = null
    this.salaryFrequency = null
    this.gigWorker = null
  }
}

class SpendAnalysis extends BaseModel {
  constructor () {
    super({})
    this.expenseChannels = new ExpenseChannels({})
    this.expenseCategories = new ExpenseCategories({})
    this.averageRecurringExpense = null
    this.hasRecurringExpense = null
    this.totalExpenses = null
  }

  buildDictValues (key, value) {
    return value
  }
}

class TransactionPatternAnalysis extends BaseModel {
  constructor () {
    super({})
    this.highestMAWOCredit = null
    this.highestMAWODebit = null
    this.lastDateOfCredit = null
    this.lastDateOfDebit = null
    this.MAWWZeroBalanceInAccount = null
    this.mostFrequentBalanceRange = null
    this.mostFrequentTransactionRange = null
    this.NODWBalanceLess5000 = null
    this.recurringExpense = null
    this.transactionsBetween100000And500000 = null
    this.transactionsBetween10000And100000 = null
    this.transactionsGreater500000 = null
    this.transactionsLess10000 = null
    this.transactionRanges = null
    this.NODWBalanceLess = null
  }

  buildDictValues (key, value) {
    if (key in _analysis_call_dict) {
      return _analysis_call_dict[key](value)
    }
    return value
  }
}

class AccountDetails extends BaseModel {
  constructor () {
    super({})
    this.accountName = null
    this.accountNumber = null
  }

  buildDictValues (key, value) {
    return value
  }
}

class ExpenseChannels extends BaseModel {
  constructor (data) {
    super({})
    if (data && typeof data[Symbol.iterator] === 'function') {
      for (const dict of data) {
        if (dict && dict.key) {
          this[dict.key] = dict.value
        }
      }
    }
  }
}

class ExpenseCategories extends BaseModel {
  constructor (data) {
    super({})
    if (data && typeof data[Symbol.iterator] === 'function') {
      for (const dict of data) {
        if (dict && dict.key) {
          this[dict.key] = dict.value
        }
      }
    }
  }
}

class Rule {
  constructor () {
    this.condition = null
    this.name = null
    this.status = null
  }
}

const _analysis_call_dict = {
  behaviouralAnalysis: BehaviouralAnalysis,
  cashFlowAnalysis: CashFlowAnalysis,
  incomeAnalysis: IncomeAnalysis,
  spendAnalysis: SpendAnalysis,
  transactionPatternAnalysis: TransactionPatternAnalysis,
  accountDetails: AccountDetails
}

export {
  Analysis,
  BehaviouralAnalysis,
  CashFlowAnalysis,
  IncomeAnalysis,
  SpendAnalysis,
  TransactionPatternAnalysis,
  AccountDetails,
  ExpenseChannels,
  ExpenseCategories,
  Rule
}
