import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ArticleItem from "./ArticleItem";
import "../../style/Utils.css";

const ArticleList = ({
  articles,
  canDelete,
  handleDelete,
  canEdit,
  handleSetEdit,
}) => {
  return (
    <>
      {articles && articles.length > 0 ? (
        <Card>
          <ListGroup variant="flush">
            {articles.map((article) => (
              <ListGroup.Item key={article.id}>
                <ArticleItem
                  articleData={article}
                  canDelete={canDelete}
                  handleDelete={handleDelete}
                  canEdit={canEdit}
                  handleSetEdit={handleSetEdit}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      ) : (
        <p className="info-message">No available articles</p>
      )}
    </>
  );
};

export default ArticleList;
