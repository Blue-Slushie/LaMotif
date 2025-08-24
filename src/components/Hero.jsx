import React from 'react';
import { images } from '../assets/assets';

const Hero = () => {
  return (
    <div className="overflow-hidden mt-5 relative w-full">
      <div className="flex w-max animate-scroll">
        {images.map((img, i) => (
          <div
            key={`first-${i}`}
            className={`flex-shrink-0 w-[700px] h-[500px] bg-cover bg-center mr-2 ${i % 2 === 0 ? '' : 'scale-x-[-1]'}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {images.map((img, i) => (
          <div
            key={`second-${i}`}
            className={`flex-shrink-0 w-[700px] h-[500px] bg-cover bg-center mr-2 ${i % 2 === 0 ? '' : 'scale-x-[-1]'}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 50s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
