import './globals.css';

export const metadata = {
  title: 'Bookmarkt',
  description: 'Find your dream books here',
};

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
