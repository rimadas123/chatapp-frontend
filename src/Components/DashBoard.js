import React from 'react';
import './css/dashboard.css';
import Userservice from '../service/axiosservice';
import Socket from './Socket';

const userservice = new Userservice();

export default class DashBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            response: false,
            users:[],
            messageArray:[],
            filtermessage:[],
            text:''
        }
    }
    componentDidMount(){
        this.getUserList();
        // const { endpoint } = this.state;
        // const socket = socketIOClient(endpoint);
        // socket.on('connection',data => this.setState({ response:data }))
        // socket.on('message', function(msg){
        //     console.log(msg);
        // })
        Socket.socketCon();
     
        Socket.receivedMsg((error, result) => {

            if (result) {
                console.log("result is back...", result);
           
               var resultArray = [];
                // resultArray.push(result);
                resultArray = this.state.messageArray;

                resultArray.push(result)

                this.setState({
                    messageArray: resultArray
                })         
                console.log("Received Messages are---->", JSON.stringify(this.state.Messages));
            }
            else {
                console.log("Error in received message--->", error);

            }
        })
    }

    getUserList=() =>{
        userservice.userlistservice()
        .then(res=>{
            const users = res.data;
            this.setState({users});
            console.log(res);
        })
        .catch(err =>{
            console.log("caught error",err);
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
             this.filtermessage = msg.filter(ele => {
                console.log(ele);                
                return ele.receiverId === localStorage.getItem('receiverId') && ele.senderId === localStorage.getItem('senderId')
                })
                console.log("filter message",this.filtermessage);
                
            this.setState({messageArray:this.filmessage});
        })
    }

    inputChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    sendMessage = event => {
        event.preventDefault();
        
        const msgObj = {
            senderId:localStorage.getItem('senderId'),
            senderName:localStorage.getItem('senderName'),
            receiverId:localStorage.getItem('receiverId'),
            receiverName:localStorage.getItem('receiverName'),
            message:this.state.text
        }
        Socket.Emitfun(msgObj)
      
    }

    logout = () =>{
        localStorage.clear();
        this.props.history.push('/');
    }

    render(){
        let messages = this.state.messageArray.map((msg,index)=>{
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
                    </div>
                    <div className="user">
                        <input type="text" name="text" placeholder="type your message here" onChange={this.inputChange} />
                        <button type="submit" onClick={this.sendMessage}>send</button>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
