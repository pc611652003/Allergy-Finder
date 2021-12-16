const { User } = require('../models');
const fs = require('fs');

const seedUser = () => {
  let userdata = [];
  fs.readFile('../db/User.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      userdata = JSON.parse(data);
      User.bulkCreate(userdata);
    }
  });
}

module.exports = seedUser;