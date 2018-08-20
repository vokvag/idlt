import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <ul>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Sign in
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Sign up
                    </Link>
                </li>
            </ul>
        );
    }
    return null;
};

const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <ul>
                <li className="nav-item">
                    <Link to="/editor" className="nav-link">
                        <i className="ion-compose"></i>&nbsp;New Post
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="" className="nav-link">
                        <i className="ion-gear-a"></i>&nbsp;Settings
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                        to={`/@${props.currentUser.username}`} 
                        className="nav-link">
                        <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username}/>
                        {props.currentUser.username}    
                    </Link>
                </li>
            </ul>
        );
    }
    return null;
};

class Header extends React.Component {
    render() {
        return(
            <header className="header">
                <Link to="/" className="navbar-brand">
                    {this.props.appName}
                </Link>
                <nav className="nav">                   
                    <LoggedOutView currentUser={this.props.currentUser}></LoggedOutView>
                    <LoggedInView currentUser={this.props.currentUser}></LoggedInView>
                </nav>
            </header>
        );
    }
}

export default Header;