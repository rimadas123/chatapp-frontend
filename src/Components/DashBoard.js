import React from 'react';
import './css/dashboard.css';
import socketIOClient from 'socket.io-client';
import userservice from '../service/axiosservice';

export default class DashBoard extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            response: false,
            endpoint: "http://localhost:3001",
            users:[]
        }
    }
    componentDidMount(){
        userservice.userlistservice()
        .then(res=>{
            const users = res.data;
            this.setState({users});
            console.log(res);
        })
        .catch(err =>{
            console.log("caught error",err);
        })
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('connection',data => this.setState({ response:data }))
        socket.on('message', function(msg){
            console.log(msg);
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
                        {this.state.users.map((user,index) => <p key={index}>{user.FirstName}</p>)}
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
