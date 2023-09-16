import React, { useEffect, useState } from "react";
import ArticleList from "../Articles/ArticleList";
import ArticleForm from "../Articles/ArticleForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addArticle,
  deleteArticle,
  editArticle,
  resetState,
} from "../../features/articles/articlesSlice";
import { articleRequestDto } from "../../models/articleDto";
import { notifySuccess, notifyError } from "../../utils/notify";
import ArticleModal from "../Articles/ArticleModal";
import OrderList from "../Orders/OrderList";
import { getDeliveryTime } from "../../utils/orderUtils";
import {
  VerificationStatus,
  statusIdToName,
} from "../../models/verificationStatus";

const SellerDashboard = ({ children }) => {
  const dispatch = useDispatch();

  const [edittingArticle, setEdittingArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  const { articles, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.articles
  );

  const previousOrders = orders.filter((order) =>
    getDeliveryTime(order).isBefore()
  );
  const newOrders = orders.filter((order) =>
    getDeliveryTime(order).isSameOrAfter()
  );

  useEffect(() => {
    if (isError && message) {
      notifyError(message);
    }

    if (isSuccess && message) {
      notifySuccess(message);
    }

    dispatch(resetState());
  }, [
    isSuccess,
    isLoading,
    isError,
    message,
    articles,
    edittingArticle,
    dispatch,
  ]);

  const handleCreate = (data) => {
    const dto = articleRequestDto(data);
    dispatch(addArticle(dto));
  };

  const handleDelete = (id) => {
    dispatch(deleteArticle(id));
  };

  const handleSetEdit = (articleData) => {
    setEdittingArticle(articleData);
    setShowModal(true);
  };

  const handleCancelEdit = () => {
    setEdittingArticle(null);
    setShowModal(false);
  };

  const handleConfirmEdit = (articleData) => {
    const data = {
      articleId: edittingArticle.id,
      articleData: articleRequestDto(articleData),
    };

    dispatch(editArticle(data));

    setEdittingArticle(null);
    setShowModal(false);
  };

  return (
    <div>
      <h1>Seller Dashboard</h1>
      <hr />
      {children}
      <hr />
      <div>
        <h3>My Articles</h3>
        <ArticleList
          articles={articles}
          canDelete={true}
          handleDelete={handleDelete}
          canEdit={true}
          handleSetEdit={handleSetEdit}
        />
      </div>
      <hr />
      <div>
        <h3>Add Article</h3>
        {userInfo.verificationStatus === VerificationStatus.Accepted ? (
          <ArticleForm handleSubmit={handleCreate} />
        ) : (
          <p className="info-message">
            Only accepted sellers can add new articles. Your current status:{" "}
            {statusIdToName(userInfo.verificationStatus)}.
          </p>
        )}
      </div>
      <hr />
      <div>
        <h3>New Orders</h3>
        <OrderList orders={newOrders} />
      </div>
      <hr />
      <div>
        <h3>Previous Orders</h3>
        <OrderList orders={previousOrders} />
      </div>
      <ArticleModal
        isVisible={showModal}
        data={edittingArticle}
        handleClose={handleCancelEdit}
        handleConfirm={handleConfirmEdit}
      />
    </div>
  );
};

export default SellerDashboard;
