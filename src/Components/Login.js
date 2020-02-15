import React from "react";
import { Link } from 'react-router-dom';
import Userservice from '../service/axiosservice';
import * as formvalidation from '../service/validator';
const userservice = new Userservice();
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

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

        const { name,value } = event.target;
        let formErrors = this.state.formErrors;

        switch(name){
            case 'Email':
                formErrors.Email = emailRegex.test(value) && value.length > 0 ? "" : "invalid email address";
                break;
            case 'Password':
                formErrors.Password = value.length < 6 && value.length > 0 ? "minimum 6 characters" : "";
                break;
            default:
                console.log("wrong input");
        }
        this.setState({ formErrors,[name]:value}, () => (this.state));

    }

    handleSubmit = async event => {   
        event.preventDefault();

        if(formvalidation.formValid(this.state.formErrors)) {

            if(this.state.Email===null&&this.state.Password===null){
                return;
            }
            const user = {
                Email:this.state.Email,
                Password:this.state.Password
            }
 
            await userservice.loginservice(user)
            .then(res =>{
                alert("Successfully logged in");
                console.log(res.data);
                localStorage.setItem('senderId',res.data.data[0]._id);
                localStorage.setItem('senderName',res.data.data[0].FirstName);
                localStorage.setItem('senderEmail',res.data.data[0].Email); 
                this.props.history.push('/dashboard');
                })
            .catch(err => {
                console.log("error caught",err);
            })
        } else {
            console.log("wrong input");
        }        
    }
    
    render() {
        const { formErrors } = this.state;
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
                                { formErrors.Email.length > 0 && (
                                <span className="errorMessage">{formErrors.Email}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" 
                                className="form-control" 
                                name="Password"
                                placeholder="Enter password"
                                onChange={this.handleChange} 
                                autoComplete="on"
                                />
                                { formErrors.Password.length > 0 && (
                                <span className="errorMessage">{formErrors.Password}</span>
                                )}
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
