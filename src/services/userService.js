const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../../users.json');

const readUsers = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
};

const saveUser = async (user) => {
  const users = await readUsers();
  const newUser = { id: uuidv4(), ...user };
  users.push(newUser);
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
  return newUser;
};

const isEmailTaken = async (email) => {
  const users = await readUsers();
  return users.some(u => u.email === email);
};

const getUserByEmail = async (email) => {
  const users = await readUsers();
  return users.find(u => u.email === email);
};

module.exports = { saveUser, isEmailTaken, getUserByEmail };
