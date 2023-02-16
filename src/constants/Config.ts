const Config = {
  env: process.env.REACT_APP_NODE_ENV,
  port: process.env.REACT_APP_PORT,
  localStorage: {
    history: "history",
    historySize: "historySize",
    language: "lang",
    theme: "theme",
  },
  backend: {
    jpcoreUrl: process.env.REACT_APP_JPCORE_URL,
  },
};

export default Config;
