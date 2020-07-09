// import { jexiaClient, dataOperations } from 'jexia-sdk-js/browser';
import { getConfig } from './environmentConfig';

declare var jexia: any;

const dataModule = jexia.dataOperations();
const umsModule = new jexia.UMSModule();

const credentials = getConfig();

// jexia.jexiaClient().init(credentials as any, dataModule);
jexia.jexiaClient().init(credentials as any, umsModule, dataModule);

export const db = dataModule;
export const ums = umsModule;
