import packages from "../../package.json";

const LOCAL_STORAGE_KEYS = {
  theme: `${packages.name}_theme`,
  token: `${packages.name}_token`,
  language: `${packages.name}_language`,
};

export default LOCAL_STORAGE_KEYS;
