const { Thought, Reaction, User } = require('../models');

module.exports = {

    // find all thoughts
    getThoughts(req, res) {
        Thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
      },

    // find one thought by thought id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought with that ID" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
        .then((thoughtUpdate) =>
            !thoughtUpdate
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thoughtUpdate)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    // create thought
    createThought(req, res) {
        Thought.create(req.body)
          .then((ThoughtData) => {
            return User.findOneAndUpdate(
              {_id: req.body.userId},
              { $push: {
                thoughts: ThoughtData._id
              }},
              {new: true}
            )
          })
          .then(userData=> res.json({message: "your thought has been created"}))
          .catch((err) => res.status(500).json(err));
      },

    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndRemove(
            { _id: req.params.thoughtId }
            )
            .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought with that ID" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },


    // create reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          )
          .then((thoughtUpdate) =>
              !thoughtUpdate
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thoughtUpdate)
            )
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },

    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId } },
            { runValidators: true, new: true }
          )
          .then((thoughtUpdate) =>
              !thoughtUpdate
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thoughtUpdate)
            )
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    }

}