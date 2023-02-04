import sendgrid from '@sendgrid/mail';
import { validateEmail } from '../helpers';

export default function useSendMessage() {
  const { emailValidation } = validateEmail();
  const sendMessage = async (
    email,
    emailOptionsForReceiver,
    emailOptionsForSender
  ) => {
    const emailCheckPass = emailValidation(email);
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    if (!email) {
      return { status: 400, message: 'Email address is required!' };
    } else if (emailCheckPass) {
      try {
        await sendgrid.send(emailOptionsForReceiver);
        await sendgrid.send(emailOptionsForSender);
        return {
          status: 200,
          message: 'Thank you for your message 😊. Message sent successfully!',
        };
      } catch (error) {
        return {
          status: 400,
          message: `1: Email sending Error: ${error}`,
        };
      }
    }
  };
  return { sendMessage: sendMessage };
}
