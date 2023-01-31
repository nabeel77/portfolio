import bcrypt from 'bcryptjs';
import MongoClientConnection from '../db';
import readline from 'readline';
import { logger } from '../logger';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter username: ', (username) => {
  rl.question('Enter email: ', (email) => {
    rl.question('Enter password: ', async (password) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const adminUserData = { username, email, hashedPassword };
      try {
        const db = await MongoClientConnection.Get();
        const res = await db.insert(adminUserData);
      } catch (e) {
        logger.error(e);
      }
      rl.close();
    });
  });
});
