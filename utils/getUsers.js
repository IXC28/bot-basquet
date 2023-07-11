const db = require('../database');

const getUser = (id) => {
  const user = db.prepare(`
    SELECT * FROM users
    WHERE discord_id = ?
    `).get(id);
  return user;
};


//get coins
const getCoins = (id) => {
  const user = db.prepare(`
    SELECT * FROM coins
    WHERE discord_id = ?
    `).get(id);
  return user;
};

function getNumbers(expresion) {
  const string = String(expresion);
  const numbers = string.replace(/[^0-9]/g, '');
  return numbers;
}

module.exports = { getUser, getCoins, getNumbers };