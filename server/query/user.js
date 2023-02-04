import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import createLoggerInstance from '../logger';

dotenv.config();
const logger = createLoggerInstance();

export const getUser = async (ctx, username) => {
  const user = await ctx.db.collection('adminUser').findOne({ username });
  return user;
};

export const checkUserCredentials = async (ctx, username, password) => {
  try {
    const user = await getUser(ctx, username);
    if (!user) {
      return { status: 'error', message: 'Invalid username or password' };
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET
      );
      ctx.cookies.set('jwt', token, {
        httpOnly: true,
        sameSite: 'none',
        secureProxy: true,
      });
      return { status: 'ok', data: token };
    }
    return { status: 'error', message: 'Invalid username or password' };
  } catch (err) {
    logger.error(err.message);
    return { status: 'error', message: err.message };
  }
};

export const authenticate = async (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return { status: 'ok', message: 'Authenticated', data: user };
  } catch (err) {
    logger.error(err.message);
    return { status: 'error', message: 'Invalid user' };
  }
};
