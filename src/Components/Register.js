import React from "react";
import './css/form.css';
import { Link } from 'react-router-dom';
import userservice from '../service/axiosservice';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
}
export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            FirstName: null,
            LastName: null,
            Email: null,
            Password: null,
            formErrors: { 
                FirstName: '',
                LastName: '', 
                Email: '', 
                Password: ''
            }
        };
    }

    handleSubmit= e => {
        e.preventDefault();
        
        if(formValid(this.state.formErrors)){

            const user = {
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                Email: this.state.Email,
                Password: this.state.Password
            };

            console.log(user);
            
            userservice.resgisterservice(user)
            .then((result) => {
                console.log("successfully created user",result);
                this.setState({FirstName:'',LastName:'',Email:'',Password:''})
            }).catch((err) => {
                console.log(err);
            });
            
        } else {
            console.error('Form Invalid');
        }   
    } 

    handleChange = e => {
      e.preventDefault();
      
      const { name,value } = e.target;
      let formErrors = this.state.formErrors;

      switch(name) {
          case 'FirstName':
              formErrors.FirstName = value.length < 3 && value.length > 0 ? "minimum 3 characters required" : "";
              break;
          case 'LastName':
              formErrors.LastName = value.length < 3 && value.length > 0 ? "minimum 3 characters required" : "";
              break;
          case 'Email':
              formErrors.Email = emailRegex.test(value) && value.length > 0 ? "" : "invalid email address";
              break;
          case 'Password':
              formErrors.Password = value.length < 6 && value.length > 0 ? "minimum 6 characters required" : "";
               break;
            default : 
                console.log("wrong input");
                break;   
            }
        this.setState({ formErrors, [name]: value}, () => console.log(this.state));
    }

    render() {

        const { formErrors } = this.state;

        return (
            <div className="wrapper">
                <form className="form">
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First Name</label>

                        <input type="text"
                        className="form-control"
                        placeholder="First Name" 
                        name="FirstName" 
                        onChange={this.handleChange} 
                        />
                        { formErrors.FirstName.length > 0 && (
                            <span className="errorMessage">{formErrors.FirstName}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>

                        <input type="text" 
                        className="form-control" 
                        placeholder="Last Name" 
                        name="LastName" 
                        onChange={this.handleChange}
                        />
                        { formErrors.LastName.length > 0 && (
                            <span className="errorMessage">{formErrors.LastName}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>

                        <input type="email" 
                        className="form-control" 
                        placeholder="Email Address" 
                        name="Email" 
                        onChange={this.handleChange}
                        />
                        { formErrors.Email.length > 0 && (
                            <span className="errorMessage">{formErrors.Email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input type="password" 
                        className="form-control" 
                        placeholder="Password" 
                        name="Password" 
                        onChange={this.handleChange}
                        />
                        { formErrors.Password.length > 0 && (
                            <span className="errorMessage">{formErrors.Password}</span>
                        )}
                    </div>

                    <button type="submit" className="button" onClick={this.handleSubmit}>Sign Up</button>
                    <p className="forgot-password text-right">     
                    Already registered ? <Link className="nav-link" to ={"/sign-in"}> Sign In</Link>
                    </p>
                </form>
            </div>      
        );
    }
}