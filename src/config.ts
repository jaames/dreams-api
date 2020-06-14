import path from 'path';
import fs from 'fs';

const configPath = path.resolve(__dirname, '../apiconfig.json');

let config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

export function getConfig() {
  return config;
}

export function setConfig(newConfig: any) {
  config = newConfig;
  fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
}

export function getConfigValue(key: string) {
  return config[key];
}

export function setConfigValue(key: string, value: any) {
  setConfig({
    ...config,
    [key]: value
  });
}