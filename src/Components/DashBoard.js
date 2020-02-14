import React from 'react';
import './css/dashboard.css';
import Userservice from '../service/axiosservice';
import socketIO from 'socket.io-client'

const userservice = new Userservice();
let socket;
export default class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: false,
            users: [],
            messageArray: [],
            filtermessage: [],
            text: '',
            receiverId:'',
            senderId:''
        }
    }
    componentDidMount() {
        this.getUserList();
        // const { endpoint } = this.state;
        // const socket = socketIOClient(endpoint);
        // socket.on('connection',data => this.setState({ response:data }))
        // socket.on('message', function(msg){
        //     console.log(msg);
        // })
        socket = socketIO("http://localhost:3001");
        socket.on("chat message", (data, error) => {

            if (data) {
                console.log("result is back...", data);

                var resultArray = [];
                // resultArray.push(result);
                resultArray = this.state.messageArray;

                resultArray.push(data)

                this.setState({
                    messageArray: resultArray
                })

                // console.log("Received Messages are---->", JSON.stringify(this.state.messageArray));
            }
            else {
                console.log("Error in received message--->", error);

            }
        })
    }

    getUserList = () => {
        userservice.userlistservice()
            .then(res => {
                const users = res.data;
                this.setState({ users });
                console.log(res);
            })
            .catch(err => {
                console.log("caught error", err);
            })
    }

    getMessage = async (user) => {
        localStorage.setItem('receiverId', user._id)
        localStorage.setItem('receiverName', user.FirstName)
        this.setState({ receiverId: user._id, senderId: localStorage.getItem('senderId') })

        await userservice.getmessageservice()
            .then(res => {

                const msg = res.data;
                this.filtermessage = msg.filter(ele => {

                    return (ele.receiverId === localStorage.getItem('receiverId') && ele.senderId === localStorage.getItem('senderId')) || (ele.senderId === localStorage.getItem('receiverId') && ele.receiverId === localStorage.getItem('senderId'))
                })


                this.setState({ messageArray: this.filtermessage });
            })
    }

    inputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    sendMessage = event => {
        event.preventDefault();
        let sendArray = []
        const msgObj = {
            senderId: localStorage.getItem('senderId'),
            senderName: localStorage.getItem('senderName'),
            receiverId: localStorage.getItem('receiverId'),
            receiverName: localStorage.getItem('receiverName'),
            message: this.state.text
        }
        socket.emit('newMsg', msgObj);
        sendArray = this.state.messageArray;
        sendArray.push(msgObj);
        this.setState({
            messageArray: sendArray
        })
        this.setState({
            text: ''
        })
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {

        let chatcss = this.state.receiverId ? "senderMsg":"receiverMsg"
        let messages = this.state.messageArray.map((msg, index) => {
            return (<div key={index}>{msg.message}</div>)
        })
        return (
            <div className="dashboard">
                <div className="topNav">
                    <h3>ChatApp</h3>
                    <button className="right-col" onClick={this.logout}>Logout</button>
                </div>

                <div className="row">
                    <div className="column1">
                        <h3>Users List</h3>
                        {this.state.users.map((user, index) => <p onClick={() => this.getMessage(user)} key={index}>{user.FirstName}</p>)}
                    </div>
                    <div className="column2">
                        <h3>User name</h3>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            
                       
                        <div className="chat">
                            <div className="senderMsg">
                            {/* {this.state.messageArray.map((msg, index) => <div key={index}>{msg.senderId!==this.state.senderId?msg.message:null}</div>)} */}
                        </div>
                        <div className={chatcss}>
                            {/* {this.state.messageArray.map((msg, index) => <div key={index}>{msg.receiverId===this.state.receiverId?msg.message:null}</div>)} */}
                            {messages}
                        </div>
                        </div>
                    </div>
                    <div className="user">
                        <input type="text" name="text" placeholder="type your message here" value={this.state.text} onChange={this.inputChange} />
                        <button type="submit" onClick={this.sendMessage}>send</button>
                    </div>
                </div>
            </div>
            </div >
        );
    }
}
