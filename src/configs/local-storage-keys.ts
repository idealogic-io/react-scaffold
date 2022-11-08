import packages from "../../package.json";

const LOCAL_STORAGE_KEYS = {
  theme: `${packages.name}_theme`,
  token: `${packages.name}_token`,
  refreshToken: `${packages.name}_refreshToken`,
  language: `${packages.name}_language`,
  connector: `${packages.name}_connector`,
};

export default LOCAL_STORAGE_KEYS;
