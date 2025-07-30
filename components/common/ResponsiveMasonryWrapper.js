import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamically import ResponsiveMasonry with no SSR
const ResponsiveMasonry = dynamic(
  () => import('react-responsive-masonry').then(mod => ({ default: mod.ResponsiveMasonry })),
  { ssr: false }
);

const Masonry = dynamic(
  () => import('react-responsive-masonry').then(mod => ({ default: mod.default })),
  { ssr: false }
);

const ResponsiveMasonryWrapper = ({ children, columnsCountBreakPoints, ...props }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a simple div during SSR
    return <div className="masonry-placeholder" style={{ minHeight: '200px' }} />;
  }

  return (
    <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints} {...props}>
      <Masonry {...props}>
        {children}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ResponsiveMasonryWrapper; 