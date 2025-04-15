import type { FilterPattern, PluginOption } from 'vite';
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
export default function pluginAutoReference(options: PluginOptions): PluginOption;
export {};
