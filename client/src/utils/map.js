// let map = new AMap.Map()

export const getPlugin = (pluginname,options) => {
    return new Promise((resolve) => {
        AMap.plugin(pluginname,() => {
            const Oplugins = new AMap[pluginname.split(".")[1]]({
                ...options
            })
            resolve(Oplugins)
        })
    })
}

