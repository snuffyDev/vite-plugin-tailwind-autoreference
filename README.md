# vite-plugin-tailwind-autoreference

[Find me on npm!](https://www.npmjs.com/package/vite-plugin-tailwind-autoreference)

A Vite plugin which will *automatically* add `@reference` directives to your Single File Components (SFCs) `<style>` blocks.

This plugin is designed to work with [Tailwind CSS v4](https://tailwindcss.com/), and is setup to target Svelte and Vue files out of the box.

- :muscle: Flexible - *can target any desired SFC file type!*
- :sunglasses: Easy - *just add the plugin to your Vite config!*
- :robot: Automatic - *no need to manually add `@reference` directives!*

## Compatibility
This plugin targets the following dependency versions:
- \>= Node 20.x
- \>= Vite 5.x
- \>= [Tailwind CSS v4.x](https://tailwindcss.com/)

> :exclamation: **The compatibility list is not exhaustive**, the plugin may work with other Vite/Node versions, but it is not guaranteed.

## Installation
To install the plugin, run the following command:

#### npm
```bash
npm install vite-plugin-tailwind-autoreference --save-dev
```
#### pnpm
```bash
pnpm add vite-plugin-tailwind-autoreference --save-dev
```
#### bun
```bash
bun add vite-plugin-tailwind-autoreference --dev
```

## Usage

To get started, you need to add the plugin to your Vite config file. Here's a basic example using SvelteKit:

```js
// vite.config.js
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import { sveltekit } from '@sveltejs/kit/vite';
import twAutoReference from 'vite-plugin-tailwind-autoreference';

export default defineConfig({
  plugins: [
    sveltekit(),
    twAutoReference({
        cssRoot: 'src/app.css', // Specify the path to the CSS file that imports tailwindcss
        include: [
            // Patterns to include specific file types
        ]
    }),
    tailwindcss(),
  ] // Make sure tailwindcss is added after the autoreference plugin
});
```


## Options
The plugin accepts the following options:
- `cssRoot` (**required**): The path to the CSS file that imports Tailwind CSS. This is used to determine the root of the CSS files in your project.
- `include` (**optional**): A pattern, or an array of patterns, to include specific files. The default targets are Svelte and Vue files.

### Using the `include` option

The `include` option allows you to specify which files to include in the plugin's processing.


It's recommended to use this syntax to ensure proper processing of your styles. `/\.ext\?.*type=style/` where `ext` is the file extension you want to target. Appending `?type=style` ensures that the plugin processes only the style blocks for the specified file type.

