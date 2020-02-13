import axios from "axios";
const BASEURL = 'http://localhost:3001';

class Userservice {
        resgisterservice = (data) => {
         return axios.post(BASEURL+'/register', data)

        }
        loginservice = (data) => {
            // console.log(res);
         return axios.post(BASEURL+'/login', data);
        }
        forgotpasswordservice = (data) => {
            return axios.post(BASEURL+'/forgotpassword', data);
        }
        resetpasswordservice = (data) => {
            return axios.post(BASEURL+'/resetpassword', data);
        }
        userlistservice = () => {
            return axios.get(BASEURL+'/userlist');
        }
        getmessageservice = () => {
            return axios.get(BASEURL+'/getmessages');
        }
}

export default Userservice;

