import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0b0f1a',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: '-2px',
            color: '#e8ecf5',
            textTransform: 'uppercase',
          }}
        >
          Nabeel Munir
        </div>
        <div style={{ display: 'flex', marginTop: 14, fontSize: 34, color: '#7ee3a6' }}>
          Full Stack Engineer
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
