export const useLocalStorageApi = async () => {
  if (typeof localStorage === "undefined" || localStorage === null) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
  }

  return localStorage;
};
