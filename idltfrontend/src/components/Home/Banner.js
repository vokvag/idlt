import React from 'react';


const DropDown = prolangs => {
    let pl = prolangs.prolangs   
    if(pl !== null && pl !== undefined){
    return (
        
        <select name="" id="">
            {Object.keys(pl).map(ele=> {
                return(
                    <option key={pl[ele].id}>
                        {pl[ele].name}
                    </option>
                );                
            })}
        </select>
        
    );
}
else{return null;}
}


const Banner = props => {

    return (
        <div className="banner">
            <div className="container">
                <h1 className="logo-font">
                    {props.appName.toLowerCase()}
                </h1>
                <p>Programming languages comparison & transition tool.</p>                
                <span>
                    Start from the first one:
                    <DropDown prolangs={props.prolangs}/>
                    <button>GO!</button>
                </span>
            </div>
        </div>
    );
}

export default Banner;