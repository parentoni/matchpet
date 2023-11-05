export interface IGloabalVariables {
    apiUrl: string
}

const devVariables: IGloabalVariables = {
    apiUrl: 'http://localhost:8000'
}

const prodVariables: IGloabalVariables = {
    apiUrl: 'http://ec2-15-228-246-55.sa-east-1.compute.amazonaws.com'
}

function getGlobal(key: keyof IGloabalVariables) {
    const env = process.env.NODE_ENV
    if (env === 'development') {
        return devVariables[key]
    } else if (env === 'production'){
        return prodVariables[key]
    } else {
        return devVariables[key]
    }
}

export {getGlobal}