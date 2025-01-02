export interface IGloabalVariables {
  apiUrl: string;
}

const devVariables: IGloabalVariables = {
  apiUrl: "http://localhost:8000"
};

const prodVariables: IGloabalVariables = {
  apiUrl: "https://apiv2.matchpet.org"
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
