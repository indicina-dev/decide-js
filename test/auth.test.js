import { Auth } from '../Decide/auth'

describe('Auth', () => {
  let auth;

  beforeEach(() => {
    auth = new Auth();
  });

  it('should refresh the token', async () => {
    await auth.refresh();
    expect(auth.code).toBeDefined();
  });

  it('should throw an error when setting the code', () => {
    expect(() => {
      auth.code = '123456';
    }).toThrow('You cannot set this value.');
  });
});
