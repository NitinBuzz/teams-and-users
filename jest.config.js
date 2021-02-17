module.exports = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$",
    setupFilesAfterEnv: ['./rtl.setup.js']
  };
  