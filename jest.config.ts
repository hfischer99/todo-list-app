// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.[tj]sx?$": "ts-jest",
  },
};
