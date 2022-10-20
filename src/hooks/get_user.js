// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const message = require("./message");

// eslint-disable-next-line no-unused-vars

/* eslint-disable require-atomic-updates */ //disable warnings

// Adding user information from the server when making any message request
module.exports = (options = {}) => {
  return async (context) => {
    const { app, params, method, result } = context;

    // Function to get user in a particular message
    const addUser = (msg) => {
      const user = app.service("users").get(msg.userID, params);
      return {
        ...msg,
        user,
      };
    };

    // Reslult.data = all messages result = particular message . We map over each message to add user in each message in "FIND method"
    if (method === "find") {
      result.data = await Promise.all(result.data.map(addUser));
    } else {
      context.result = await addUser(result);
    }

    return context;
  };
};
