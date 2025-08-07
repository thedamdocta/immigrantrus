module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Minimal rules for production system
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.js',
    '*.cjs',
    'src/embedded-mcp/',
  ],
};
