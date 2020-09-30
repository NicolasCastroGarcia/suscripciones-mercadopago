const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const SubscriptionController = require("./controllers/SubscriptionController");
//importamos el controller

const SubscriptionService = require("./services/SubscriptionService");

const SubscriptionInstance = new SubscriptionController(
  new SubscriptionService()
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/subscription/new", (req, res) =>
  SubscriptionInstance.getMercadoPagoSubscriptionLink(req, res)
);

module.exports = app;
