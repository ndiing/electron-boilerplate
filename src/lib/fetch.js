const fetch = require("@ndiinginc/fetch");
const create = fetch.create;
fetch.create = (_id, options) => {
    options.filename = process.env.APP_DIRNAME + "/data/database.db";
    return create(_id, options);
};
module.exports = fetch;
