import React from "react";
import "../../style/Article.css";
import { Trash, PencilSquare } from "react-bootstrap-icons";

const ArticleItem = ({
  articleData,
  canDelete,
  handleDelete,
  canEdit,
  handleSetEdit,
}) => {
  return (
    <div className="article">
      <div className="article-photo">
        <img
          src={
            articleData.photo ||
            `${process.env.REACT_APP_PLACEHOLDER_API}/400x400?text=No+Image`
          }
          alt="article"
        />
      </div>

      <div className="article-details">
        <h5 className="article-title">{articleData.name}</h5>
        <div className="article-description">{articleData.description}</div>
      </div>

      <div className="article-info">
        <div className="article-options">
          {canDelete ? (
            <Trash
              className="article-delete"
              onClick={(e) => handleDelete(articleData.id)}
            />
          ) : null}
          {canEdit ? (
            <PencilSquare
              className="article-edit"
              onClick={(e) => handleSetEdit(articleData)}
            />
          ) : null}
        </div>
        <div className="article-quantity">Quantity: {articleData.quantity}</div>
        <div className="article-price">Price: {articleData.price}</div>
        <div className="article-id">ID: {articleData.id}</div>
      </div>
    </div>
  );
};

export default ArticleItem;
