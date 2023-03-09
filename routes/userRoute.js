const express = require("express");
const routes = express.Router();
const {AddUser, GetCurrentUser} = require("../controllers/userContoller");

routes.get("/login", GetCurrentUser);
routes.post("/signup", AddUser);

module.exports = routes;