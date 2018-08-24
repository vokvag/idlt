import React from 'react';
import { connect } from 'react-redux';
import { 
    FIRST_PROGRAMMING_LANGUAGE_CHANGED,
    SECOND_PROGRAMMING_LANGUAGE_CHANGED
} from '../../constants/actionTypes';
import agent from '../../agent';

const ArticleView = props => {
    if(!props.articles){
        return null;
    }
    return (
        <div>
            {Object.keys(props.articles.pl).map(ele =>{
                return(
                    <div key={ele}>
                        <h4>{props.articles.pl[ele].article.title}</h4>
                        <h5>{props.articles.pl[ele].plname}</h5>
                        <p>{props.articles.pl[ele].article.body}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default ArticleView;