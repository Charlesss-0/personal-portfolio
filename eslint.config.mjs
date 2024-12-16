import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'

import { FlatCompat } from '@eslint/eslintrc'
import _import from 'eslint-plugin-import'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import jsxA11Y from 'eslint-plugin-jsx-a11y'
import path from 'node:path'
import react from 'eslint-plugin-react'
import tsParser from '@typescript-eslint/parser'
import typescriptEslint from '@typescript-eslint/eslint-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

// eslint-disable-next-line import/no-anonymous-default-export
export default [
	{
		ignores: ['**/node_modules', '**/.next'],
	},
	...fixupConfigRules(
		compat.extends(
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:import/typescript',
			'plugin:react/recommended',
			'plugin:jsx-a11y/recommended',
			'plugin:import/errors',
			'plugin:import/warnings',
			'next/core-web-vitals'
		)
	),
	{
		plugins: {
			'@typescript-eslint': fixupPluginRules(typescriptEslint),
			react: fixupPluginRules(react),
			'jsx-a11y': fixupPluginRules(jsxA11Y),
			import: fixupPluginRules(_import),
		},

		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2022,
			sourceType: 'module',

			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},

		rules: {
			'no-console': 'warn',
			'no-unused-vars': 'off',
			'no-var': 'error',
			'prefer-const': 'error',
			eqeqeq: ['error', 'always'],
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'@typescript-eslint/no-empty-function': 'warn',
			'@typescript-eslint/no-unused-expressions': 'error',
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/consistent-type-imports': 'error',

			'@typescript-eslint/array-type': [
				'error',
				{
					default: 'array-simple',
				},
			],

			'@typescript-eslint/no-inferrable-types': 'error',
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/jsx-key': 'error',
			'react/jsx-no-target-blank': 'error',
			'react/self-closing-comp': 'error',
			'jsx-a11y/alt-text': 'warn',

			'jsx-a11y/anchor-is-valid': [
				'error',
				{
					components: ['Link'],
					specialLink: ['hrefLeft', 'hrefRight'],
					aspects: ['noHref', 'invalidHref', 'preferButton'],
				},
			],

			'jsx-a11y/label-has-associated-control': 'error',
			'jsx-a11y/no-redundant-roles': 'error',
			'import/no-unresolved': 'error',
		},
	},
]
