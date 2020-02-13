import axios from "axios";
const BASEURL = 'http://localhost:3001';

const userservice = {
        resgisterservice : function(res) {
         return axios.post(BASEURL+'/register', res)

        },
        loginservice : function(res) {
            // console.log(res);
         return axios.post(BASEURL+'/login', res);
        },
        forgotpasswordservice : function(res){
            return axios.post(BASEURL+'/forgotpassword', res);
        },
        resetpasswordservice : function(res) {
            return axios.post(BASEURL+'/resetpassword', res);
        },
        userlistservice : function() {
            return axios.get(BASEURL+'/userlist');
        },
        getmessageservice: function(){
            return axios.get(BASEURL+'/getmessages');
        }
}

export default userservice;

