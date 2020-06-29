// import { jexiaClient, dataOperations } from 'jexia-sdk-js/browser';
import { getConfig } from '../helpers/environmentConfig';

declare var jexia: any;

const dataModule = jexia.dataOperations();

const credentials = getConfig();

jexia.jexiaClient().init(credentials as any, dataModule);

export const db = dataModule;
