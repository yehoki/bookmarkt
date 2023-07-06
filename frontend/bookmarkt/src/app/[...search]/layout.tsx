import getCurrentUser from '@/actions/getCurrentUser';
import Navbar from '@/components/Navbar/Navbar';

interface BookPageLayoutProps {
  children: React.ReactNode;
}

const SearchPageLayout: React.FC<BookPageLayoutProps> = async ({
  children,
}) => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <Navbar currentUser={currentUser} />
      {children}
    </>
  );
};

export default SearchPageLayout;
