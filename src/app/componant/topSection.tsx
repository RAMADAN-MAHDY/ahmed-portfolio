"use client";
import { useEffect ,useState} from 'react';
import gsap from 'gsap';


const topSection = () => {
    const [profileImage, setProfileImage] = useState(""); 


  useEffect(() => {

    const ApiUrl = process.env.NEXT_PUBLIC_API_URL ;

    // Fetch the latest image
    const fetchImage = async () => {
        try {
          const res = await fetch(`${ApiUrl}/getImage`);
          if (!res.ok) {
            throw new Error("Failed to fetch image");
          }
          const data = await res.json();
          setProfileImage(data.image); // تخزين رابط الصورة في الحالة
        //   console.log(data.image);
        //   console.log(data.date);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };
  
      fetchImage();




    // Animation for the text
    gsap.fromTo(
      ".header-text",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 3.5, ease: "power3.out" , stagger : 1.0}
    );

    gsap.fromTo(
        ".header-text2",
        { x: -500, opacity: 0 },
        { x: 0, opacity: 1, duration: 2.5, ease: "power3.out" , stagger : 1.0}
      );
      gsap.fromTo(
        ".header-text3",
        { x: 1000, opacity: 0 },
        { x: 0, opacity: 1, duration: 2.5, ease: "power3.out" , stagger : 1.0}
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
      { scale: 1, opacity: 1, duration: 1.5, ease: "bounce.in", delay: 0.5 }
    );
  }, []);

  return (
    <header className="flex flex-col  items-center justify-center text-center mt-[0px] px-4 bg-[#faeefa] dark:bg-[#0c0c0c] ">
      {/* صورة شخصية داخل برواز */}
      <div className=" flex flex-col items-center m-0 w-full px-0 rounded-4xl"
        style={{
            backgroundImage: `url('https://www.technocrazed.com/wp-content/uploads/2015/12/Designer-Wallpaper-Background-8.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          >

      <div className="relative mb-8 mt-10 ">
        {/* {profileImage !== ""&& 
        } */}
        <img
         loading='lazy'
         src={`${ profileImage ? profileImage : "Image"}`}
        alt=""
        className="profile-image w-[200px] h-[200px] rounded-full border-4 border-[#f00] shadow-lg"
      />
      
        <div className="absolute inset-0 rounded-full border-4 border-[#00ff00] animate-pulse"></div>
        
      </div>


</div>

      <h1 className="header-text font-bold text-[40px] md:text-[50px] mt-10 text-gray-800 dark:text-white">
        مرحبًا بك في محفظتي
      </h1>
  <h2 className="header-text font-bold text-[40px] md:text-[50px] text-gray-800 dark:text-white mt-6">أنا أحمد مهدي</h2>

      <div className="text-center mt-6 text-[#b60d0d] p-2  font-bold text-[22px] dark:bg-[#83fbff] bg-[#ff00ff28] rounded-4xl">
  <p className="header-text2 mt-4  md:text-[30px] text-gray-600 dark:text-[#517aff]">
    مصمم جرافيك وواجهات مستخدم، شغوف بابتكار تصاميم تليق بأعمالك وتبرز هويتك البصرية.
  </p>

    <br />
    <p className="header-text3 mt-4  md:text-[30px] text-gray-600 dark:text-[#517aff]">
    📌 متخصص في تصميم منيوهات المطاعم، بوسترات الأعمال الحرفية، وكروت الأعمال.

    </p>
      <p className="header-text mt-4  md:text-[30px] text-gray-600 dark:text-[#517aff] ">
        اكتشف أعمالي في مجال التصميم الجرافيكي.
      </p>
</div>

    
    </header>
  );
};

export default topSection;
