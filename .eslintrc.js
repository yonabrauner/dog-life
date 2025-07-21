module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react', 'react-native', 'react-hooks', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react-native/all',
        'plugin:@typescript-eslint/recommended',
        'prettier', // turn off ESLint rules that conflict with Prettier
    ],
    rules: {
        // your rules here
        'react/react-in-jsx-scope': 'off', // not needed in React 17+
        'react-native/no-inline-styles': 'off', // turn off if you're okay with inline styles
        '@typescript-eslint/no-unused-vars': ['warn'],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};