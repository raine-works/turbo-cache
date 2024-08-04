import type { Config } from 'release-it';

const version = '${version}';
const packageName = process.env.npm_package_name as string;
const scope = packageName.split('/')[1];

export default {
	plugins: {
		'@release-it/conventional-changelog': {
			path: '.',
			infile: 'CHANGELOG.md',
			preset: 'conventionalcommits',
			gitRawCommitsOpts: {
				path: '.'
			}
		}
	},
	git: {
		push: true,
		tagName: `${packageName}-v${version}`,
		pushRepo: 'git@github.com:raine-works/turbo-cache.git',
		commitsPath: '.',
		commitMessage: `feat(${scope}): released version v${version} [no ci]`,
		requireCommits: true,
		requireCommitsFail: false
	},
	npm: {
		publish: false,
		versionArgs: ['--workspaces false']
	},
	github: {
		release: true,
		releaseName: `${packageName}-v${version}`
	},
	hooks: {
		'before:git:release': ['mvm-update', 'git add --all']
	}
} as Config;
