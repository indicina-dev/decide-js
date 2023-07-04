## decide-javascript-package
![img.png](assets/img.png)

---
**Table of contents**
- [About](#about)
- [Using the App](#using-the-app)
    - [Installation](#installation)
    - [Authorization](#authorization)
      - [sh](#sh)
      - [Javascript](#javascript)
    - [Sample Code](#sample-code)
      - [JSON Statement](#json-statement)
      - [PDF Statement](#pdf-statement)
      - [CSV Statement](#csv-statement)
      - [Sample Response](#sample-response)
      - [Supported Banks](#supported-banks)
      - [Analysis Result](#analysis)
      - [Rules Engine Documentation](#rules-engine-documentation)
- [Contribution](#contribution)
  - [Setup Project](#setup-project)
    - [Cloning the project](#cloning-the-project)
        - [For HTTPS](#for-https)
        - [For SSH](#for-ssh)
      - [Running the project](#running-the-project)
  - [Contribute to Project](#contribute-to-project)
  - [Issues](#issues)

---
# About
Decide helps users make risk-free decisions based on an analysis of their banking transactions using extracted financial data.
The Decide SDK helps developers plug into the functionalities of Decide from their projects.

- **Website:** https://developers.indicina.co

# Using the App
### Authorization
#### sh
```js
export INDICINA_CLIENT_ID=my_id
export INDICINA_CLIENT_SECRET=my_secret
```
#### Javascript
```js
 const client_id = process.env.INDICINA_CLIENT_ID;
 const client_secret = process.env.INDICINA_CLIENT_SECRET;
```

You can get your `INDICINA_CLIENT_ID` and `INDICINA_CLIENT_SECRET` from [GitHub Pages](https://developers.indicina.co/docs/decide-api-keys).

### Sample Code
#### JSON Statement
```js

 const customer = new Customer(
      'ckq9ehqmv000001me62y85j1u',
      'dee@dee.com',
      'Dammy',
      'Shabi',
      '081'
    )

json_statement = json.loads("""{
    "paging": {
        "total": 190,
        "page": 2,
        "previous": "https://api.withmono.com/accounts/:id/transactions?page=2",
        "next": "https://api.withmono.com/accounts/:id/transactions?page=3"
    },
    "data": [
        {
            "_id": "12345",
            "amount": 10000,
            "date": "2020-07-21T00:00:00.000Z",
            "narration": "TRANSFER from *************",
            "type": "debit",
            "category": "E-CHANNELS"
        },
        {
            "_id": "12345",
            "amount": 20000,
            "date": "2020-07-21T00:00:00.000Z",
            "narration": "TRANSFER from ***********",
            "type": "debit",
            "category": "E-CHANNELS"
        }
    ]
}""")

    const statement = jsonString
    const statementObj = new DecideStatement("mono", statement, customer, true);
    const analysis = await statementObj.analyzeJSON({ format: "mono", statement, customer });

    console.log(analysis.TransactionPatternAnalysis)
    console.log(analysis.SpendAnalysis)
    console.log(analysis.IncomeAnalysis)
    console.log(analysis.CashFlowAnalysis)
    console.log(analysis.BehaviouralAnalysis)

    // For Tags 
    const tags = await analysis.getTransactionTags()
    console.log(tags.transactions[0].tags)
```

#### PDF Statement
```js
    const file = fs.createReadStream('/path/to/pdf/file.pdf');
    const statementObj = new DecideStatement('pdf/extract', 'application json')
    const analysis = await statementObj.analyzePDF({
       file,
       bankCode: Bank.KUDA,
       customerId: customer.customer_id,
       currency: Currency.NGN
    })


    console.log(analysis.TransactionPatternAnalysis)
    console.log(analysis.SpendAnalysis)
    console.log(analysis.IncomeAnalysis)
    console.log(analysis.CashFlowAnalysis)
    console.log(analysis.BehaviouralAnalysis)

```

#### CSV Statement
```js
    const file = fs.createReadStream('/path/to/csv/file.csv');
    const statementObj = new DecideStatement('bsp/file', 'application/json')
    const analysis = await statementObj.analyzeCSV({
      file,
      customer
    })

    console.log(analysis.TransactionPatternAnalysis)
    console.log(analysis.SpendAnalysis)
    console.log(analysis.IncomeAnalysis)
    console.log(analysis.CashFlowAnalysis)
    console.log(analysis.BehaviouralAnalysis)

```

#### Sample Response
```js
{
    "status": "success",
    "data": {
        "country": "Nigeria",
        "currency": "NGN",
        "behaviouralAnalysis": {
            "accountSweep": "No",
            "gamblingRate": 0,
            "inflowOutflowRate": "Neutral Cash Flow",
            "loanAmount": 2000,
            "loanInflowRate": 0,
            "loanRepaymentInflowRate": 0,
            "loanRepayments": 54500,
            "topIncomingTransferAccount": "The",
            "topTransferRecipientAccount": "Day"
        },
        "cashFlowAnalysis": {
            "accountActivity": 0.84,
            "averageBalance": 1815942.46,
            "averageCredits": 153741.4861589404,
            "averageDebits": 31563.282248447216,
            "closingBalance": -202978.97,
            "firstDay": "2022-05-18",
            "lastDay": "2022-10-18",
            "monthPeriod": "May - October",
            "netAverageMonthlyEarnings": -1875144.8599999999,
            "noOfTransactingMonths": 6,
            "totalCreditTurnover": 23214964.409999996,
            "totalDebitTurnover": 25408442.21000001,
            "yearInStatement": "2022",
            "maxEmiEligibility": 48871,
            "emiConfidenceScore": 0.04
        },
        "incomeAnalysis": {
            "salaryEarner": "Yes",
            "medianIncome": 83150,
            "averageOtherIncome": 69187.43,
            "expectedSalaryDay": 25,
            "lastSalaryDate": "2022-08-25",
            "averageSalary": 2290408.08,
            "confidenceIntervalonSalaryDetection": 1,
            "salaryFrequency": "1",
            "numberSalaryPayments": 3,
            "numberOtherIncomePayments": 15,
            "gigWorker": "No"
        },
        "spendAnalysis": {
            "averageRecurringExpense": 360140.42,
            "hasRecurringExpense": "Yes",
            "averageMonthlyExpenses": 4234740.37,
            "expenseChannels": `expenseChannels`,(bills, entertainment,savingsAndInvestments,gambling,airtime,bankCharges,chequeWithdrawal,cashWithdrawal,shopping, eatingOut)
            "expenseCategories": `expenseCategories`
        },
        "transactionPatternAnalysis": {
            "MAWWZeroBalanceInAccount": {
                "month": null,
                "week_of_month": 0
            },
            "NODWBalanceLess5000": 35,
            "NODWBalanceLess": {
                "amount": 5000,
                "count": 35
            },
            "highestMAWOCredit": {
                "month": "August",
                "week_of_month": 3
            },
            "highestMAWODebit": {
                "month": "August",
                "week_of_month": 5
            },
            "lastDateOfCredit": "2022-10-17",
            "lastDateOfDebit": "2022-10-18",
            "mostFrequentBalanceRange": ">500000",
            "mostFrequentTransactionRange": "<10000",
            "recurringExpense": [
                {
                    "amount": 1650,
                    "description": "spend and save"
                },
                {
                    "amount": 4000,
                    "description": "airtime purchase 2347049215992"
                },
                {
                    "amount": 5000,
                    "description": "fuel"
                }
            ],
            "transactionsBetween100000And500000": 39,
            "transactionsBetween10000And100000": 176,
            "transactionsGreater500000": 24,
            "transactionsLess10000": 717,
            "transactionRanges": [
                {
                    "min": 10000,
                    "max": 100000,
                    "count": 176
                },
                {
                    "min": 100000,
                    "max": 500000,
                    "count": 39
                },
                {
                    "min": null,
                    "max": 10000,
                    "count": 717
                },
                {
                    "min": 500000,
                    "max": null,
                    "count": 24
                }
            ]
        }
    }
}

```

#### Supported Banks
In selecting a bank to use for analysis, we maintain an ENUM of supported banks. We have also provided a convenient method to fetch a current list of supported banks.

```js

# Enum selection of Bank
statement = DecideStatement(
            ...,
            bankCode =  Bank.GTB,
            ...)
```

```js
from decide import Bank

# Get bank list
supported_bank_list = Bank.getBankList()


print(supported_bank_list)

output: A list of tuples [(bank_name, bank_code)]
[('Guaranty Trust Bank', '058'), ('Access Bank', '044')...]
```

#### Analysis
When the Decide API sends a response, the response is represented in the Analysis class.

Anatomy of an Analysis
```
Analysis
|
|-- behaviouralAnalysis: `BehaviouralAnalysis`
|       |-- accountSweep
|       |-- gamblingRate
|       |-- inflowOutflowRate
|       |-- loanInflowRate
|       |-- loanRepaymentInflowRate
|       |-- loanRepayments
|       |-- topIncomingTransferAccount
|       |-- topTransferRecipientAccount
            |-- loanAmount
|
|-- cashFlowAnalysis: `CashFlowAnalysis`
|       |-- accountActivity
|       |-- averageBalance
|       |-- averageCredits
|       |-- averageDebits
|       |-- closingBalance
|       |-- firstDay
|       |-- lastDay
|       |-- monthPeriod
|       |-- netAverageMonthlyEarnings
|       |-- noOfTransactingMonths
|       |-- totalCreditTurnover
|       |-- totalDebitTurnover
|       |-- yearInStatement
|
|-- incomeAnalysis: `IncomeAnalysis`
|       |-- averageOtherIncome
|       |-- averageSalary
|       |-- confidenceIntervalOnSalaryDetection
|       |-- expectedSalaryDay
|       |-- lastSalaryDate
|       |-- medianIncome
|       |-- numberOtherIncomePayments
|       |-- numberOfSalaryPayments
|       |-- salaryEarner
|       |-- salaryFrequency
|       |-- gigWorker
|
|-- spendAnalysis: `SpendAnalysis`
|       |-- expenseChannels: `ExpenseChannels`
|       |       |-- atmSpend
|       |       |-- webSpend
|       |       |-- posSpend
|       |       |-- ussdTransactions
|       |       |-- mobileSpend
|       |       |-- spendOnTransfers
|       |       |-- internationalTransactionsSpend
|       |-- expenseCategories: `ExpenseCategories`
|       |       |-- bills
|       |       |-- entertainment
|       |       |-- savingsAndInvestments
|       |       |-- gambling
|       |       |-- airtime
|       |       |-- bankCharges
|       |-- averageRecurringExpense
|       |-- hasRecurringExpense
|       |-- totalExpenses
|-- transactionPatternAnalysis: `TransactionPatternAnalysis`
|       |-- highestMAWOCredit
|       |-- highestMAWODebit
|       |-- lastDateOfCredit
|       |-- lastDateOfDebit
|       |-- MAWWZeroBalanceInAccount
|       |-- mostFrequentBalanceRange
|       |-- mostFrequentTransactionRange
|       |-- NODWBalanceLess5000
|       |-- recurringExpense
|       |-- transactionsBetween100000And500000
|       |-- transactionsBetween10000And100000
|       |-- transactionsGreater500000
|       |-- transactionsLess10000
|       |-- transactionRanges
|       |-- NODWBalanceLess
|-- status
```

**Analysis Status**

Some bank statement analyses (e.g. PDF) are asynchronous. You may not get the results of the analysis immediately.

You may need to get the status of an analysis.

PDFStatus could take one of the following values.

| Status	  | Value	     | Description                       |
| ----------- | ------------ | --------------------------------- |
| DONE	      | DONE	     | The analysis is done              |
| FAILED	  | FAILED	     | The analysis failed               |
| IN_PROGRESS | IN_PROGRESS	 | The analysis is still in progress |

```js
# Example usage on accessing the analysis response
  const analysis = await statementObj.analyzePDF({
       file,
       bankCode: Bank.KUDA,
       customerId: customer.customer_id,
       currency: Currency.NGN
    })
console.log(f"Analysis status is: {analysis.status}")

# wait for analysis to be done
time.sleep(3)

console.log(analysis)
console.log(f"Analysis status is: {analysis.status}")
console.log(f"Credit turnover is: {analysis.CashFlowAnalysis.totalCreditTurnover}")
console.log(f"Average salary is: {analysis.Income.averageSalary}")
console.log(f"{analysis.BehaviouralAnalysis}")
const tags = await analysis.getTransactionTags()
console.log(tags.transactions[0].tags)
```

### Rules Engine Documentation

The Rules Engine enables merchants to set up an automated decisioning process for lending, based on pre-determined conditions tailored to their unique use case. It allows users to:

- Develop multiple rule-based conditions
- Analyze statements with pre-determined conditions and rules that automate the decision-making process
- Automatically filter qualifying applications based on the set rules
- Set up an affordability logic to reveal what applicants can pay back

#### Import Required Libraries
```js
import { 
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
 } from '../Decide/ruleEngine.js';
```

#### Set Environment Variables
```js
 const client_id = process.env.INDICINA_CLIENT_ID;
 const client_secret = process.env.INDICINA_CLIENT_SECRET;
```

#### Initialize ScorecardAPI
```js
    const scorecardAPI = new ScorecardAPI(); 
```

#### Create Scorecard
`Define Rules`

A Rule is defined as a condition to be evaluated on a certain value. You can have as many rules as you need. A Rule consists of several properties, including:

- order: an integer representing the order in which the rule is evaluated
- rule_type: an Enum representing the type of rule (e.g., average balance, loan amount, etc.)
- value: a string representing the value of the rule (e.g., "10000" for an average balance of 10,000)
- condition: an ENUM representing the condition to be evaluated (e.g., "is equal to", "less than or equal to", etc.)
- operator: an ENUM representing the logical operator to be used when evaluating the rule (e.g., "and", "or", etc.)

For example, the first rule defined in the code states that the average balance of an account must be exactly 10,000.

```js
rules = [
    new Rule(
              1,
              RuleType.ACCOUNT_ACTIVITY,
              "0.40",
              Condition.GREATER_THAN,
              Operator.OPERATOR_NONE
            ),
    new Rule(
              2,
              RuleType.SALARY_FREQUENCY,
              "24",
              Condition.IS_EQUAL,
              Operator.OPERATOR_NONE
            )
        ]
```

`Create a Block`

A Block is a collection of Rule objects that are evaluated together using a logical operator (e.g., "and", "or", etc.). A Block consists of several properties, including:

rules: a list of Rule objects
order: an integer representing the order in which the block is evaluated
operator: an ENUM representing the logical operator to be used when evaluating the block (e.g., "and", "or", etc.)
negative_outcome: an Enum representing the outcome of the block if the evaluation is false
```js
 new Block([
            new Rule(
              1,
              RuleType.ACCOUNT_ACTIVITY,
              "0.40",
              Condition.GREATER_THAN,
              Operator.OPERATOR_NONE
            )
          ], 1, Operator.OPERATOR_NONE, Outcome.MANUAL_REVIEW
        )
```

`Create a Boolean Rule Set`

A BooleanRuleSet is a collection of Block objects that are evaluated together using a logical operator (e.g., "and", "or", etc.). A BooleanRuleSet consists of several properties, including:

- name: a string representing the name of the rule set
- positive_outcome: an ENUM representing the outcome of the rule set if the evaluation is true
- negative_outcome: an ENUM representing the outcome of the rule set if the evaluation is false
- owner: a string representing the owner of the rule set
- blocks: a list of Block objects
```js

    new BooleanRuleSet(
        "<string-value>",
        Outcome.ACCEPT,
        Outcome.DECLINE,
        "<slug>",
        [
          new Block([
            new Rule(
              1,
              RuleType.ACCOUNT_ACTIVITY,
              "0.40",
              Condition.GREATER_THAN,
              Operator.OPERATOR_NONE
            )
          ], 1, Operator.OPERATOR_NONE, Outcome.MANUAL_REVIEW)
        ]
      )
```

`Define Affordability Logic`

Affordability logic defines the logic to determine what the applicant can pay back. It is made up of two properties:

- monthly_interest_rate: interest rate per month
- monthly_durations: a list of Duration objects representing the tenures they wish to provide their service for
```js
  new Affordability(
        10,
        [
          { duration: 12 },
          { duration: 24 },
          { duration: 36 }
        ]
      ),
```

`Create a Scorecard Request`

The ScorecardRequest object is the final object that is created and is used to make requests to the ScorecardAPI. It contains the name of the scorecard, the boolean rule set, the affordability logic, and the status of the scorecard (whether it is enabled or disabled).

```js

    const scorecardRequest = new ScorecardRequest(
      "_Test",
      new BooleanRuleSet(
        "<string-value>",
        Outcome.ACCEPT,
        Outcome.DECLINE,
        "<slug>",
        [
          new Block([
            new Rule(
              1,
              RuleType.ACCOUNT_ACTIVITY,
              "0.40",
              Condition.GREATER_THAN,
              Operator.OPERATOR_NONE
            )
          ], 1, Operator.OPERATOR_NONE, Outcome.MANUAL_REVIEW)
        ]
      ),
      new Affordability(
        10,
        [
          { duration: 12 },
          { duration: 24 },
          { duration: 36 }
        ]
      ),
        Status.ENABLED
    )
    const scorecard = await scorecardAPI.createScorecard(scorecardRequest);
    console.log('Created Scorecard:', scorecard);
    
```

`Read Scorecard`

To retrieve an existing scorecard, we can use the get_scorecard method. The method takes the ID of the scorecard as input and returns a Scorecard object.

```js
    const scorecard = await scorecardAPI.readScorecard(`scorecard_id`);
    console.log('Scorecard:', scorecard);
    
```

`Update Scorecard`

We can create a new ScorecardRequest object with the updated information and use the update_scorecard method. The method takes the ID of the scorecard and the new ScorecardRequest object as input and updates the scorecard with the new information.

```js

  const updatedScorecardRequest = new ScorecardRequest(
      "_Test",
      new BooleanRuleSet(
        "<string-value>",
        Outcome.ACCEPT,
        Outcome.DECLINE,
        "<slug>",
        [
          new Block([
            new Rule(
              1,
              RuleType.ACCOUNT_ACTIVITY,
              "0.40",
              Condition.LESS_THAN_EQUAL_TO,
              Operator.OPERATOR_NONE
            )
          ], 1, Operator.OPERATOR_NONE, Outcome.ACCEPT)
        ]
      ),
      new Affordability(
        10,
        [
          { duration: 3 },
          { duration: 6 },
          { duration: 9 }
        ]
      ),
        Status.ENABLED
    );

    const updated_score = await scorecardAPI.updateScorecard(617,   updatedScorecardRequest);
    console.log('Updated Scorecard:', updated_score);
    
```

`Delete Scorecard`

To delete an existing scorecard, we can use the delete_scorecard method. The method takes the ID of the scorecard as input and deletes the scorecard.

```js
    const deleted_scoreId = await scorecardAPI.deleteScorecard(618);
    console.log('Deleted Scorecard:', deleted_scoreId );    
```

`Analyse statement with Scorecard`

To analyse a statement with some already created scorecards/rules, pass in the ids of the scorecards as below:

```js
    const statement = jsonString
    const statementObj = new JSONStatement("mono", statement, customer, true);
    const analysis = await statementObj.analyzeJSON({ format: "mono", statement, customer, scorecardIds: [615] });
    console.log(analysis.SpendAnalysis)

```

This concludes the documentation for using the Rules Engine, which covers creating, updating, deleting, and executing scorecards on existing analyses. Use this guide as a reference for implementing the automated decision-making process tailored to your specific lending use case.



# Contribution
## Setup Project
The link for this projects's repository can be found [here](https://github.com/indicina-dev/decide-js)
### Cloning the project

##### For HTTPS
Use this command `git clone https://github.com/indicina-dev/decide-js.git`

##### For SSH
Use this command `git clone git@github.com:indicina-dev/decide-js.git`

#### Running the project
- Install the requirements.txt file `npm i`
- Run files

## Contribute to Project
Do you find the project interesting and you would like to contribute to our project?
- Fork the repository to your github account
- Clone the repository to your local machine
- Create a new branch for your fix (preferably descriptive to your contribution)
- Make appropriate changes and tests for the changes
- Use `git add insert-paths-of-changed-files-here` to add the file contents of the changed files to the "snapshot" git uses for project management
- Committing: As a means to create a seamless development and contribution flow, we require that commits be standardized, following the conventional [commits guideline](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```


Examples of good commits:
1. adding a new feature: `git commit -m "feat: allow provided config object to extend other configs"`

2. adding a breaking change, take note of the _!_ : `git commit -m "feat!: send an email to the customer when a product is shipped"`
- Push the changes to the remote repository using `git push origin branch-name-here`
- Submit a pull request to the upstream repository
- Title the pull request with a short description of the changes made and the issue or bug number associated with your change. For example, you can title an issue like so `Added more log outputting to resolve #4352`.
- Wait for our in-house developers to approve the merge requests or update the merge requests if changes were requested,

## Issues
To create an issue, simply click on the issues tab on the menu and create a new issue.


