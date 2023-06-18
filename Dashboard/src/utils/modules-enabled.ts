export const getModulesEnabled = (guild: any) => {
  let modulesEnabled = 0;
  if (guild?.moduleLevel?.enabled) ++modulesEnabled;
  if (guild?.moduleVoiceGrowth?.enabled) ++modulesEnabled;
  return modulesEnabled;
};
