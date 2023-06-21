## decide-python-package
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
The Decide SDK helps developers plug into the functionalities of Decide from their python projects.

- **Website:** https://developers.indicina.co
- **Documentation:** https://developers.indicina.co/docs/decide-python-library

# Using the App
### Installation
In your python project use the command `pip install indicina-decide` to install the Decide SDK

### Authorization
#### sh
```
export INDICINA_CLIENT_ID=my_id
export INDICINA_CLIENT_SECRET=my_secret
```
#### Javascript
```
import os

 const client_id = process.env.INDICINA_CLIENT_ID;
 const client_secret = process.env.INDICINA_CLIENT_SECRET;
```

You can get your `INDICINA_CLIENT_ID` and `INDICINA_CLIENT_SECRET` from [GitHub Pages](https://developers.indicina.co/docs/decide-api-keys).

### Sample Code
#### JSON Statement
```

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
```
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
```

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
```
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

```

# Enum selection of Bank
statement = DecideStatement(
            ...,
            bankCode =  Bank.GTB,
            ...)
```

```
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

```
# Example usage on accessing the analysis response
analysis = statement.analyze()
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


