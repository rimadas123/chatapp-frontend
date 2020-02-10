import React from 'react';
import './css/dashboard.css';

export default class DashBoard extends React.Component{
    render(){
        return(
            <div>
                <nav className="topNav">
                    <a href="#">ChatApp</a>
                </nav>

                <div className="row">
                    <div className="leftcolumn">
                        <div className="card">
                            <h3>Users List</h3>
                        </div>
                    </div>
                    <div className="middle">
                        <div className="card">
                            <h3>Chat</h3>
                            <form>
                                <input type="text" placeholder="type your message here" />
                                <button type="submit">send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
