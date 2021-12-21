const { User } = require('../models');

const userdata = [
  {
    "username": "testing",
    "password": "password"
  }
];

const seedUser = () => User.bulkCreate(userdata);


module.exports = seedUser;