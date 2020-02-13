import React from "react";
import './css/form.css';
import userservice from '../service/axiosservice';

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            NewPassword:'',
            ConfirmPassword:'',
        }
    }

    handleChange = event => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }
 
    handleSubmit = event => {
        event.preventDefault();
        
        const reset = {
            NewPassword:this.state.NewPassword,
            ConfirmPassword:this.state.ConfirmPassword
        }
       
        userservice.resetpasswordservice(reset)
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
                        name="NewPassword"
                        placeholder="Enter New password"
                        onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" 
                        className="form-control" 
                        name="ConfirmPassword"
                        placeholder="Enter Confirm password"
                        onChange={this.handleChange} />
                    </div>

                    <button  className="button" onClick={this.handleSubmit}>Okay</button>
                </form>
            </div>
        );
    }
}
