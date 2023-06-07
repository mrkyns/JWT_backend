const mongooose = require("mongoose");

const postSchema = new mongooose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongooose.model("Post", postSchema);
