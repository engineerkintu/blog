import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';
import Loader from './Loader';
import React, { useState } from 'react';



const ArticleList = props => {

  if (!props.articles) {
    return (

      <div className="article-preview"><Loader /></div>
    );
  }

  if (props.articles.length === 0) {

    return (
      <div className="article-preview">

        No articles are here... yet.
      </div>
    );
  }

  return (
    <div>

      {

        props.articles.map(article => {
          return (

            <ArticlePreview article={article} key={article.slug} />
          );
        })
      }

      <ListPagination
        pager={props.pager}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default ArticleList;
