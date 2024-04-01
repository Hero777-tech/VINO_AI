// import { UserButton } from '@clerk/nextjs ===> testing button' 
import { useEffect, useState } from 'react';
import { Collection } from '@/components/shared/Collection';
import { navLinks } from '@/constants';
import { getAllImages } from '@/lib/actions/image.actions';
import Image from 'next/image';
import Link from 'next/link';

const Home = ({ searchParams }: SearchParamProps) => {
  const [images, setImages] = useState(null);
  const page = searchParams?.page ? Number(searchParams.page) : 1;
  const searchQuery = searchParams?.query || '';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getAllImages({ page, searchQuery });
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, [page, searchQuery]);

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link key={link.route} href={link.route} passHref>
              <li className="flex-center flex-col gap-2">
                <div className="rounded-full bg-white p-4">
                  <Image src={link.icon} alt="image" width={24} height={24} />
                </div>
                <p className="p-14-medium text-center text-white">
                  {link.label}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;
