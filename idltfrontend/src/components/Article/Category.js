import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
    CATEGORY_CHANGED,
} from '../../constants/actionTypes';
import agent from '../../agent';

const mapDispatchToProps = dispatch => ({
    onCategoryChanged: (payload)=>
      dispatch({type: CATEGORY_CHANGED, payload})
  });

const Category = props => {
    if(!props.categories){
        return null;
    }
    let sub = props.categories.subcategories
    if(Object.keys(sub).length===0){
        return null;
    }
    // const handleClick = () =>{
    //     props.onCategoryChanged(agent.Articles.plArticle(props.nameslug,props.firstpl,props.secondpl))
    // }
    return (
        <ul>
            {Object.keys(sub).map(ele =>{
                return (
                    <li key={sub[ele].id}>
                    {/* <Link onClick={handleClick} to={`/article/${sub[ele].nameslug}`}>{sub[ele].name}</Link> */}
                    <a href={sub[ele].nameslug}>{sub[ele].name}</a>
                    <Category 
                        categories={sub[ele]}
                        firstpl={props.firstpl}
                        secondpl={props.secondpl}
                        nameslug={props.nameslug}/>
                    </li>
                );
            })}
        </ul>
    );
}

export default connect(()=>({}), mapDispatchToProps)(Category);