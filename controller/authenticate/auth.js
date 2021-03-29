const axios = require("axios");

const login = async function (user, password) {
  console.log(user, password);
  const data = await axios
    // .post("http://localhost:5000/login", {
    .post("https://ss-backend-2021.herokuapp.com/login", {
      username: user,
      password: password,
    })
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  return data;
};

const authHeader = function (localStorage) {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  if (user) {
    // console.log({ Authorization: "Bearer " + user.accessToken });
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
};

const auth = {
  login,
  authHeader,
};

module.exports = auth;
