const httpStatus = require('http-status');
const { Explain } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a division
 * @param {Object}
 * @returns {Promise<Division>}
 */
const createExplain = async (ExplainBody) => {
  const explain = await Explain.create(ExplainBody);
  return explain;
};

/**
 * Query for Explains
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryExplains = async (filter, options) => {
  let filtersCondition = {
    ['org_id']: filter.org_id,
  };
  if (filter.user_id) {
    Object.assign(filtersCondition, { ['user_id']: filter.user_id });
  }
  console.log(filtersCondition, options);
  const explains = await Explain.paginate(filtersCondition, options);
  return explains;
};

/**
 * Get Explain by id
 * @param {ObjectId} id
 * @returns {Promise<Explain>}
 */
const getExplainById = async (id) => {
  return Explain.findById(id);
};
/**
 * searchExplains
 * @param { object} filter
 * @param { object} options
 * @returns {Promise<Explain>}
 */
const searchExplains = async (filter, options) => {
  const explains = await Explain.paginate(
    {
      $and: [
        {
          $and: [
            { reason_name: { $regex: filter['reason_name'], $options: 'i' } },
            { user_name: { $regex: filter['user_name'], $options: 'i' } },
          ],
        },
      ],
    },
    options
  );
  return explains;
};
/**
 * Update Explain by id
 * @param {ObjectId} ExplainId
 * @param {Object} updateBody
 * @returns {Promise<Explain>}
 */
const updateExplainById = async (ExplainId, updateBody) => {
  const Explain = await getExplainById(ExplainId);
  if (!Explain) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Explain not found');
  }
  Object.assign(Explain, updateBody);
  await Explain.save();
  return Explain;
};

/**
 * Delete Explain by id
 * @param {ObjectId} ExplainId
 * @returns {Promise<Explain>}
 */
const deleteExplainById = async (ExplainId) => {
  const explain = await getExplainById(ExplainId);
  if (!explain) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tim thấy id đơn giải trình');
  }
  await explain.remove();
  return explain;
};

module.exports = {
  createExplain,
  queryExplains,
  getExplainById,
  updateExplainById,
  deleteExplainById,
  searchExplains,
};
