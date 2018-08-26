import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import marked from 'marked';
import { 
    ARTICLE_PAGE_LOADED, 
    ARTICLE_PAGE_UNLOADED,
    CATEGORY_CHANGED
} from '../../constants/actionTypes';

import Category from './Category';
import PlSelect from './PlSelect';
import ArticleView from './ArticleView';
import './Article.css';

const mapStateToProps = state => ({
    ...state.article,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, firstpl, secondpl) =>
        dispatch({ type: ARTICLE_PAGE_LOADED, payload, firstpl, secondpl }),
    onUnload: () =>
        dispatch({ type: ARTICLE_PAGE_UNLOADED }),
    onCategoryChanged: (payload)=>
        dispatch({type: CATEGORY_CHANGED, payload})
});


class Article extends React.Component {
    componentWillReceiveProps(nextprops){
        if(this.props.match.params.nameslug!==nextprops.match.params.nameslug){
            if(nextprops.match.params.nameslug){
                this.props.onCategoryChanged(
                    agent.Articles.plArticle(nextprops.match.params.nameslug,this.props.firstpl,this.props.secondpl)
                )
            }
        }
    }

    componentWillMount(){
        let firstpl = window.localStorage.getItem('firstpl');
        if(!firstpl){
            firstpl = '1';
            window.localStorage.setItem('firstpl', '1');
        }
        let secondpl = window.localStorage.getItem('secondpl');
        if(!secondpl){
            secondpl = '0';
            window.localStorage.setItem('secondpl', '0');
        }
        const nameslug = this.props.match.params.nameslug;
        this.props.onLoad(
            Promise.all([agent.Prolang.get(),
                agent.Articles.plCategories(firstpl,secondpl),
                agent.Articles.plArticle(nameslug ? nameslug : "cat1",firstpl,secondpl)
            ]),
            firstpl, secondpl
        );
    }

    componentWillUnmount(){
        this.props.onUnload();
    }


    render(){
        if(!this.props.prolangs){
            return null;
        }
        if(!this.props.categories){
            return null;
        }
        return(
            <div className="page-body">
                <div className="nav-side-menu col-2">
                    <PlSelect 
                        prolangs={this.props.prolangs}
                        firstpl={this.props.firstpl}
                        secondpl={this.props.secondpl}
                        nameslug={this.props.match.params.nameslug}/>
                
                    <Category 
                        categories={this.props.categories} 
                        firstpl={this.props.firstpl}
                        secondpl={this.props.secondpl}
                        nameslug={this.props.match.params.nameslug}/>
                </div>
                <div className="article-view col-10 offset-2">
                    <ArticleView
                        firstpl={this.props.firstpl}
                        secondpl={this.props.secondpl}
                        nameslug={this.props.match.params.nameslug}
                        articles={this.props.articles}/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);