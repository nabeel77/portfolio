import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import getDb from './dbInstace';
import { serialize } from 'cookie';

dotenv.config();
export const getUser = async (username) => {
  const db = await getDb();
  const user = await db.collection('adminUser').findOne({ username });
  return user;
};

export const checkUserCredentials = async (res, username, password) => {
  try {
    const user = await getUser(username);
    if (!user) {
      return {
        status: 401,
        data: { status: 'error', message: 'Invalid username or password' },
      };
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET
      );
      const serialized = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
      res.setHeader('Set-Cookie', serialized);
      return { status: 200, data: { status: 'ok', data: token } };
    } else {
      return {
        status: 401,
        data: { status: 'error', message: 'Invalid username or password' },
      };
    }
  } catch (err) {
    console.error(err.message);
    return {
      status: 401,
      data: { status: 'error', message: 'Invalid username or password' },
    };
  }
};

export const authenticate = async (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return {
      status: 200,
      data: { status: 'ok', message: 'Authenticated', data: user },
    };
  } catch (err) {
    console.error(err.message);
    return { status: 401, data: { status: 'error', message: 'Invalid user' } };
  }
};
