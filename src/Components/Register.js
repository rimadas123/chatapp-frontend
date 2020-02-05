import React from "react";
import './css/form.css';
import axios from 'axios';

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    }
    

    handleChangeFirstName = event => {
        this.setState({firstname: event.target.value});   
    }

    handleChangeLastName = event => {
        this.setState({lastname: event.target.value});
    }

    handleChangeEmail = event => {
        this.setState({email: event.target.value});
    }

    handleChangePassword = event => {
        this.setState({password: event.target.value});  
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        
        
        const user = {
            FirstName: this.state.firstname,
            LastName: this.state.lastname,
            Email: this.state.email,
            Password: this.state.password
        };

        console.log(user);
        

        axios.post('http://localhost:3001/register',{ user })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })

    }

    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" placeholder="First Name" name="firstname" value={this.state.firstname} onChange={this.handleChangeFirstName} />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" placeholder="Last Name" name="lastname" value={this.state.lastname} onChange={this.handleChangeLastName}/>
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleChangeEmail}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChangePassword}/>
                </div>

                <button type="submit" className="button" onSubmit={this.handleSubmit}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">Sign In</a>
                </p>
            </form>    
        );
    }
}

