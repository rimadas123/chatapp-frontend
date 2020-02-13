import React from "react";
import { Link } from 'react-router-dom';
import userservice from '../service/axiosservice';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: null,
            Password: null,
            formErrors:{
                Email:'',
                Password:''
            }         
        }
    }

    handleChange = event => {
        event.preventDefault();

        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSubmit = event => {   
        event.preventDefault();

            if(this.state.Email===null&&this.state.Password===null){
                return;
            }

            const user = {
                Email:this.state.Email,
                Password:this.state.Password
            }
            console.log(user);
            
            userservice.loginservice(user)
            .then(res =>{
                alert("Successfully logged in");
                console.log(res.data);
                localStorage.setItem('senderId',res.data.data[0]._id);
                localStorage.setItem('senderName',res.data.data[0].FirstName);
                localStorage.setItem('senderEmail',res.data.data[0].Email);
                    this.setState({
                        Email:'',
                        Password:''
                    });
                    this.props.history.push('/dashboard');
                })
            .catch(err => {
                console.log("error caught",err);
            })     
    }
    
    render() {
        return (
            <form>
                <div className="wrapper">
                    <div className="form">
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
                    </div>
                </div>
            </form>
        );
    }
}
