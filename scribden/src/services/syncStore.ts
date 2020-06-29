import { jexiaClient, dataOperations } from 'jexia-sdk-js/browser';
import { getConfig } from '../helpers/environmentConfig';

const dataModule = dataOperations();

const credentials = getConfig();

jexiaClient().init(credentials as any, dataModule);

export const db = dataModule;
