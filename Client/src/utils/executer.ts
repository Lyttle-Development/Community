import fs from 'fs';

// Todo: Make this an environment variable.
const allowedErrors = 3;
const modulesPath: string = __dirname + '/../../modules.json';
let modules = {};

export function executor(
  moduleName: string,
  moduleFunction: Function,
  ...args: any[]
): any {
  if (!mayExecute(moduleName)) return;
  try {
    const r = moduleFunction(...args);
    console.log('Success!');
    return r;
  } catch (error) {
    setModule(moduleName, 1);
    console.log('Error!');
  }
}

function mayExecute(moduleName: string): boolean {
  try {
    const enabled = modules[moduleName].enabled === true;
    const disabled = modules[moduleName].errors > 3;
    return enabled && !disabled;
  } catch (error) {
    setModule(moduleName);
  }
}

function setModule(moduleName: string, errors: number = 0): void {
  try {
    const file = fs.readFileSync(modulesPath, 'utf8');
    const _modules = (modules = JSON.parse(file));
    try {
      modules[moduleName].errors += errors;
    } catch (error) {
      modules[moduleName] = { enabled: true, errors };
    }

    if (modules[moduleName].errors >= allowedErrors) {
      modules[moduleName].enabled = false;
    }

    fs.writeFileSync(modulesPath, JSON.stringify(modules, null, 2));
  } catch (error) {
    console.error(error);
  }
}