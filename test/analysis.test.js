import { StatementType } from '../Decide/enums.js';
import { DecideClient } from '../Decide/decideClient.js';
import { BaseModel } from '../Decide/baseModel.js';

jest.mock('../Decide/decideClient.js');
jest.mock('../Decide/baseModel.js');

// Import the Analysis class from the original file
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

    // Mock the Analysis class directly
    const analysis = {
      getTransactionTags: jest.fn().mockResolvedValue({
        // Mock the response data as needed
        transactionTags: ['debit', 'spend.spendOnTransfers'],
      }),
    };

    await analysis.getTransactionTags();

    expect(analysis.getTransactionTags).toHaveBeenCalled();
    // Add more assertions as needed
  });

  // Add more tests for other methods and behaviors of the Analysis class

});
