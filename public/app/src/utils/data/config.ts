export interface IGloabalVariables {
  apiUrl: string;
}

const devVariables: IGloabalVariables = {
  apiUrl: "http://192.168.0.21:8000"
};

const prodVariables: IGloabalVariables = {
  apiUrl: "https://api.matchpet.org"
};

function getGlobal(key: keyof IGloabalVariables) {
  const env = process.env.NODE_ENV;
  if (env === "development") {
    return devVariables[key];
  } else if (env === "production") {
    return prodVariables[key];
  } else {
    return devVariables[key];
  }
}

export { getGlobal };
