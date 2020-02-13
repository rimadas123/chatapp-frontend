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
            users:[],
            message:[],
            filmessage:[]
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
    
    getMessage = (user) =>{
        localStorage.setItem('receiverId',user._id)
        localStorage.setItem('receiverName',user.FirstName)
        console.log(user._id);
        
        userservice.getmessageservice()
        .then(res => {
            
            console.log('===>',res);
            const msg = res.data;
             this.filmessage =msg.filter(ele=>{
                 console.log(ele);
                 
                return ele.receiverId === localStorage.getItem('receiverId')
                })
                console.log("filter message",this.filmessage);
                
            this.setState({message:this.filmessage});
        })
        }

    logout = () =>{
        this.props.history.push('/');
    }

    render(){
        let messages = this.state.message.map((msg,index)=>{
            return (<div key={index}>{msg.message}</div>)
        })
        return(
            <div className="dashboard">
                <div className="topNav">
                    <h3>ChatApp</h3>
                    <button className="right-col" onClick={this.logout}>Logout</button>
                </div>

                <div className="row">
                    <div className="column1">
                        <h3>Users List</h3>
                        {this.state.users.map((user,index) => <p onClick={()=>this.getMessage(user)} key={index}>{user.FirstName}</p>)}
                    </div>
                    <div className="column2">
                        <h3>User name</h3>
                        <div className="chat">
                            {messages}
                            {/* {filteredMsg} */}
                        </div>
                        <div className="user">
                            <input type="text" placeholder="type your message here" />
                            <button type="submit">send</button>
                        </div>
                    </div>
                    </div>
                </div>
        );
    }
}
