import './globals.css';
import { Lato } from 'next/font/google';

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata = {
  title: 'Bookmarkt',
  description: 'Find your dream books here',
};

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${lato.variable} scroll-smooth`}>
      <body className="relative">
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
