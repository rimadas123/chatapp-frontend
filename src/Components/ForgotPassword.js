import React from "react";
import './css/form.css';
import userservice from '../service/axiosservice';

export default class ForgotPassword extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            Email: ''
        }
    }

    handleChangeEmail = event =>{
        let EmailValid = event.target.value ? true : false;
        let submitValid = this.state.EmailValid
        this.setState({ 
            Email: event.target.value,
            EmailValid: EmailValid,
            submitDisabled: !submitValid
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        
        const user = {
            Email:this.state.Email
        }

        userservice.forgotpasswordservice(user)
        .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({
                Email:''
            })
        })
        .catch(err =>{
            console.log("error caught",err);
        })
    }

    render() {
        return(
            <div className="wrapper">
                <form className="form">
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

                    <button  className="button" onClick={this.handleSubmit}>Okay</button>
                </form>
            </div>     
        );
    }
}
