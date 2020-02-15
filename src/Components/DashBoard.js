import React from 'react';
import './css/dashboard.css';
import Userservice from '../service/axiosservice';
import socketIOClient from 'socket.io-client'

const userservice = new Userservice();
const socket = socketIOClient('http://localhost:3001');
export default class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: false,
            users: [],
            messageArray: [],
            filtermessage: [],
            text: '',
            receiverId: '',
            senderId: '',
            username: '',
            loginUser: ''
        }
    }

    componentDidMount() {
        this.setState({ loginUser: localStorage.getItem('senderName') })
        this.getUserList();

        socket.on("newmessage", (data, error) => {
            if (data)
            {
                var resultArray = [];
                resultArray = this.state.messageArray;
                resultArray.push(data)

                console.log("in resultArray==>", resultArray);

                this.setState({
                    messageArray: resultArray
                })

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
        this.setState({ username: localStorage.getItem('receiverName'), loginUser: localStorage.getItem('senderName') })

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

        // sendArray.push(msgObj);
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

        let messages = this.state.messageArray.map((msg, index) => {
            return (

                (msg.receiverId === this.state.receiverId) ? <div className="msg_cotainer" key={index}><div className="msg_cotainer_in"> {msg.message} </div></div>
                    :
                    <div className="msg_cotainer_send" key={index}>{msg.message}</div>
            )
        })
        return (
            <div className="dashboard">
                <div className="topNav">
                    <h3>ChatApp</h3>
                    
                    <button className="right-col" onClick={this.logout}>Logout</button>
                    <h3 className="username">Welcome {this.state.loginUser}</h3>
                </div>

                <div className="row">
                    <div className="column1">
                        <h3>Users List</h3> 
                        {this.state.users.map((user, index) => <p onClick={() => this.getMessage(user)} key={index}>{user.FirstName !== this.state.loginUser ? user.FirstName : null}</p>)}
                    </div>
                    <div className="column2">
                        <h3>{this.state.username}</h3>
                        <div className="chat">
                            {messages}
                        </div>
                        <input type="text" name="text" placeholder="type your message here" value={this.state.text} onChange={this.inputChange} />
                        <button type="submit" onClick={this.sendMessage}>send</button>
                    </div>
                </div>
            </div>
        );
    }
}
// style={{display:"flex",flexDirection:"row"}}