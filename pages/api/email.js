import getDb from '../../query/dbInstace';
import { MessageController } from '../../controllers';

export default function handler(req, res) {
  const { sendAndSaveMessage } = MessageController();
  sendAndSaveMessage(req, res);
}
