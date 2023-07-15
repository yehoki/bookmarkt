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
      <body className="bg-[rgba(244,241,234,0.5)] relative">
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
