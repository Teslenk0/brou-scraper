"use strict";

const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR:500,
  NOT_IMPLEMENTED: 501,
};

module.exports = HTTP_STATUS_CODES;