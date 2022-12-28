import { Delays, greeter } from '../src/main.js';

describe('greeter function', () => {
  const name = 'John';
  let hello: string;

  let timeoutSpy: jest.SpyInstance;

  // Act before assertions
  beforeAll(async () => {
    jest.useFakeTimers();
    timeoutSpy = jest.spyOn(global, 'setTimeout');

    const p: Promise<string> = greeter(name);
    jest.runOnlyPendingTimers();
    hello = await p;
  });

  // Teardown (cleanup) after assertions
  afterAll(() => {
    timeoutSpy.mockRestore();
  });

  // Assert if setTimeout was called properly
  it('delays the greeting by 2 seconds', () => {
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      Delays.Long,
    );
  });

  // Assert greeter result
  it('greets a user with `Hello, {name}` message', () => {
    expect(hello).toBe(`Hello, ${name}`);
  });
});
