import axios from 'axios'
const httpAxios = axios.create({
    timeout: 2000
})

httpAxios.interceptors.request.use((config) => {
    return {
        ...config,
        headers: {
            "authorization": sessionStorage.getItem("userinfo") ? JSON.parse(sessionStorage.getItem("userinfo")).token : ''
        }
    }
}, (error) => {
    return Promise.reject(error);
})

httpAxios.interceptors.response.use((res) => {
    return res.data;
}, (error) => {
    alert(error.response.data.msg)
    return error.response.data
})

export default httpAxios;