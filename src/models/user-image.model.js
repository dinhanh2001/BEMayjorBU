const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const imageSchema = mongoose.Schema(
  {
    data: {
      type: Buffer,
      required: false,
    },
    contentType: {
      type: String,
      require: false,
    },
    idOfUser: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
imageSchema.plugin(toJSON);
imageSchema.plugin(paginate);

/**
 * @typedef Shift
 */
const ImageUser = mongoose.model('UserImage', imageSchema);

module.exports = ImageUser;
