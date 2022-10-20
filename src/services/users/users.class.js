const { Service } = require("feathers-nedb");
const crypto = require("crypto");
const query = "s=60";

const gravUrl = "https://s.gravatar.com/avatar";

// Overwriting a service
exports.Users = class Users extends Service {
  create(data, params) {
    const { email, password, githubId } = data;

    const hash = crypto
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex");

    const avatar = `${gravUrl}/${hash}?${query}`;

    const msgData = {
      email,
      password,
      githubId,
      avatar,
    };

    return super.create(msgData, params);
  }
};
