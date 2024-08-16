# Task Manager

This application helps You to organize your tasks.

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Project Setup

Require node >= v.18.3.0

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
