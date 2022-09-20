import packages from "../../package.json";

const LOCAL_STORAGE_KEYS = {
  theme: `${packages.name}_theme`,
  token: `${packages.name}_token`,
  language: `${packages.name}_language`,
  connector: `${packages.name}_connector`,
  solanaWallet: `${packages.name}_solanaWallet`,
};

export default LOCAL_STORAGE_KEYS;
