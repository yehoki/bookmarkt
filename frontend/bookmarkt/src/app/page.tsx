import BookDisplay from '../components/BookDisplay';
import Footer from '../components/Footer';
import CheckLogin from '@/components/CheckLogin';
export default function Home() {
  return (
    <>
      <CheckLogin />
      <BookDisplay />
      <Footer />
    </>
  );
}
