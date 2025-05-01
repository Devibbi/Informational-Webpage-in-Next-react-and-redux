import '../src/styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // This effect will run on the client side to remove any unwanted elements
  useEffect(() => {
    // Function to remove the cloud image
    const removeCloudImage = () => {
      // Target SVGs that might be the cloud image
      const svgs = document.querySelectorAll('svg');
      svgs.forEach(svg => {
        // Check if it's a large SVG that might be the cloud
        const rect = svg.getBoundingClientRect();
        if (rect.width > 300 && rect.height > 300) {
          svg.style.display = 'none';
          svg.remove();
        }
      });

      // Also remove any large images
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.width > 300 && rect.height > 300 && !img.closest('.image-container')) {
          img.style.display = 'none';
          img.remove();
        }
      });

      // Check for any fixed positioned elements at the bottom
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.position === 'fixed' && 
            (style.bottom === '0px' || parseInt(style.bottom) < 100) && 
            !el.closest('.nav-button')) {
          el.style.display = 'none';
          el.remove();
        }
      });
    };

    // Run immediately and also set an interval to keep checking
    removeCloudImage();
    const interval = setInterval(removeCloudImage, 1000);

    // Clean up
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Override any cloud image that might be added by a third-party script */
        body::after, 
        body > svg, 
        body > img,
        #__next::after,
        #__next > svg,
        #__next > img,
        [class*="cloud"],
        [class*="background-image"],
        [class*="large-image"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
