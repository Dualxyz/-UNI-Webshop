import axios from "axios";

const getArticles = async (sellerId) => {
  const queryParameters = sellerId ? `?sellerId=${sellerId}` : "";

  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/articles${queryParameters}`
  );

  return res.data;
};

const addArticle = async (accessToken, articleDto) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/articles`,
    articleDto,
    config
  );

  return res.data;
};

const deleteArticle = async (accessToken, articleId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/articles/${articleId}`,
    config
  );

  return res.data;
};

const editArticle = async (accessToken, articleId, articleDto) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}/api/articles/${articleId}`,
    articleDto,
    config
  );

  return res.data;
};

const articlesService = {
  getArticles,
  addArticle,
  deleteArticle,
  editArticle,
};

export default articlesService;
