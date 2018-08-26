import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { 
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED
} from '../../constants/actionTypes';
import './Home.css';
const Promise = global.Promise;

const mapStateToProps = state => ({
    ...state.home,
    appName: state.common.appName,
    token: state.common.token,
});

const mapDispatchToProps = dispatch => ({
    onLoad: (payload) =>
        dispatch({ type: HOME_PAGE_LOADED, payload}),
    onUnload: () =>
        dispatch({ type: HOME_PAGE_UNLOADED})
});

class Home extends React.Component {
    componentWillMount() {
        this.props.onLoad(null)
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        return (
            <div className="home-page">
                <Banner appName={this.props.appName}/>
                <div className="container page">
                    <div className="row">
                        <MainView />
                        <div className="col-md-3">
                            <div className="sidebar">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);