import axios from 'axios';

const api = axios.create({
    baseURL:'https://foodplanet-backend.herokuapp.com',
    
})

api.interceptors.request.use(async config =>{
    try{
        const token = await window.localStorage.getItem('@FoodPlanet:token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    }catch(err){
        console.log(err)
    }
})

export default api;