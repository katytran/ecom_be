"use strict";
const utilsHelper = {};
utilsHelper.sendResponse = (res, status, success, data, errors, message) => {
  const response = {};
  if (success) response.success = success;
  if (data) response.data = data;
  if (errors) response.errors = errors;
  if (message) response.message = message;
  res.status(status).json(response);
};
module.exports = utilsHelper;
