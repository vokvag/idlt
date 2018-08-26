import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../LogoBiggrey.png';

const Banner = props => {

    return (
        <section className="banner">
            <div className="inner col-sm-10">
                <img className="logo-big" src={logo} alt={props.appName.toLowerCase()}/>
                <p className="banner-description">An awesome documentation
                <br/> Used to compare different programming languages 
                <br/>and help your knowledge transfer.</p>              
                <Link to={`/article`}>Start!</Link>
            </div>
            <div className="banner-footer">
                <a href="" className="more scrolly">Learn More</a>
            </div>
        </section>
    );
}

export default Banner;