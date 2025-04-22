import { resolve } from 'path';
import { createFilter } from 'vite';
import type { FilterPattern, PluginOption } from 'vite';

const DEFAULT_PATTERNS = [/\.svelte\?.*type=style/, /\.vue\?.*type=style/] as const;
const DEFAULT_EXCLUDE = [
    /node_modules/,
] as const;

interface PluginOptions {
	/**
	 * A minimatch pattern, or an array of patterns, which specifies the file extensions that the plugin should process.
	 *
	 * If `include` is not provided, the default value is an array containing the following patterns:
	 * ```ts
	 * [
	 *   /\.svelte\?.*type=style/,
	 *   /\.vue\?.*type=style/,
	 * ]
	 * ```
	 *
	 * **Note:** When targeting non-default Single File Components (SFCs), you may need to append `\?.*type=style` to your pattern. This will ensure that the plugin processes only the CSS files that are generated for the SFC
	 */
	include?: FilterPattern;
	/**
	 * The path to your main css file which contains the tailwindcss imports.
	 */
	cssRoot: string;
}

/**
 * A Vite plugin that automatically adds a "@reference" directive to the top of Single File Components (SFCs) that use TailwindCSS.
 *
 * @param {PluginOptions} options - The plugin options.
 */
export default function pluginAutoReference(options: PluginOptions): PluginOption {
	const { include = [], cssRoot } = options;
	const includePatterns: FilterPattern = [
		...DEFAULT_PATTERNS,
		...(Array.isArray(include) ? include : [include])
	];

	let configRoot: string;
	let filter: (id: string) => boolean;
	let mainCssFile: string = cssRoot;

	return {
		name: 'vite-plugin-tailwind-autoreference',
		enforce: 'pre',
		configResolved(config) {
			configRoot = config.root;
			mainCssFile = resolve(configRoot, cssRoot);
			filter = createFilter(includePatterns, DEFAULT_EXCLUDE, { resolve: configRoot });
		},
		async transform(code, id) {
			if (!filter(id)) return {
				code,
				map: null
			}
			if (!code.includes('@apply')) return {
				code,
				map: null
			}

			return {
				code: `@reference "${mainCssFile}";\n${code}`,
				map: null
			}
		}
	};
}
