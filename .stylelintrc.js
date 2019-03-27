module.exports = {
	extends: 'stylelint-config-standard',
	rules: {
		indentation: ['tab', { baseIndentLevel: 1 }],
		'selector-type-no-unknown': [
			true,
			{
				ignoreTypes: [/^bb-/, /^nz-/],
			},
		],
	},
	syntax: 'sass',
};
