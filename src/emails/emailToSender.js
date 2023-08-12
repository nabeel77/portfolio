import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Link } from '@react-email/link';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import * as React from 'react';

export default function EmailToSender({ name, email, message, dateString }) {
  return (
    <Html>
      <Head />
      <Preview>
        Thank you for your message, {name}. I will try to get back to you as
        soon as possible.
      </Preview>
      <Section style={main}>
        <Container style={container}>
          <Section style={{ marginTop: '32px' }}>
            <Img
              src="https://projectimages77.s3.eu-central-1.amazonaws.com/NabeelMunir.png"
              width="80"
              height="80"
              alt="N.M. Portfolio"
              style={{ ...logo, borderRadius: '100%' }}
            />
          </Section>
          <Text style={h1}>
            New Email From <strong>{name}</strong>
          </Text>
          <Text style={{ ...text, fontStyle: 'italic' }}>
            <strong>Email: </strong>
          </Text>
          <Text style={text}>
            <Link href={`mailto:${email}`} style={link}>
              {email}
            </Link>
          </Text>
          <Text style={{ ...text, fontStyle: 'italic' }}>
            <strong>Your Message: </strong>
          </Text>
          <Text style={text}>{message}</Text>
          <Text style={{ ...text, fontStyle: 'italic' }}>
            <strong>Date: </strong>
          </Text>
          <Text style={text}>{dateString}</Text>
          <Section style={{ textAlign: 'center' }}>
            <Button pX={20} pY={12} style={btn} href={`mailto:${email}`}>
              Reply
            </Button>
          </Section>
          <Text style={text}>
            <br />
            or copy and paste this {email} into your email client:{' '}
            <Link href={email} style={link}>
              {email}
            </Link>
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            This email was sent to me from{' '}
            <Link href={`mailto:${email}`} style={link}>
              {email}
            </Link>{' '}
            using contact form on my{' '}
            <Link
              href="https://www.nabeelmunir.com/"
              target="_blank"
              style={link}
              rel="noreferrer"
            >
              personal portfolio page
            </Link>
            .
          </Text>
          <Section
            style={{
              ...main,
              backgroundColor: '#b5cdf5',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <Link
              href="https://www.linkedin.com/in/nabeel-munir-8a7a99134/"
              target="_blank"
              style={link}
              rel="noreferrer"
            >
              <Img
                src="https://projectimages77.s3.eu-central-1.amazonaws.com/linkedinLogo.png"
                width="24"
                height="24"
                alt="N.M. LinkedIn Profile"
                style={{
                  ...logo,
                  filter: 'grayscale(100%)',
                  margin: '10px auto',
                }}
              />
            </Link>
            <Link
              href="https://github.com/Nabeel77"
              target="_blank"
              style={link}
              rel="noreferrer"
            >
              <Img
                src="https://projectimages77.s3.eu-central-1.amazonaws.com/githubLogo.png"
                width="24"
                height="24"
                alt="N.M. Github Profile"
                style={{
                  ...logo,
                  filter: 'grayscale(100%)',
                  margin: '10px auto',
                }}
              />
            </Link>
            <Link
              href="https://www.nabeelmunir.com/"
              target="_blank"
              style={link}
              rel="noreferrer"
            >
              <Img
                src="https://projectimages77.s3.eu-central-1.amazonaws.com/NabeelMunir.png"
                width="24"
                height="24"
                alt="N.M. Portfolio"
                style={{
                  ...logo,
                  filter: 'grayscale(100%)',
                  margin: '10px auto',
                  borderRadius: '100%',
                }}
              />
            </Link>
          </Section>
        </Container>
      </Section>
    </Html>
  );
}

const main = {
  backgroundColor: '#0f172a',
  margin: '0 auto',
};

const container = {
  backgroundColor: '#0e1526',
  border: '1px solid #38bdf8',
  borderRadius: '5px',
  margin: '40px auto',
  padding: '20px',
};

const logo = {
  margin: '0 auto',
};

const h1 = {
  color: '#b5cdf5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'normal',
  textAlign: 'center',
  margin: '30px 0',
  padding: '0',
};

const link = {
  color: '#38bdf8',
  textDecoration: 'none',
};

const text = {
  color: '#b5cdf5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  lineHeight: '24px',
};

const btn = {
  backgroundColor: '#1e293b',
  borderRadius: '5px',
  color: '#b5cdf5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '50px',
  textDecoration: 'none',
  textAlign: 'center',
};

const hr = {
  border: 'none',
  borderTop: '1px solid #b5cdf5',
  margin: '26px 0',
  width: '100%',
};

const footer = {
  color: '#b5cdf5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '24px',
};
