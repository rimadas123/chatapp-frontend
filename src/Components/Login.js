import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Password: ''          
        }
    }

    handleChangeEmail = event => {
       const {name,value} = event.target;
       this.setState({
           [name]:value
       })
    }

    handleSubmit = event => {
        event.preventDefault();
        
        const user = {
            Email:this.state.Email,
            Password:this.state.Password
        }

        axios.post('http://localhost:3001/login',user)
        .then(res =>{
            console.log(res);
            console.log(res.data);
            this.setState({Email:'',Password:''})
        })
        .catch(err => {
            console.log("error caught",err);
        })

        event.preventDefault();
        this.setState({Email:'',Password:''})  
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
                        placeholder="Enter email"
                        value={this.state.Email}
                        onChange={this.handleChangeEmail} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" 
                        className="form-control" 
                        placeholder="Enter password"
                        value={this.state.Password}
                        onChange={this.handleChangePassword} />
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
