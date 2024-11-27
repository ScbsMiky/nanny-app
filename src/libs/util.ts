export function checkIfHasEmptyField(fields: Record<string, any>): boolean {
  return Object.keys(fields).every((key) => {
    if(typeof fields[key] == "object") {
      return checkIfHasEmptyField(fields[key]);
    };

    if(typeof fields[key] == "string") {
      return fields[key].length != 0;
    };

    return true;
  });
};