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

    handleNewPassword = event => {
        this.setState({ NewPassword: event.target.value})
    }

    handleConfirmPassword = event => {
        this.setState({ConfirmPassword: event.target.value})
    }
 
    handleSubmit = event => {
        event.preventDefault();
        
        const { NewPassword, ConfirmPassword } = this.state;
        if(NewPassword !== ConfirmPassword) {
            alert("Password does not match");
        } else {

            axios.post('http://localhost:3001/resetpassword',ConfirmPassword)
            .then(res =>{
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log("caught error",err);
            })
        }
    }

    render(){
        return(
            <div className="wrapper">
                <form>
                    <h3>Reset Password</h3>

                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password" 
                        className="form-control" 
                        placeholder="Enter New password"
                        value={this.state.NewPassword}
                        onChange={this.handleNewPassword} />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" 
                        className="form-control" 
                        placeholder="Enter Confirm password"
                        value={this.state.ConfirmPassword}
                        onChange={this.handleConfirmPassword} />
                    </div>

                    <button  className="button" onClick={this.handleSubmit}>Okay</button>
                </form>
            </div>
        );
    }
}
