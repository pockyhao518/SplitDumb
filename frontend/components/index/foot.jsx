import React from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <h1>Core features</h1>
                <ul className="ul-feature">
                    <li className="li-feature"><img src={window.small_icon} alt="sicon" />Add/delete friends</li>
                    <li className="li-feature"><img src={window.small_icon} alt="sicon" />Add/delete notes</li>
                    <li className="li-feature"><img src={window.small_icon} alt="sicon" />Add/delete bill</li>
                    <li className="li-feature"><img src={window.small_icon} alt="sicon" />View all bills</li>
                    <li className="li-feature"><img src={window.small_icon} alt="sicon" />Split bill</li>
                    <li className="li-feature"><img src={window.small_icon} alt="sicon" />Calculator</li>
                </ul>
                <div className="footer-nav">
                    <div className="left-footer">
                        <div className="div-foot">
                            <p className="font-foot">Shatter</p>
                            
                        </div>
                        <div className="div-foot">
                            <p className="account-foot">Account</p>
                            <ul className='account-link'>
                                <li><Link to="/login">Log in</Link></li>
                                <li><Link to="/signup">Sign up</Link></li>
                            </ul>
                            
                        </div>
                        <div className="div-foot">
                            <p className="more-foot">More</p>
                    
                        </div>
                    </div>
                    <div className="right-footer">
                        <p>Made with :) in Harlem, NY, USA</p>
                    </div>
                </div>
            </div>
        )
    }
}