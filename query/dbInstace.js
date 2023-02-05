import MongoClientConnection from '../utils/mongo';

const getDb = async () => {
  return await MongoClientConnection.Get();
};

export default getDb;
