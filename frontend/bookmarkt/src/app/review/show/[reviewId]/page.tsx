import Image from 'next/image';

interface SingleReviewPageProps {
  params: { reviewId: string };
}

const SingleReviewPage: React.FC<SingleReviewPageProps> = async ({
  params,
}) => {
  const id = params.reviewId;
  return (
    <>
      <main className="md:hidden">
        <section className="flex py-3 px-3 gap-3">
          <div className="relative w-[30px] h-[30px]">
            <Image
              src={'/images/empty-user.png'}
              alt="User image"
              fill
              className="rounded-full border-[#D8D8D8] border"
            />
          </div>
          <div className="flex-1 text-sm">
            <div>
              <h2>User rated a book</h2>
              <h3 className="text-xs text-neutral-400">Time ago</h3>
            </div>
            <div className="flex gap-2">
              <div className="relative w-[55px] h-[85px] aspect-[3/2]">
                <Image
                  src={'/images/empty-book.png'}
                  alt="Book cover"
                  fill
                  className="border"
                />
              </div>
              <div>
                <h4>Book title</h4>
                <h5 className="text-neutral-400">by Author</h5>
                <div>Button</div>
              </div>
            </div>
            <div className="text-neutral-400">Read in ####</div>
            <div>Review Info</div>
          </div>
        </section>
        <section>Write a comment</section>
      </main>
    </>
  );
};

export default SingleReviewPage;
