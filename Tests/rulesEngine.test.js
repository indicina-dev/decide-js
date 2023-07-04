const { DecideClient } = require('../Decide/decideClient.js');

const {
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
} = require('../Decide/ruleEngine.js');

describe('ScorecardAPI', () => {
  let scorecardAPI;

  beforeEach(() => {
    scorecardAPI = new ScorecardAPI();
  });

  describe('createScorecard', () => {
    it('should create a new scorecard', async () => {
      const response = {
        data: {
          scorecard: {
            name: 'My Scorecard',
            booleanRulesetId: '123',
            affordability: {},
            owner: 'John Doe',
            status: 'active',
            createdAt: '2023-07-04T12:00:00Z',
            updatedAt: '2023-07-04T13:00:00Z',
            id: 456
          }
        }
      };

      scorecardAPI.client.post = jest.fn(() => response);

      const booleanRuleSet = new BooleanRuleSet(
        'My Rule Set',
        Outcome.ACCEPT,
        Outcome.DECLINE,
        'John Doe',
        []
      );

      const affordability = new Affordability();

      const status = Status.ENABLED;

      const scorecardRequest = new ScorecardRequest(
        'My Scorecard',
        booleanRuleSet,
        affordability,
        status
      );

      const result = await scorecardAPI.createScorecard(scorecardRequest);

      expect(result).toEqual(ScorecardResponse.fromDict(response.data.scorecard));
    });
  });

  describe('readScorecard', () => {
    it('should retrieve an existing scorecard', async () => {
      const scorecardId = '123';

      const response = {
        statusCode: 200,
        data: {
          name: 'My Scorecard',
          booleanRulesetId: '123',
          affordability: {},
          owner: 'John Doe',
          status: 'active',
          createdAt: '2023-07-04T12:00:00Z',
          updatedAt: '2023-07-04T13:00:00Z',
          id: scorecardId
        }
      };

      scorecardAPI.client.get = jest.fn(() => response);

      const result = await scorecardAPI.readScorecard(scorecardId);

      expect(result).toEqual(ScorecardResponse.fromDict(response.data));
    });

    it('should return null for a non-existent scorecard', async () => {
      const scorecardId = '123';

      const response = {
        statusCode: 404,
        data: {}
      };

      scorecardAPI.client.get = jest.fn(() => response);

      const result = await scorecardAPI.readScorecard(scorecardId);

      expect(result).toBeNull();
    });
  });

  // Additional tests for other methods (updateScorecard, deleteScorecard, executeScorecard, listScorecards)
});
