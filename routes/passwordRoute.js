const express = require("express");
const routes = express.Router();
const {ForgetPassword, UpdatePassword} = require("../controllers/passwordController");

routes.post("/forgot-password", ForgetPassword);
routes.post("/reset-password/:token", UpdatePassword);

module.exports = routes;