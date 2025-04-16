"use client";
import { useEffect } from 'react';
import gsap from 'gsap';


const topSection = () => {
  useEffect(() => {
    // Animation for the text
    gsap.fromTo(
      ".header-text",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" , stagger : 1.0}
    );

    // Animation for the images
    gsap.fromTo(
      ".header-image",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out", stagger: 0.3 }
    );

    // Animation for the profile image
    gsap.fromTo(
      ".profile-image",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <header className="flex flex-col items-center justify-center text-center mt-[0px] px-4 bg-[#faeefa] dark:bg-[#0c0c0c]">
      {/* صورة شخصية داخل برواز */}
      <div className="relative mb-8 mt-10">
        <img
          src="https://th.bing.com/th/id/OIP.McdSRz_KMNBLZQvkn_T5rwHaH_?rs=1&pid=ImgDetMain"
          alt="صورة شخصية"
          className="profile-image w-[200px] h-[200px] rounded-full border-4 border-gray-300 shadow-lg"
        />
        <div className="absolute inset-0 rounded-full border-4 border-gray-800 animate-pulse"></div>
      </div>
      <h1 className="header-text font-bold text-[40px] md:text-[50px] text-gray-800 dark:text-white">
        مرحبًا بك في محفظتي
      </h1>
      <p className="header-text mt-4 text-[18px] md:text-[20px] text-gray-600 dark:text-gray-400">
        اكتشف إبداعاتي وأعمالي في مجال التصميم الجرافيكي والويب.
      </p>
    
    </header>
  );
};

export default topSection;
