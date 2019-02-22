import easingAnimationFrames from '../src';

describe('easingAnimationFrames', () => {
  it('should call template function', (done) => {
    const template = ({ progress }) => {
      expect(progress).toBe(0);
      done();
    };
    easingAnimationFrames({ template });
  });

  it('should call callback function', (done) => {
    const mock = jest.fn();
    const template = () => {};
    const complete = () => {
      mock();
      expect(mock).toHaveBeenCalled();
      done();
    };
    easingAnimationFrames({
      template,
      complete,
    });
  });
});
