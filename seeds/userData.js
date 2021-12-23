const { User } = require('../models');

const userdata = [
  {
    "username": "dummy",
    "password": "notworking"
  }
];

const seedUser = () => User.bulkCreate(userdata);


module.exports = seedUser;