import React from "react";
import './css/form.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Button = ({children, onClick}) => (
    <div onClick={ onClick } tabIndex={ 0 }>
        { children }
    </div>
);

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            FirstName: '',
            LastName: '',
            Email: '',
            Password: ''
        }

    }
    

    handleChangeFirstName = event => {
        this.setState({FirstName: event.target.value});   
    }

    handleChangeLastName = event => {
        this.setState({LastName: event.target.value});
    }

    handleChangeEmail = event => {
        this.setState({Email: event.target.value});
    }

    handleChangePassword = event => {
        this.setState({Password: event.target.value});  
    }

    handleSubmit = event => {

        event.preventDefault();
  
        const user = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.Email,
            Password: this.state.Password
        };

        console.log(user);
        

        axios.post('http://localhost:3001/register', user )
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(err =>{
            console.log("error caught",err);
        })

    }

    isDisabled = () => {

    }
    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First Name</label>

                    <input type="text"
                     className="form-control"
                     placeholder="First Name" 
                     name="firstname" 
                     value={this.state.FirstName} 
                     onChange={this.handleChangeFirstName} />
                </div>

                <div className="form-group">
                    <label>Last Name</label>

                    <input type="text" 
                    className="form-control" 
                    placeholder="Last Name" 
                    name="lastname" 
                    value={this.state.LastName} 
                    onChange={this.handleChangeLastName}/>
                </div>

                <div className="form-group">
                    <label>Email Address</label>

                    <input type="email" 
                    className="form-control" 
                    placeholder="Email Address" 
                    name="email" 
                    value={this.state.Email} 
                    onChange={this.handleChangeEmail}/>
                </div>

                <div className="form-group">
                    <label>Password</label>

                    <input type="password" 
                    className="form-control" 
                    placeholder="Password" 
                    name="password" 
                    value={this.state.Password} 
                    onChange={this.handleChangePassword}/>
                </div>

                <button  className="button" onClick={this.handleSubmit}>Sign Up</button>
                <p className="forgot-password text-right">     
                Already registered ? <Link className="nav-link" to ={"/sign-in"}> Sign In</Link>
                </p>
            </form>    
        );
    }
}

