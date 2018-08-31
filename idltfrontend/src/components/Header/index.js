import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <ul className="navbar-nav ml-auto">
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
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link 
                        to={`/@${props.currentUser.username}`} 
                        className="nav-link">
                        <img src={props.currentUser.image} className="user-pic"/>
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
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand">
                        {this.props.appName}.xyz
                    </Link>            
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">       
                        <LoggedOutView currentUser={this.props.currentUser}></LoggedOutView>
                        <LoggedInView currentUser={this.props.currentUser}></LoggedInView>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;