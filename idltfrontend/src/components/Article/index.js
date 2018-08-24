//import ArticleMeta from './ArticleMeta';
//import CommentContainer from './CommentContainer';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import marked from 'marked';
import { 
    ARTICLE_PAGE_LOADED, 
    ARTICLE_PAGE_UNLOADED
} from '../../constants/actionTypes';

import Category from './Category';
import PlSelect from './PlSelect';
import ArticleView from './ArticleView';

const mapStateToProps = state => ({
    ...state.article,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, firstpl, secondpl) =>
        dispatch({ type: ARTICLE_PAGE_LOADED, payload, firstpl, secondpl }),
    onUnload: () =>
        dispatch({ type: ARTICLE_PAGE_UNLOADED }),
});


class Article extends React.Component {
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
        // if (!this.props.article) {
        //     return null;
        // }

        // const markup = { __html: marked(this.props.article.body, { sanitize: true })};
        // const canModify = this.props.currentUser &&
        //     this.props.currentUser.username === this.props.article.author.username;
        // return (
        //     <div className="article-page">
        //         <div className="banner">
        //             <div className="container">
        //                 <h1>{this.props.article.title}</h1>
        //                 <ArticleMeta
        //                     article={this.props.article}
        //                     canModify={canModify} />
        //             </div>
        //         </div>
        //         <div className="container page">
        //             <div className="row article-content">
        //                 <div className="col-xs-12">
        //                     <div dangerouslySetInnerHTML={markup}></div>
        //                     <ul className="tag-list">
        //                         {this.props.article.tagList.map(tag => {
        //                             return (
        //                                 <li className="tag-default tag-pill tag-outline"
        //                                     key={tag}>
        //                                     {tag}    
        //                                 </li>
        //                             );
        //                         })}
        //                     </ul>
        //                 </div>
        //             </div>
        //             <hr/>
        //             <div className="article-actions"></div>
        //             <div className="row">
        //                 <CommentContainer
        //                     comments={this.props.comments || []}
        //                     errors={this.props.commentErrors}
        //                     slug={this.props.match.params.id}
        //                     currentUser={this.props.currentUser} />
        //             </div>
        //         </div>
        //     </div>
        // );
        return(
            <div>
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
                <ArticleView
                    firstpl={this.props.firstpl}
                    secondpl={this.props.secondpl}
                    nameslug={this.props.match.params.nameslug}
                    articles={this.props.articles}/>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);