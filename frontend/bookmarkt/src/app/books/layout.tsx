import getCurrentUser from '@/actions/getCurrentUser';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';
import SingleBookDisplayModal from '@/components/modals/SingleBookDisplayModal';

interface BookPageLayoutProps {
  children: React.ReactNode;
}

const BookPageLayout: React.FC<BookPageLayoutProps> = async ({ children }) => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <SingleBookDisplayModal />
      <Navbar currentUser={currentUser} />

      <div className="pt-[100px] navOne:pt-[50px] pb-[100px]">{children}</div>
      <Footer />
    </>
  );
};

export default BookPageLayout;
