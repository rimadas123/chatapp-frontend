import axios from "axios";

module.exports = {
    async axiosRegister(res){
        try {
            const response = await axios.post('http://localhost:3001/register', res);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
    
}