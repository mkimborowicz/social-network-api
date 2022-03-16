const User = require("../models/User");

module.exports = {


  // find all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // find one user by user id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((userUpdate) =>
        !userUpdate
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(userUpdate)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // create user
  createUser(req, res) {
    User.create(req.body)
      .then((UserData) => res.json(UserData))
      .catch((err) => res.status(500).json(err));
  },

  // delete user
  deleteUser(req, res) {
    User.findOneAndRemove(
        { _id: req.params.userId }
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // add friend

  // remove friend
};
