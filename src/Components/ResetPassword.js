import React from "react";
import axios from 'axios';
import './css/form.css';

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            NewPassword:'',
            ConfirmPassword:'',
        }
    }

    handleChange = event => {
        const { name,value } = event.target;
        this.setState({ 
            [name]: value
        })
    }
 
    handleSubmit = event => {
        event.preventDefault();
        
        const reset = {
            NewPassword:this.state.NewPassword,
            ConfirmPassword:this.state.ConfirmPassword
        }
        axios.post('http://localhost:3001/resetpassword',reset)
        .then(res =>{
            console.log(res);
            console.log(res.data);
        })
        .catch(err => {
            console.log("caught error",err);
        })
    }

    render(){
        return(
            <div className="wrapper">
                <form className="form">
                    <h3>Reset Password</h3>

                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password" 
                        className="form-control" 
                        placeholder="Enter New password"
                        value={this.state.NewPassword}
                        onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" 
                        className="form-control" 
                        placeholder="Enter Confirm password"
                        value={this.state.ConfirmPassword}
                        onChange={this.handleChange} />
                    </div>

                    <button  className="button" onClick={this.handleSubmit}>Okay</button>
                </form>
            </div>
        );
    }
}
