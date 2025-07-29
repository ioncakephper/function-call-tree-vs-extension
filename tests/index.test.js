const main = require('../src/index');

describe('main function from src/index.js', () => {
  it('should return the correct configuration object', () => {
    const expectedConfig = {
      files: ['**/*.{js,md,json}'],
      tasks: ['eslint --fix', 'prettier --write'],
      verbose: true,
      ignore: ['node_modules', 'dist', 'coverage', '.git'],
      watch: {
        paths: {
          glob: '**/*.{js,md,json}',
          options: {
            ignoreInitial: true,
          },
        },
      },
    };
    expect(main()).toEqual(expectedConfig);
  });
});
