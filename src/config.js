// config.js is

const wsProtocol = process.env.REACT_APP_WSPROTOCOL || "wss";
const wsHost = process.env.REACT_APP_WSHOST || "localhost";
const wsPort = process.env.REACT_APP_WSPORT || 5001;

const config = {
  editor: {
    drawerWidth: 300,
  },
  yjsws: {
    wsProtocol,
    wsHost,
    wsPort,
    wsServerUrl: `${wsProtocol}://${wsHost}${wsPort == 80 ? '' : ':' + wsPort}`,
  },
};

export default config;
