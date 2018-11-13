# rollup-starter-app-example

This repo contains a bare-bones example of how to create a library using Rollup, including importing a module from `node_modules` and converting it from CommonJS.

## Getting started

Clone this repository and install its dependencies:

```bash
npm install
```

`npm run build` builds the library to `dist`

`npm run build -- --environment GOOGLE_MAPS_API:YOUR-API-KEY` does a development build

`npm run build -- --environment GOOGLE_MAPS_API:YOUR-API-KEY,NODE_ENV:production` does a production build
