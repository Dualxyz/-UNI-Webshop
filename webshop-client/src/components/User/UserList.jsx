import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
// import ArticleItem from "./ArticleItem";
import "../../style/Utils.css";
import UserItem from "./UserItem";

const UserList = ({ users, canVerify, handleSetVerify }) => {
  return (
    <>
      {users && users.length > 0 ? (
        <Card>
          <ListGroup variant="flush">
            {users.map((user) => (
              <ListGroup.Item key={user.id}>
                <UserItem
                  userData={user}
                  canVerify={canVerify}
                  handleSetVerify={handleSetVerify}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      ) : (
        <p className="info-message">No sellers</p>
      )}
    </>
  );
};

export default UserList;
