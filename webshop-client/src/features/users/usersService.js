import axios from "axios";

const getUsers = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);

  return res.data;
};

const verifyUser = async (accessToken, userId, verificationDto) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/users/verify/${userId}`,
    verificationDto,
    config
  );

  return res.data;
};

const usersService = {
  getUsers,
  verifyUser,
};

export default usersService;
