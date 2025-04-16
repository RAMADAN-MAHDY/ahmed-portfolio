"use client";
import { useState } from "react";
import Image from "next/image";
import style from "./style/myProject.module.css"

const ShowImages = ({ imageSrc, altText }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
    <div className={`absolute right-0 w-[40%] h-[100%] bottom-0 ${style.imageContainer}`}
          onClick={openModal}
          >
      {/* الصورة المصغرة */}
  
          <Image src={imageSrc}
                  alt={altText}
                  objectFit="cover"
                  layout="fill"
                  className="rounded-lg shadow-lg"
                  loading="lazy"
             
                        />
    </div>

    {isModalOpen && (
        <div className=" top-0 bottom-0 right-[10%] left-[-5%]  inset-1 z-100 flex items-center justify-center bg-[#fff] rounded-4xl">
          <div className="relative">
            {/* زر الإغلاق */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200 transition-colors"
            >
              ✕
            </button>

            {/* الصورة الكبيرة */}
            <img
              src={imageSrc}
              alt={altText}
              className="max-w-[100%] max-h-[100%] rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShowImages;