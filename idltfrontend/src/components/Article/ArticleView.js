import React from 'react';

const ArticleSubView = props => {
    const right = "right order-2"
    const left ="left order-1"
    if(!props.articles){
        return null;
    }
    return (
            <section className="row d-flex">
                {Object.keys(props.articles.pl).map(ele =>{
                    if(!props.articles.pl[ele].article){
                        return null;
                    }
                    return (
                        <div className={`${props.articles.pl[ele].prolang.toString()===props.firstpl ? left : right} col-md-6`} key={ele}>
                            <h4>{props.articles.pl[ele].article.title}</h4>
                            <h5>{props.articles.pl[ele].plname}</h5>
                            <p>{props.articles.pl[ele].article.body}</p>
                        </div>
                    );
                })}
            </section>
    )
}


const ArticleView = props => {
    const right = "right order-2"
    const left ="left order-1"
    if(!props.articles){
        return null;
    }
    return (
        <div>
            <section className="row d-flex">
                {Object.keys(props.articles.pl).map(ele =>{
                    if(!props.articles.pl[ele].article){
                        return null;
                    }
                    return (
                        <div className={`${props.articles.pl[ele].prolang===props.firstpl ? left : right} col-md-6`} key={ele}>
                            <h4>{props.articles.pl[ele].article.title}</h4>
                            <h5>{props.articles.pl[ele].plname}</h5>
                            <p>{props.articles.pl[ele].article.body}</p>
                        </div>
                    );
                })}
            </section>
                {Object.keys(props.articles.subcategories).map(ele =>{
                    if(!props.articles.subcategories[ele]){
                        return null;
                    }
                    return (
                        <ArticleSubView 
                            articles = {props.articles.subcategories[ele]}
                            firstpl = {props.firstpl}
                            secondpl = {props.secondpl}
                            key={ele}/>
                    )
                })}
            
        </div>
    );
}


export default ArticleView;