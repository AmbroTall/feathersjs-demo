const { authenticate } = require("@feathersjs/authentication").hooks;

const message = require("../../hooks/message");

const getUser = require("../../hooks/get_user");

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [message()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [getUser()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
