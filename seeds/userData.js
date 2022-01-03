const { User } = require('../models');

const userdata = [
  {
    "username": "testing",
    "password": "$2b$10$I4d0RoD.TL99TPW9mUkbWe9eaT3khaWI2XFFgOWgmY2xhFEV9T7qu"
  }
];

const seedUser = () => User.bulkCreate(userdata);


module.exports = seedUser;