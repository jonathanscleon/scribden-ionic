import { Config } from '@stencil/core';
let globalScript: string = 'src/root/global/app.ts';

const dev: boolean = 
           process.argv && process.argv.indexOf('--dev') > -1;
           
if (dev) {
    globalScript = 'src/root/global/app-dev.ts';
}
// https://stenciljs.com/docs/config

export const config: Config = {
  globalScript,
  globalStyle: 'src/root/global/app.css',
  taskQueue: 'async',
  outputTargets: [{
    type: 'www',
    serviceWorker: null
  }],
};
