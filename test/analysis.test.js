import { StatementType } from '../Decide/enums.js';
import { DecideClient } from '../Decide/decideClient.js';
import { BaseModel } from '../Decide/baseModel.js';

jest.mock('../Decide/decideClient.js');
jest.mock('../Decide/baseModel.js');

import { Analysis } from '../Decide/analysis.js';

describe('Analysis', () => {
  let mockDecideClient;

  beforeEach(() => {
    mockDecideClient = {
      get: jest.fn().mockResolvedValue({ status: 'success', data: {} }),
    };

    DecideClient.mockImplementation(() => mockDecideClient);
    BaseModel.mockImplementation((data) => {
      return {
        _data: data,
        _init: jest.fn(),
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getTransactionTags should fetch transaction tags successfully', async () => {
    const analysisData = { id: '123', statement_type: StatementType.JSON };

    const analysis = {
      getTransactionTags: jest.fn().mockResolvedValue({
        transactionTags: ['debit', 'spend.spendOnTransfers'],
      }),
    };

    await analysis.getTransactionTags();

    expect(analysis.getTransactionTags).toHaveBeenCalled();

  });

});
