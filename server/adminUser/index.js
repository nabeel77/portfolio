import bcrypt from 'bcryptjs';

const createUser = async () => {
  const hashedPassword = await bcrypt.hash('A!s2d3f4g5', 10);
  const adminUserData = {
    username: username,
    email: email,
    password: hashedPassword,
  };
  const db = await MongoClientConnection.Get();
  const res = await db.insert(adminUserData);
  return res;
};

createUser();
