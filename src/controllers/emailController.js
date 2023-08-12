import { render } from '@react-email/render';
import dotenv from 'dotenv';
import { EmailToReceiver, EmailToSender, useSendMessage } from '../emails';

dotenv.config();
function MessageController() {
  const { sendMessage } = useSendMessage();

  async function sendAndSaveMessage(req, res) {
    const parsedBody = JSON.parse(req.body);
    const name = parsedBody.name || 'Ghost';
    const email = parsedBody.email;
    const message = parsedBody.message || 'Ghost talking in code words';
    const date = parsedBody.date;

    const emailHtmlForReceiver = render(
      <EmailToReceiver
        name={name}
        email={email}
        message={message}
        dateString={date}
      />
    );

    const emailHtmlForSender = render(
      <EmailToSender
        name={name}
        email={email}
        message={message}
        dateString={date}
      />
    );

    const emailOptionsForReceiver = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Email From ${name}`,
      html: emailHtmlForReceiver,
    };

    const emailOptionsForSender = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Thank you for your Email',
      html: emailHtmlForSender,
    };

    try {
      sendMessage(res, email, emailOptionsForReceiver, emailOptionsForSender);
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: `4: Connecting to DB client Error: ${error}`,
      });
    }
  }

  return { sendAndSaveMessage: sendAndSaveMessage };
}

export default MessageController;
