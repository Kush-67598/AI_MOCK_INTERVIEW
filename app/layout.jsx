import './globals.css';

export const metadata = {
  title: 'VoicePrep',
  description: 'AI Mock Interview UI prototype'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
