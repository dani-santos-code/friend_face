"use strict";

const express = require("express");
const { users } = require("./data/users");
const morgan = require("morgan");
const PORT = process.env.PORT || 8000;

let currentUser = null;
const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

const handleHome = (req, res) => {
  res.render("pages/signin", {
    title: "",
    avatar: undefined
  });
};

const handleSignIn = (req, res) => {
  res.render("pages/signin", {
    title: "",
    avatar: ""
  });
};

const handleName = (req, res) => {
  const firstName = req.query.firstName;
  currentUser = users.find(user => user.name === firstName);
  // another option here is to use users.filter.
  // Find either returns an object or undefined, which is a falsy value
  // But filter, returns an empty array if ut doesn't find anything
  // So one would have to check for currentUser.length !== 0
  const friends = currentUser.friends.map(friendId => {
    return users.find(user => user.id === friendId);
  });

  if (currentUser) {
    res.render("pages/dashboard", {
      title: `${currentUser.name}`,
      avatar: currentUser.avatarUrl,
      friends
    });
  } else {
    res.redirect("/signin");
  }
  // res.redirect(`${currentUser ? "/" : "/signin"}`);
};
const handleUser = (req, res) => {
  const userId = req.params.id;
  const isUserOnDB = users.find(user => user.id === userId);
  if (isUserOnDB && currentUser) {
    res.render("pages/userPage", {
      title: "Test"
    });
  } else if (isUserOnDB && !currentUser) {
    res.redirect("/signin");
  } else if (!isUserOnDB && currentUser) {
    res.redirect("/fourOhfour");
  } else {
    res.redirect("/signin");
  }
};

const handleFourOhFour = (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl
  });
};

app.get("/", handleHome);
app.get("/signin", handleSignIn);
app.get("/user/:id", handleUser);
app.get("/getname", handleName);
app.get("*", handleFourOhFour);

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT} check http://www.localhost:${PORT}`)
);
