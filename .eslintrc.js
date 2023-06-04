module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/typescript/recommended', '@vue/eslint-config-airbnb-with-typescript'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-extraneous-dependencies': ['off'],
    'vue/max-len': ['off'],

    /* For server production build: */
    // 'linebreak-style': ['off'],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        '@typescript-eslint/indent': 'off',
        'class-methods-use-this': 'off',
        'vue/first-attribute-linebreak': [
          'error',
          {
            singleline: 'beside',
            multiline: 'beside',
          },
        ],
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: {
              max: 4,
            },
            multiline: {
              max: 3,
            },
          },
        ],
      },
    },
  ],
};
