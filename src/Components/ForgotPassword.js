import React from "react";
import axios from 'axios';
import './css/form.css';

export default class ForgotPassword extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            Email: ''
        }
    }

    handleChangeEmail = event =>{
        this.setState({ Email: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault();
        
        const user = {
            Email:this.state.Email
        }

        axios.post('http://localhost:3001/forgotpassword', user)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(err =>{
            console.log("error caught",err);
        })
    }

    render() {
        return(
            <form>
                <h3>Forgot Password</h3>

                <div className="form-group">
                    <label>Email Address</label>

                    <input type="email" 
                    className="form-control" 
                    placeholder="Email Address" 
                    name="email" 
                    value={this.state.Email} 
                    onChange={this.handleChangeEmail}/>
                </div>

                <button  className="button" onClick={this.handleSubmit}>Sign Up</button>
            </form>
        );
    }
}
