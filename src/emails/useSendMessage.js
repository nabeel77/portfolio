import sendgrid from '@sendgrid/mail';
import { validateEmail } from '../utils/helpers';

export default function useSendMessage() {
  const { emailValidation } = validateEmail();

  const sendMessage = (
    res,
    email,
    emailOptionsForReceiver,
    emailOptionsForSender
  ) => {
    const emailCheckPass = emailValidation(email);

    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

    if (!email) {
      res
        .status(400)
        .json({ status: 400, message: 'Email address is required!' });
    } else if (emailCheckPass) {
      (async () => {
        try {
          await sendgrid.send(emailOptionsForReceiver);
          (async () => {
            try {
              await sendgrid.send(emailOptionsForSender);
            } catch (error) {
              if (error.response) {
                console.error(error.response.body);
                res.status(400).json({
                  status: 400,
                  message: `1: Email sending Error: ${error.response.body.errors[0].message}`,
                });
                return;
              }

              console.error(error);
              res.status(400).json({
                message: `1: Email sending Error: ${error}`,
              });
            }
          })();
          res.status(201).json({
            status: 201,
            message:
              'Thank you for your message 😊. Your message was sent successfully.',
          });
        } catch (error) {
          if (error.response) {
            console.error(error.response.body);
            res.status(400).json({
              status: 400,
              message: `2: Email sending Error: ${error.response.body.errors[0].message}`,
            });
            return;
          }

          console.error(error);
          res
            .status(400)
            .json({ status: 400, message: `2: Email sending Error: ${error}` });
        }
      })();
    } else {
      res.status(400).json({
        status: 400,
        message: 'Please provide a valid e-mail address!',
      });
    }
  };

  return { sendMessage: sendMessage };
}
