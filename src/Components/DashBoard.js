import React from 'react';
import './css/dashboard.css';
import Axios from 'axios';

export default class DashBoard extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            users:{}
        }
    }
    componentDidMount(){
        Axios.get(``)
        .then(res=>{
            console.log(res.data);
        })
        .catch(err =>{
            console.log("caught error",err);
        })
    }
    render(){
        return(
            <div className="dashboard">
                <div className="topNav">
                    <h3>ChatApp</h3>
                </div>

                <div className="row">
                    <div className="column1">
                        <h3>Users List</h3>

                    </div>
                    <div className="column2">
                        <h3>User name</h3>
                        <div className="chat"></div>
                        <form className="user">
                            <input type="text" placeholder="type your message here" />
                            <button type="submit">send</button>
                        </form>
                    </div>
                    </div>
                </div>
        );
    }
}
