import { EnvironmentConfig } from './environmentConfig-interface';

export function setupConfig(config: EnvironmentConfig) {
  if (!window) {
    return;
  }

  const win = window as any;
  const scribden = win.Scribden;

  if (scribden && scribden.config &&
    scribden.config.constructor.name !== 'Object') {
    console.error('ScribDen config was already initialized');
    return;
  }

  win.Scribden = win.Scribden || {};
  win.Scribden.config = {
    ...win.Scribden.config,
    ...config
  };

  return win.Scribden.config;
}

export function getConfig(): EnvironmentConfig {
  const win = window as any;
  return win.Scribden.config;
}
