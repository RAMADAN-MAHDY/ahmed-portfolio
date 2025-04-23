import TopSection from './componant/topSection';
import SocialIcons from './componant/SocialIcons';
// import Navbar from './componant/navbar';
import MyProjects from './componant/myProjects';
import Footer from '@/app/componant/footer';
export default function Home() {
  return (
<>
{/* <Navbar/> */}
<TopSection/>
<SocialIcons />
<MyProjects />
<Footer/>
</>
   
  );
}
