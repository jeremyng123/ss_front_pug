const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
      "Cache-control, no-cache, no-store"
    );
    next();
  });

  /* GET home page. */
  app.get("/wcdfix/:anything", async function (req, res, next) {
    const user = await axios
      // .post("http://localhost:5000/getUser", {
      .get("https://ss-backend-2021.herokuapp.com/getUser", {
        headers: auth.authHeader(localStorage),
      })
      .then((response) => {
        console.log("got token: " + response.data);
        return response.data;
      })
      .catch((err) => {
        console.log("error in axios /users/: " + err);
        return err;
      });
    res.render("users", { user: user });
  });
};
