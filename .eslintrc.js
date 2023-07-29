module.exports = {
  extends: ['semistandard', 'standard'],
  rules: {
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' }
    ]
  }
}
