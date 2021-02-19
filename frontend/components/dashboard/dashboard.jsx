import React from 'react';
import { Link } from 'react-router-dom';
import CenterDashboard from './centerDashboard/center_dashboard';
import BillIndexItem from './bill_index_item';
import FriendIndexItem from './friend_index_item';
import SplitIndexItem from './split_index_item';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            obj:{}
        }
        this.whenFocusOrBlur = this.whenFocusOrBlur.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    whenFocusOrBlur(e) {
        const newState = !this.state.show
        this.setState({ show: newState })
    }
    componentDidMount() {
        this.props.fetchAllBills(this.props.currentUser.id);
        this.props.fetchAllFriends();
        this.props.fetchAllSplits();
    }

    handleDelete(id) {
        return e => {
            this.props.deleteBill(id);
        }
    }

    handleClick(modal) {
        let that = this;
        return e => {
            e.preventDefault();
            const authorId = that.props.currentUser.id ? that.props.currentUser.id : null
            this.props.openModal({ modal: modal, authorId: authorId })
        }
    }
    render() {
        const logStatus = this.props.currentUser ? (
            <div>
                <div className="dropdown">
                    <button onFocus={this.whenFocusOrBlur} onBlur={this.whenFocusOrBlur}>{this.props.currentUser.username}▼ {this.state.show ? <a className="header-button" onClick={this.props.logout}>Log Out</a> : null}</button>
                </div>
            </div>) :
            (<div>
                <Link className="login" to="/login">Log in</Link>
                <Link className="signup" to="/signup">Sign up</Link>
            </div>
            );
        
        if (this.props.splits.length > 0) {
            
            let that = this;
            this.props.splits.forEach(el => {
                
                if (el.payer_id !== that.props.currentUser.id) {
                    
                    if (that.state.obj[el.payer_id]){
                        that.state.obj[el.payer_id] += el.amount;
                    }else{
                        that.state.obj[el.payer_id] = el.amount
                    }
                    
                }
                
            })
        }
        
        return (
            
            <div className="dashboard">
                <div className="session-form">
                <div className="login-signup">
                    <div>
                        <img src={window.icon} alt="icon" />
                        <Link to='/'>
                            <h1>Shatter</h1>
                        </Link>
                    </div>
                    <div>
                        {logStatus}
                    </div>
                </div>
                </div>
                <div className='dash-main'>
                    <div className='left-side-bar'>
                        <Link to='/dashboard'>Dashboard</Link>
                        <br/>
                        <Link to='/history'>History</Link>
                        <br/>
                        <div>Friends<a onClick={this.handleClick('add-friend')}>+</a></div>
                        
                        <br/>
                        {this.props.friends.map(friend=>
                            <FriendIndexItem key={friend.id} friend={friend} deleteFriend={this.props.deleteFriend}/>)}
                    </div>
                    <div className='center-col'>
                        
                        
                        <CenterDashboard openModal={this.props.openModal} currentUser={this.props.currentUser} splits={this.props.splits} friends={this.props.friends}  header={'Dashboard'}/>
                        {Object.keys(this.state.obj).map(split =>
                            <SplitIndexItem  id = {split} amount={this.state.obj[split]} />
                        )}
                    </div>
                    <div className='right-side-bar'>
                        About me
                    </div>
                </div>
            </div>
        )
    }
}
