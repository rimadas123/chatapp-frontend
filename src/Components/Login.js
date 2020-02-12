import React from "react";
import { Link } from 'react-router-dom';
import userservice from '../service/axiosservice';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Password: ''          
        }
    }

    handleChange = event => {
       this.setState({
           [event.target.name]:event.target.value
       })
    }

    handleSubmit = event => {   
        event.preventDefault();

        const user = {
            Email:this.state.Email,
            Password:this.state.Password
        }
        console.log(user);
        
        userservice.loginservice(user)
        .then(res =>{
            console.log(res);
            console.log(res.data);
            localStorage.setItem('senderId',res.data.data[0]._id);
            localStorage.setItem('senderName',res.data.data[0].FirstName);
            localStorage.setItem('senderEmail',res.data.data[0].Email);
                this.setState({
                    Email:'',
                    Password:''
                })
            })
        .catch(err => {
            console.log("error caught",err);
        })     
    }
    
    render() {
        return (
            <div className="wrapper">
                <form className="form">
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" 
                        className="form-control" 
                        name="Email"
                        placeholder="Enter email"
                        onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" 
                        className="form-control" 
                        name="Password"
                        placeholder="Enter password"
                        onChange={this.handleChange} />
                    </div>

                    <button type="submit" className="button" onClick={this.handleSubmit}>Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <Link className="nav-link" to ={"/forgotpassword"}>password?</Link>
                    </p>
                    <p className="forgot-password text-left">
                    <Link className="nav-link" to ={"/sign-up"}>Sign Up</Link>
                    </p>
                </form>
            </div>
        );
    }
}
