import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import agent from './agent';
import Header from './components/Header';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from './constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Article from './components/Article';
import Editor from './components/Editor';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Settings from './components/Settings';
import { store } from './store';
import { push } from 'react-router-redux';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token)=>
    dispatch({type: APP_LOAD, payload, token, skipTracking:true}),
  onRedirect: () =>
    dispatch({type:REDIRECT})
});

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    // window.localStorage.setItem('jwt','');
    const token = window.localStorage.getItem('jwt');
    if(token){
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }
  render() {
    if(this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser}/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>      
              <Route path="/article/:nameslug" component={Article}/>
              <Route path="/article" component={Article}/>
              <Route path="/@:username" component={Profile}/>
              <Route path="/settings" component={Settings} />
              <Route path="/editor" component={Editor} />
            </Switch>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div> 
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
