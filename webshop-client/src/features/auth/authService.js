import axios from "axios";

const registerUser = async (registerDto) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/users`,
    registerDto
  );

  return res.data;
};

const loginUser = async (loginDto) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/users/login`,
    loginDto
  );

  return res.data;
};

const getUserInfo = async (accessToken, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/users/${userId}`,
    config
  );

  return res.data;
};

const editProfile = async (accessToken, userId, userDto) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}/api/users/${userId}`,
    userDto,
    config
  );

  return res.data;
};

const authService = {
  registerUser,
  loginUser,
  getUserInfo,
  editProfile,
};

export default authService;
