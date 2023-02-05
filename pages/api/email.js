import MongoClientConnection from '../../server/db';
import { MessageController } from '../../controllers';

const getDb = async () => {
  try {
    return await MongoClientConnection.Get();
  } catch (err) {
    logger.error(err);
  }
};
export default function handler(req, res) {
  const { sendAndSaveMessage } = MessageController();
  sendAndSaveMessage(req, res);
}
