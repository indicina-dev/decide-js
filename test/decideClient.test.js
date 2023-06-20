import fetchMock from 'jest-fetch-mock';
import { DecideClient } from '../Decide/decideClient';
import { DecideException } from '../Decide/decideException';

// Mocked dependencies or values

jest.setMock('isomorphic-fetch', fetchMock);
jest.mock('../Decide/auth', () => ({
  Auth: jest.fn().mockImplementation(() => ({
    refresh: jest.fn(),
    code: 'mocked-auth-code',
  })),
}));
const BASE_URL = 'https://api.example.com';
const mockResponse = (status, body) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
};

describe('DecideClient', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  describe('constructor', () => {
    it('should create an instance of DecideClient', () => {
      const mockPath = 'bsp';
      const mockContentType = 'application/json';
      const decideClient = new DecideClient(mockPath, mockContentType);

      expect(decideClient.path).toBe(mockPath);
      expect(decideClient.content_type).toBe(mockContentType);
      expect(decideClient.auth).toBeDefined();
    });
  });
});