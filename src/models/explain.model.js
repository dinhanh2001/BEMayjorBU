const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const explainSchema = mongoose.Schema(
  {
    org_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Organization',
      required: true,
      trim: true,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
      trim: true,
    },
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      require: true,
      trim: true,
      default: false,
    },
    reason_name: {
      type: String,
      require: true,
      trim: true,
    },
    decription: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    date_explain: {
      type: Number,
      require: true,
      trim: true,
    },
    id_place: {
      type: mongoose.Schema.ObjectId,
      ref: 'Place',
      require: true,
      trim: true,
    },
    place_name: {
      type: String,
      require: true,
      trim: true,
    },
    approval_name: {
      type: String,
      require: true,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      require: true,
      trim: true,
    },
    lat: {
      type: Number,
      required: true,
      trim: true,
    },
    long: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
explainSchema.plugin(toJSON);
explainSchema.plugin(paginate);

/**
 * @typedef Explain
 */
const Explain = mongoose.model('Explain', explainSchema);

module.exports = Explain;
