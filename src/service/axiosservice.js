import axios from "axios";

export default class userservice{
    loginservice(user){
        axios.post('http://localhost:3001/login'+user)
        .then(res=>{
            console.log(res);
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    registerservice(user){
        axios.post('http://localhost:3001/register'+user)
        .then(res=>{
            console.log(res);
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
}
