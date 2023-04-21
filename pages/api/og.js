import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

const image = fetch(
  new URL('../../public/images/Nabeel.jpg', import.meta.url)
).then((res) => res.arrayBuffer());
const orbitron = fetch(
  new URL('../../public/fonts/Orbitron-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
const orbitronBold = fetch(
  new URL('../../public/fonts/Orbitron-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req) {
  const imageData = await image;
  const orbitronRegular = await orbitron;
  const orbBold = await orbitronBold;
  const { searchParams, protocol, host } = new URL(req.url);
  return new ImageResponse(
    (
      <div tw="flex flex-col gap-2 justify-center items-center bg-[#171212] w-full h-full">
        <div tw="text-5xl flex justify-center items-center flex-col gap-2 w-full h-full -mb-10">
          <div tw="flex w-40">
            <img
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: '0 50px',
              }}
              width="256"
              height="256"
              src={imageData}
            />
          </div>
          <div tw="flex flex-col w-full h-max justify-center items-center">
            <p
              style={{
                marginLeft: '70px',
                fontWeight: 700,
                color: '#108753',
              }}
            >
              Nabeel Munir
            </p>
            <p
              style={{
                marginLeft: '90px',
                marginTop: '-30px',
                fontWeight: 700,
                color: '#D6CACB',
              }}
            >
              Full stack web developer
            </p>
          </div>
        </div>
        <div
          style={{
            padding: '50px 0',
            width: '100%',
            height: '20%',
            backgroundColor: '#151010',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '40px',
            marginBottom: '40px',
          }}
        >
          Nabeel Munir Portfolio
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 700,
      fonts: [
        {
          name: 'Orbitron',
          data: orbitronRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Orbitron',
          data: orbBold,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );
}
