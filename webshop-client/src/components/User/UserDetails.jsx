import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "../../style/Details.css";
import { UserRole, roleIdToName } from "../../models/userRole";
import { statusIdToName } from "../../models/verificationStatus";
import moment from "moment";

const UserDetails = ({ userData }) => {
  return (
    <Card className="details">
      <ListGroup variant="flush">
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Username</div>
          <div className="details-item-value">{userData.username}</div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Email</div>
          <div className="details-item-value">{userData.email}</div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">First Name</div>
          <div className="details-item-value">{userData.firstName}</div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Last Name</div>
          <div className="details-item-value">{userData.lastName}</div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Birthdate</div>
          <div className="details-item-value">
            {moment(userData.birthdate).format("LL")}
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Address</div>
          <div className="details-item-value">{userData.address}</div>
        </ListGroup.Item>
        <ListGroup.Item className="details-item">
          <div className="details-item-title">Role</div>
          <div className="details-item-value">
            {roleIdToName(userData.role)}
          </div>
        </ListGroup.Item>
        {userData.role === UserRole.Seller ? (
          <ListGroup.Item className="details-item">
            <div className="details-item-title">Verification Status</div>
            <div className="details-item-value">
              {statusIdToName(userData.verificationStatus)}
            </div>
          </ListGroup.Item>
        ) : null}
      </ListGroup>
    </Card>
  );
};

export default UserDetails;
