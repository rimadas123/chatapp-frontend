import React from "react";
import './css/form.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitDisabled: true,
            fields: { FirstName: '',LastName: '', Email: '', Password: ''},
            errors: { FirstName: '',LastName: '', Email: '', Password: ''}
        }
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //First name validation
        if(!fields["FirstName"]) {
            formIsValid = false;
            errors["FirstName"] = "Cannot be Empty";
        }

        if(typeof fields["FirstName"] !== "undefined") {
            if(!fields["FirstName"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["FirstName"] = "Only letters";
            }
        }

        //Last name validation
        if(!fields["LastName"]) {
            formIsValid = false;
            errors["LastName"] = "Cannot be Empty";
        }

        if(typeof fields["LastName"] !== "undefined") {
            if(!fields["LastName"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["LastName"] = "Only letters";
            }
        }

        //Email validation
        if(!fields["Email"]) {
            formIsValid = false;
            errors["Email"] = "Cannot be empty";
        }

        if(typeof fields["Email"] !== "undefined") {
            let lastAtPos = fields["Email"].indexOf("@");
            let lastDotPos = fields["Email"].indexOf(".");

            if(!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["Email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["Email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["Email"] = "Email is not valid";
            }
        }

        //Password validation
        if(!fields["Password"]){
            formIsValid = false;
            errors["Password"] = "Cannot be empty";
        }

        this.setState({errors: errors})
        return formIsValid;

    }

    // handleChangePassword = event => {
    //     let PasswordValid = event.target.value ? true : false;
    //     let submitValid = this.state.PasswordValid
    //     this.setState({
    //         Password: event.target.value,
    //         PasswordValid:PasswordValid,
    //         submitDisabled: !submitValid
    //     });  
    // }

    handleSubmit(){
        
        if(!this.handleValidation){
            alert("Form has errors")
        } else {
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
                this.setState({FirstName:'',LastName:'',Email:'',Password:''})
            })
            .catch(err =>{
                console.log("error caught",err);
            })
        }
    }

    handleChange(field, event) {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({fields});
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
                     value={this.state.fields["FirstName"]} 
                     onChange={this.handleChange.bind(this,"FirstName")} />
                     <span style={{color: "red"}}>{this.state.errors["FirstName"]}</span>
                </div>

                <div className="form-group">
                    <label>Last Name</label>

                    <input type="text" 
                    className="form-control" 
                    placeholder="Last Name" 
                    name="lastname" 
                    value={this.state.fields["LastName"]} 
                    onChange={this.handleChange.bind(this,"LastName")}/>
                    <span style={{color: "red"}}>{this.state.errors["LastName"]}</span>
                </div>

                <div className="form-group">
                    <label>Email Address</label>

                    <input type="email" 
                    className="form-control" 
                    placeholder="Email Address" 
                    name="email" 
                    value={this.state.fields["Email"]} 
                    onChange={this.handleChange.bind(this,"Email")}/>
                    <span style={{color: "red"}}>{this.state.errors["Email"]}</span>
                </div>

                <div className="form-group">
                    <label>Password</label>

                    <input type="password" 
                    className="form-control" 
                    placeholder="Password" 
                    name="password" 
                    value={this.state.fields["Password"]} 
                    onChange={this.handleChange.bind(this,"Password")}/>
                    <span style={{color: "red"}}>{this.state.errors["Password"]}</span>
                </div>

                <button type="submit" className="button" onClick={this.handleSubmit.bind(this)}>Sign Up</button>
                <p className="forgot-password text-right">     
                Already registered ? <Link className="nav-link" to ={"/sign-in"}> Sign In</Link>
                </p>
            </form>    
        );
    }
}

