var express = require("express");
const axios = require("axios");
var router = express.Router();
var auth = require("../controller/authenticate/auth");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  if (localStorage.getItem("user")) {
    console.log({ user: JSON.parse(localStorage.getItem("user")) });
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
  } else {
    res.send("Not logged in");
  }
});

/* GET logout */
router.get("/logout", function (req, res, next) {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
    res.redirect("/");
  } else {
    res.send("hey, you aren't even logged in, how do you want to logout?");
  }
});

/* POST Login */
router.post("/login", async function (req, res, next) {
  const loginResult = await auth.login(req.body.username, req.body.password);
  if (loginResult != null) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        accessToken: loginResult.accessToken,
      })
    );
    console.log(JSON.parse(localStorage.getItem("user")));
    res.redirect("/users");
  } else {
    res.render("index", { error: true });
  }
});

module.exports = router;
