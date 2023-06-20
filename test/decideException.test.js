import { DecideException } from '../Decide/decideException';

describe('DecideException', () => {
  it('should create a DecideException instance with correct properties', () => {
    const code = 404;
    const message = 'Not Found';

    const exception = new DecideException(code, message);

    expect(exception.statusCode).toBe(code);
    expect(exception.message).toBe(message);
  });
});