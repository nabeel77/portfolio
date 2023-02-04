import React from 'react';
import { render } from '@react-email/render';

import {
  EmailToReceiver,
  EmailToSender,
  useSendMessage,
} from '../../../emails';

export const sendAndSaveEmailMessage = async (ctx) => {
  const data = JSON.parse(ctx.request.body);
  const name = data.name || 'Ghost';
  const email = data.email;
  const message = data.message || 'Ghost talking in code words';
  const date = data.date;
  const { sendMessage } = useSendMessage();
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
    from: 'nabeel.beeni30@gmail.com',
    to: 'nabeel.beeni30@gmail.com',
    subject: `New 📧 From ${name}`,
    html: emailHtmlForReceiver,
  };
  const emailOptionsForSender = {
    from: 'nabeel.beeni30@gmail.com',
    to: email,
    subject: 'Thank you for your 📧',
    html: emailHtmlForSender,
  };
  try {
    const result = await sendMessage(
      email,
      emailOptionsForReceiver,
      emailOptionsForSender
    );
    ctx.body = result;
  } catch (err) {
    console.log(err);
  }
};
