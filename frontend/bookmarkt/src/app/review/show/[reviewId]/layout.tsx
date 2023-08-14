import getCurrentUser from '@/actions/getCurrentUser';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';

interface ReviewPageLayoutProps {
  children: React.ReactNode;
}

const ReviewPageLayout: React.FC<ReviewPageLayoutProps> = async ({
  children,
}) => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <Navbar currentUser={currentUser} />
      <div className="pt-[100px] navOne:pt-[50px] pb-[100px]">{children}</div>
      <Footer />
    </>
  );
};

export default ReviewPageLayout;
