import { MongoClient, ServerApiVersion } from 'mongodb';

const MongoClientConnection = (() => {
  let db = null;

  const DbConnect = async () => {
    try {
      let uri = process.env.DB_URI;
      let mongoClient = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });
      const mongoDbInstance = await mongoClient.db(process.env.DB);
      return mongoDbInstance;
    } catch (e) {
      return e;
    }
  };

  const Get = async () => {
    try {
      if (db != null) {
        return db;
      } else {
        db = await DbConnect();
        return db;
      }
    } catch (e) {
      return e;
    }
  };

  return {
    Get: Get,
  };
})();

export default MongoClientConnection;
