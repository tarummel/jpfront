const Config = {
  env: process.env.REACT_APP_NODE_ENV,
  port: process.env.REACT_APP_PORT,
  localStorage: {
    history: "history",
    historySize: "historySize",
    historySizeDefault: 20,
    language: "i18nextLng",
    vcOpen: "vcOpen",
    vcSensitivity: "vcSensitivity",
    theme: "theme",
    themeDefault: "dark",
  },
  backend: {
    jpcoreUrl: process.env.REACT_APP_JPCORE_URL,
  },
  getStorage: function(path: string) {
    return localStorage.getItem(path);
  },
  setStorage: function(path: string, value: any) {
    if (typeof value === "string") {
      return localStorage.setItem(path, value);
    } else {
      return localStorage.setItem(path, value.toString());
    }
  },
};

export default Config;
