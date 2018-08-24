import React from 'react';
import { connect } from 'react-redux';
import { 
    FIRST_PROGRAMMING_LANGUAGE_CHANGED,
    SECOND_PROGRAMMING_LANGUAGE_CHANGED
} from '../../constants/actionTypes';
import agent from '../../agent';


const mapDispatchToProps = dispatch => ({
    onFirstplChanged: (payload, firstpl)=>
      dispatch({type: FIRST_PROGRAMMING_LANGUAGE_CHANGED, payload, firstpl}),
    onSecondplChanged: (payload, secondpl) =>
      dispatch({type:SECOND_PROGRAMMING_LANGUAGE_CHANGED, payload, secondpl})
  });

const PlSelect = props => {
    if(!props.prolangs){
        return null;
    }
    let pl = props.prolangs
    const firstplChange = ev =>{
        props.onFirstplChanged(
            Promise.all([agent.Articles.plCategories(ev.target.value,props.secondpl),
            agent.Articles.plArticle(props.nameslug ? props.nameslug : "cat1",ev.target.value,props.secondpl)
        ]),ev.target.value);
    }
    const secondplChange = ev =>{
        props.onSecondplChanged(
            Promise.all([agent.Articles.plCategories(props.firstpl,ev.target.value),
            agent.Articles.plArticle(props.nameslug ? props.nameslug : "cat1",props.firstpl,ev.target.value)
        ]),ev.target.value);
    }
    return (
        <div>
            <label>
                Select PL:
                <select value={props.firstpl} onChange={firstplChange}>
                    {Object.keys(pl).map(ele=> {
                        return(
                            <option key={pl[ele].id} value={pl[ele].id}>
                                {pl[ele].name}
                            </option>
                        );                
                    })}
                </select>
                <select value={props.secondpl} onChange={secondplChange}>
                    <option key="0" value="0"></option>
                    {Object.keys(pl).map(ele=> {
                        return(
                            <option key={pl[ele].id} value={pl[ele].id}>
                                {pl[ele].name}
                            </option>
                        );                
                    })}
                </select>
            </label>
            
            </div>    
    );
}
export default connect(()=>({}), mapDispatchToProps)(PlSelect);