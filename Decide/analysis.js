import { StatementType } from './enums.js'
import { DecideClient } from './decideClient.js'
import { BaseModel } from './baseModel.js'
import { PDFStatus } from './enums.js'

class Analysis extends BaseModel {
  constructor (data, status, statement_type, job_id = null) {
    super(data)
    if (statement_type.toLowerCase() === StatementType.PDF) {
      this._status = PDFStatus[data?.status]
      this.job_id = data?.jobId || job_id
      this.id = data?.jobId || job_id
    }
    this._status = status
    this.statement_type = statement_type
      this.behaviouralAnalysis = new BehaviouralAnalysis(data?.behaviouralAnalysis)
      this.cashFlowAnalysis = new CashFlowAnalysis(data?.cashFlowAnalysis)
      this.incomeAnalysis = new IncomeAnalysis(data?.incomeAnalysis)
      this.spendAnalysis = new SpendAnalysis(data?.spendAnalysis)
      this.transactionPatternAnalysis = new TransactionPatternAnalysis(data?.transactionPatternAnalysis)   
  }

  async getTransactionTags () {
    this.taggedClient = new DecideClient(
      `client/analysis/${this.id}/tagged-transactions`,
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
        super._init(json_response.data?.decideResponse)
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
  constructor (data) {
    super(data)
    this.accountSweep = data?.accountSweep
    this.gamblingRate = data?.gamblingRate
    this.inflowOutflowRate = data?.inflowOutflowRate
    this.loanAmount = data?.loanAmount
    this.loanInflowRate = data?.loanInflowRate
    this.loanRepaymentInflowRate = data?.loanRepaymentInflowRate
    this.loanRepayments = data?.loanRepayments
    this.topIncomingTransferAccount = data?.topIncomingTransferAccount
    this.topTransferRecipientAccount = data?.topTransferRecipientAccount
  }
}


class CashFlowAnalysis extends BaseModel {
  constructor (data) {
    super(data)
    this.accountActivity = data?.accountActivity
    this.averageBalance = data?.averageBalance
    this.averageCredits = data?.averageCredits
    this.averageDebits = data?.averageDebits
    this.closingBalance = data?.closingBalance
    this.firstDay = data?.firstDay
    this.lastDay = data?.lastDay
    this.monthPeriod = data?.monthPeriod
    this.netAverageMonthlyEarnings = data?.netAverageMonthlyEarnings
    this.noOfTransactingMonths = data?.noOfTransactingMonths
    this.totalCreditTurnover = data?.totalCreditTurnover
    this.totalDebitTurnover = data?.totalDebitTurnover
    this.yearInStatement = data?.yearInStatement
    this.maxEmiEligibility = data?.maxEmiEligibility
    this.emiConfidenceScore = data?.emiConfidenceScore
    this.totalMonthlyCredit = data?.totalMonthlyCredit
    this.totalMonthlyDebit = data?.totalMonthlyDebit
    this.averageMonthlyCredit = data?.averageMonthlyCredit
    this.averageMonthlyDebit = data?.averageMonthlyDebit
  }
}


class IncomeAnalysis extends BaseModel {
  constructor (data) {
    super(data)
    this.salaryEarner = data?.salaryEarner
    this.medianIncome = data?.medianIncome
    this.averageOtherIncome = data?.averageOtherIncome
    this.expectedSalaryDay = data?.expectedSalaryDay
    this.lastSalaryDate = data?.lastSalaryDate
    this.averageSalary = data?.averageSalary
    this.confidenceIntervalonSalaryDetection = data?.confidenceIntervalonSalaryDetection
    this.salaryFrequency = data?.salaryFrequency
    this.numberSalaryPayments = data?.numberSalaryPayments
    this.numberOtherIncomePayments = data?.numberOtherIncomePayments
    this.gigWorker = data?.gigWorker
  }
}
class SpendAnalysis extends BaseModel {
  constructor (data) {
    super(data)
    this.averageRecurringExpense = data?.averageRecurringExpense
    this.hasRecurringExpense = data?.hasRecurringExpense
    this.averageMonthlyExpenses = data?.averageMonthlyExpenses
    this.expenseChannels = data?.expenseChannels.map(channel => new ExpenseChannels(channel))
    this.expenseCategories = data?.expenseCategories.map(category => new ExpenseCategories(category))
  }
}
class TransactionPatternAnalysis extends BaseModel {
  constructor (data) {
    super(data)
    this.MAWWZeroBalanceInAccount = data?.MAWWZeroBalanceInAccount
    this.NODWBalanceLess5000 = data?.NODWBalanceLess5000
    this.NODWBalanceLess = data?.NODWBalanceLess
    this.highestMAWOCredit = data?.highestMAWOCredit
    this.highestMAWODebit = data?.highestMAWODebit
    this.lastDateOfCredit = data?.lastDateOfCredit
    this.lastDateOfDebit = data?.lastDateOfDebit
    this.mostFrequentBalanceRange = data?.mostFrequentBalanceRange
    this.mostFrequentTransactionRange = data?.mostFrequentTransactionRange
    this.recurringExpense = data?.recurringExpense
    this.transactionsBetween100000And500000 = data?.transactionsBetween100000And500000
    this.transactionsBetween10000And100000 = data?.transactionsBetween10000And100000
    this.transactionsGreater500000 = data?.transactionsGreater500000
    this.transactionsLess10000 = data?.transactionsLess10000
    this.transactionRanges = data?.transactionRanges
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
  constructor(data) {
    super(data);
    this.key = data?.key;
    this.value = data?.value;
  }
}

class ExpenseCategories extends BaseModel {
  constructor(data) {
    super(data);
    this.key = data?.key;
    this.value = data?.value;
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
