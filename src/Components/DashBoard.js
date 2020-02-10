import React from 'react';
import './css/dashboard.css';

export default class DashBoard extends React.Component{
    render() {
        return(
            <div className="dashboard">
                <nav>

                </nav>
                <div className="leftrow">                   
                        hello
                </div>
                <div className="middlerow">
                     <form>
                         <input type="text" name = "message" placeholder="type your message here" />
                         <button type="submit">send</button>
                     </form>
                </div>
            </div>
        );
    }
}