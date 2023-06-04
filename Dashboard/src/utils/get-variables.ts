export const getVariables = (
  module: any,
): {
  variable: string;
  description: string;
}[] => {
  const variables = (module?.variables as string[]) ?? [];
  return variables.map((variable) => ({
    variable: variable,
    description: 'No description provided.',
  }));
};
