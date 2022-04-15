
import axios from "axios";

let baseURL = "/";


const http = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    validateStatus: function (status) {
        return status < 600; // Resolve only if the status code is less than 500
    }
});




http.easyGet = async (url) => {
    
        let {data}  = await http.get(url);
        console.log(data)
        // 跑登出
        if (!data) {
            return null;
        }

        return data;
    
};

http.easyPost = async (url, postData) => {
    try {
        let configs = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let {data}  = await http.post(url, JSON.stringify(postData),configs)


        return data;
    } catch (e) {
        console.log(e)
    }
    return false;
};



export { http };
