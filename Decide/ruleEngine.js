import { DecideClient } from './decideClient.js'

const Outcome = {
  ACCEPT: 'OUTCOME_ACCEPT',
  DECLINE: 'OUTCOME_DECLINE',
  MANUAL_REVIEW: 'OUTCOME_MANUAL_REVIEW'
}

const Condition = {
  UNSPECIFIED: 'CONDITION_UNSPECIFIED',
  LESS_THAN: 'CONDITION_LESS_THAN',
  LESS_THAN_EQUAL_TO: 'CONDITION_LESS_THAN_EQUAL_TO',
  GREATER_THAN: 'CONDITION_GREATER_THAN',
  GREATER_THAN_EQUAL_TO: 'CONDITION_GREATER_THAN_EQUAL_TO',
  IS_BETWEEN: 'CONDITION_IS_BETWEEN',
  IS_NOT_BETWEEN: 'CONDITION_IS_NOT_BETWEEN',
  IS_EQUAL: 'CONDITION_IS_EQUAL',
  IS_NOT_EQUAL: 'CONDITION_IS_NOT_EQUAL',
  IS_IN: 'CONDITION_IS_IN'
}

const Operator = {
  OPERATOR_NONE: 'OPERATOR_NONE',
  OPERATOR_AND: 'OPERATOR_AND',
  OPERATOR_OR: 'OPERATOR_OR'
}

const Status = {
  ENABLED: 'enabled',
  DISABLED: 'disabled'
}

const RuleType = {
  ACCOUNT_SWEEP: 'behaviouralAnalysis.accountSweep',
  GAMBLING_RATE: 'behaviouralAnalysis.gamblingRate',
  CONFIDENCE_INTERVAL_SALARY_DETECTION:
    'incomeAnalysis.confidenceIntervalonSalaryDetection',
  LOAN_INFLOW_RATE: 'behaviouralAnalysis.loanInflowRate',
  LOAN_REPAYMENT_INFLOW_RATE: 'behaviouralAnalysis.loanRepaymentInflowRate',
  SALARY_EARNER: 'incomeAnalysis.salaryEarner',
  GIG_WORKER: 'incomeAnalysis.gigWorker',
  AVERAGE_BALANCE: 'cashFlowAnalysis.averageBalance',
  CLOSING_BALANCE: 'cashFlowAnalysis.closingBalance',
  AVERAGE_CREDITS: 'cashFlowAnalysis.averageCredits',
  AVERAGE_DEBITS: 'cashFlowAnalysis.averageDebits',
  AVERAGE_OTHER_INCOME: 'incomeAnalysis.averageOtherIncome',
  AVERAGE_SALARY: 'incomeAnalysis.averageSalary',
  MEDIAN_INCOME: 'incomeAnalysis.medianIncome',
  AVERAGE_RECURRING_EXPENSE: 'spendAnalysis.averageRecurringExpense',
  TOTAL_EXPENSE: 'spendAnalysis.totalExpenses',
  SAVING_AND_INVESTMENTS: 'spendAnalysis.savingsAndInvestments',
  LOAN_AMOUNT: 'behaviouralAnalysis.loanAmount',
  LOAN_REPAYMENTS: 'behaviouralAnalysis.loanRepayments',
  FIRST_DAY: 'cashFlowAnalysis.firstDay',
  LAST_DAY: 'cashFlowAnalysis.lastDay',
  INFLOW_OUTFLOW_RATE: 'behaviouralAnalysis.inflowOutflowRate',
  EXPECTED_SALARY_DAY: 'incomeAnalysis.expectedSalaryDay',
  LAST_SALARY_DATE: 'incomeAnalysis.lastSalaryDate',
  NO_OF_TRANSACTING_MONTHS: 'cashFlowAnalysis.noOfTransactingMonths',
  ACCOUNT_ACTIVITY: 'cashFlowAnalysis.accountActivity',
  NUMBER_SALARY_PAYMENTS: 'incomeAnalysis.numberSalaryPayments',
  NO_OF_OTHER_INCOME_PAYMENTS: 'incomeAnalysis.numberOtherIncomePayments',
  SALARY_FREQUENCY: 'incomeAnalysis.salaryFrequency'
}

class Rule {
  constructor (order, rule_type, value, condition, operator) {
    this.order = order
    this.rule_type = rule_type
    this.value = value
    this.condition = condition
    this.operator = operator
  }

  toDict () {
    return {
      order: this.order,
      type: this.rule_type,
      value: this.value,
      condition: this.condition,
      operator: this.operator
    }
  }
}

class Block {
  /**
   * A class representing a block of rules.
   * @param {Rule[]} rules - An array of Rule objects representing the rules in the block.
   * @param {number} order - An integer representing the order of the block in a list of blocks.
   * @param {Operator} operator - An Operator object representing the operator to be used to evaluate the rules in the block.
   * @param {Outcome} negativeOutcome - An Outcome object representing the outcome if the block evaluates to False.
   */
  constructor (rules, order, operator, negativeOutcome) {
    this.rules = rules
    this.order = order
    this.operator = operator
    this.negativeOutcome = negativeOutcome
  }

  toDict () {
    /**
     * Returns a dictionary representation of the block.
     * @returns {object} - A dictionary representing the block.
     */
    return {
      rules: this.rules.map(rule => rule.toDict()),
      order: this.order,
      operator: this.operator,
      negativeOutcome: this.negativeOutcome
    }
  }
}

class BooleanRuleSet {
  /**
   * A class representing a set of boolean rules.
   * @param {string} name - The name of the rule set.
   * @param {string} positiveOutcome - The positive outcome of the rule set.
   * @param {string} negativeOutcome - The negative outcome of the rule set.
   * @param {string} owner - The owner of the rule set.
   * @param {Block[]} blocks - The array of blocks that make up the rule set.
   */
  constructor (name, positiveOutcome, negativeOutcome, owner, blocks) {
    this.name = name
    this.positiveOutcome = positiveOutcome
    this.negativeOutcome = negativeOutcome
    this.owner = owner
    this.blocks = blocks
  }

  toDict () {
    /**
     * Returns a dictionary representation of the BooleanRuleSet instance.
     * @returns {object} - A dictionary representation of the BooleanRuleSet instance.
     */
    return {
      name: this.name,
      positiveOutcome: this.positiveOutcome,
      negativeOutcome: this.negativeOutcome,
      owner: this.owner,
      blocks: this.blocks?.map(block => block?.toDict())
    }
  }
}

class Duration {
  constructor (duration) {
    this.duration = duration
  }

  toDict () {
    return {
      duration: this.duration
    }
  }
}

class Affordability {
  /**
   * A class representing affordability criteria.
   * @param {number} monthly_interest_rate - The monthly interest rate.
   * @param {Duration[]} monthlyDurations - An array of Duration objects representing monthly durations.
   */
  constructor (monthly_interest_rate, monthlyDurations = []) {
    this.monthly_interest_rate = monthly_interest_rate
    this.monthlyDurations = monthlyDurations.map(duration =>
      duration instanceof Duration ? duration : new Duration(duration)
    )
  }

  toDict () {
    /**
     * Returns a dictionary representation of the Affordability instance.
     * @returns {object} - A dictionary representation of the Affordability instance.
     */
    return {
      monthly_interest_rate: this.monthly_interest_rate,
      monthlyDurations: this.monthlyDurations.map(duration =>
        duration ? duration.toDict() : null
      )
    }
  }
}

class ScorecardRequest {
  /**
   * A class representing a scorecard request.
   * @param {string} name - The name of the scorecard request.
   * @param {BooleanRuleSet} booleanRuleSet - A BooleanRuleSet object representing the set of boolean rules.
   * @param {Affordability} affordability - An Affordability object representing the affordability criteria.
   * @param {Status} status - The status of the scorecard request.
   */
  constructor (name, booleanRuleSet, affordability, status) {
    this.name = name
    this.booleanRuleSet = booleanRuleSet
    this.affordability = affordability
    this.status = status
  }

  toDict () {
    /**
     * Returns a dictionary representation of the scorecard request object.
     * @returns {object} - A dictionary representation of the scorecard request object.
     */
    return {
      name: this.name,
      booleanRuleSet: this.booleanRuleSet.toDict(),
      affordability: this.affordability.toDict(),
      status: this.status
    }
  }
}

class ScorecardExecuteRequest {
  /**
   * A class representing a scorecard execute request.
   * @param {string} analysisId - The ID of the analysis you wish to run the scorecard on.
   * @param {number[]} scorecardIds - An array of scorecard IDs to execute.
   */
  constructor (analysisId, scorecardIds) {
    this.analysisId = analysisId
    this.scorecardIds = scorecardIds
  }

  toDict () {
    /**
     * Returns a dictionary representation of the scorecard execute request object.
     * @returns {object} - A dictionary representation of the scorecard execute request object.
     */
    return {
      analysisId: this.analysisId,
      scorecardIds: this.scorecardIds
    }
  }
}

class ScorecardResponse {
  constructor (
    name,
    booleanRulesetId,
    affordability,
    owner,
    status,
    createdAt,
    updatedAt,
    id
  ) {
    this.name = name
    this.boolean_ruleset_id = booleanRulesetId
    this.affordability = affordability
    this.owner = owner
    this.status = status
    this.created_at = createdAt
    this.updated_at = updatedAt
    this.scorecard_id = id
  }

  static fromDict (data) {
    return new ScorecardResponse(
      data?.name,
      data?.booleanRulesetId,
      data?.affordability,
      data?.owner,
      data?.status,
      data?.createdAt,
      data?.updatedAt,
      data?.id
    )
  }
}

class ScorecardAPI {
  constructor () {
    this.client = new DecideClient('scorecards', 'application/json')
  }

  async createScorecard (scorecard_request) {
    const data = scorecard_request.toDict()
    const response = await this.client.post(data)
    return ScorecardResponse.fromDict(response?.data?.scorecard)
  }

  async readScorecard(scorecard_id) {
    this.client.path = `scorecards/${scorecard_id}`;
    const response = await this.client.get();
    if (response.statusCode === 200) {
      return ScorecardResponse.fromDict(response.data);
    }
    return null;
  }

  async updateScorecard (scorecard_id, scorecard_request) {
    this.client.path = `scorecards/${scorecard_id}`
    const data = scorecard_request.toDict()
    const response = await this.client.patch(data)
    return ScorecardResponse.fromDict(response.data.scorecard)
  }

  async deleteScorecard (scorecard_id) {
    this.client.path = `scorecards/${scorecard_id}`
    const response = await this.client.delete()
    return response.data.message
  }

  async executeScorecard (scorecard_execute_request) {
    this.client.path = 'scorecards/execute'
    const data = scorecard_execute_request.toDict()
    const response = await this.client.post(data)
    return response.data
  }

  async listScorecards (status, limit, page) {
    this.client.path = `scorecards?status=${status.value}&limit=${limit}&page=${page}`
    const response = await this.client.get()
    return response.data
  }
}

export {
  Outcome,
  Condition,
  Operator,
  Status,
  RuleType,
  Rule,
  Block,
  BooleanRuleSet,
  Duration,
  Affordability,
  ScorecardRequest,
  ScorecardExecuteRequest,
  ScorecardResponse,
  ScorecardAPI
}
