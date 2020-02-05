import React from "react";

export default class Login extends React.Component {
    render() {
        return (
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    
                </div>

                <button type="submit" className="button">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>

        );
    }
}
