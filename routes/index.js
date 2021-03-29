var express = require("express");
const axios = require("axios");
var router = express.Router();
var auth = require("../controller/authenticate/auth");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
/* GET home page. */
router.get("/", async function (req, res, next) {
  if (localStorage.getItem("user")) {
    const user = await axios
      // .post("http://localhost:5000/getUser", {
      .get("https://ss-backend-2021.herokuapp.com/getUser", {
        headers: auth.authHeader(localStorage),
      })
      .then((response) => {
        // console.log("got token: " + response.data);
        return response.data;
      })
      .catch((err) => {
        console.log("error in users axios /users/: " + err);
        return err;
      });
    res.render("users", { user: user, error: false });
  } else res.render("index", { error: false });
});

module.exports = router;
