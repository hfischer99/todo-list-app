module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!(string-width)/)"],
  testMatch: ["**/tests/unit/**/*.spec.js"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "jest-transform-stub",
  },
};
