import { resolve } from 'path';
import { createFilter } from 'vite';
const DEFAULT_PATTERNS = [/\.svelte\?.*type=style/, /\.vue\?.*type=style/];
const DEFAULT_EXCLUDE = [
    /node_modules/,
];
/**
 * A Vite plugin that automatically adds a "@reference" directive to the top of Single File Components (SFCs) that use TailwindCSS.
 *
 * @param {PluginOptions} options - The plugin options.
 */
export default function pluginAutoReference(options) {
    const { include = [], cssRoot } = options;
    const includePatterns = [
        ...DEFAULT_PATTERNS,
        ...(Array.isArray(include) ? include : [include])
    ];
    let configRoot;
    let filter;
    let mainCssFile = cssRoot;
    return {
        name: 'vite-plugin-tailwind-autoreference',
        enforce: 'pre',
        configResolved(config) {
            configRoot = config.root;
            mainCssFile = resolve(configRoot, cssRoot);
            filter = createFilter(includePatterns, DEFAULT_EXCLUDE, { resolve: configRoot });
        },
        async transform(code, id) {
            if (!filter(id))
                return code;
            if (!code.includes('@apply'))
                return code;
            return `@reference "${mainCssFile}";\n${code}`;
        }
    };
}
