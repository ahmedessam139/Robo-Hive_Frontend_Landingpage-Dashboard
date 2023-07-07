import { useRouter } from "next/router";
import { AiOutlineMail } from "react-icons/ai";


const Footer = () => {
  const router = useRouter();

  return (

    <footer className="bg-white rounded-lg shadow mt-5 ">
      <div className="w-full md:py-2 bg-gray-100">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center items-center ">
            
            <div onClick={() => router.push("/")} className="flex items-center gap-x-3 cursor-pointer mx-3">
              <img src="/logos/main_logo.svg" width={150} alt="Logo" />
            </div>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 flex justify-center items-center">
            <li>
              <div className="text-gray-500 cursor-pointer mx-3 sm:mt-0">
                <a href="mailto:eventhive@gmail.com">
                  <AiOutlineMail className="inline-block" />
                  <span className="ml-1 text-sm">Contact Us</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <hr className="my-1 border-gray-200 sm:mx-auto  lg:my-1" />
        <div class="flex justify-center items-center ">
          <span className="block text-sm text-gray-500 sm:text-center">© 2023 <span className="hover:underline">ROBO-HIVE</span>. All Rights Reserved.</span>
        </div>
      </div>
    </footer>


  );
};

export default Footer;