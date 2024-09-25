'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <div
      className="relative  h-[115vh] bg-cover flex items-center justify-center"
      style={{
        backgroundImage: `url('/bg.jpg')`, // Background image
      }}
    >
      {/* Middle Frame */}
      <div className="flex items-center w-full ">
        {' '}
        <div className=" flex flex-col gap-7 w-full ml-44 relative">
          {/* one button */}
          <div className="flex flex-col w-full group">
            <button
              type="button"
              className=" bg-pink-50 mr-10 hover:bg-white  text-pink-500 font-bold py-2 px-6 rounded-tl-2xl rounded-br-2xl w-[13%] "
            >
              CAPTURE
            </button>
            <div className="flex bg-pink-50 group-hover:bg-white  w-full p-[0.4px]" />
          </div>

          {/* 2 button */}
          <div className="flex flex-col w-full group">
            <button
              type="button"
              className=" bg-pink-50 mr-10 hover:bg-white  text-pink-500 font-bold py-2 px-6 rounded-tl-2xl rounded-br-2xl w-[13%] "
            >
              RETAKE
            </button>
            <div className="flex bg-pink-50 group-hover:bg-white  w-full p-[0.4px]" />
          </div>

          {/* 3 Button */}
          <div className="flex flex-col w-full group">
            <button
              type="button"
              className=" bg-pink-50 mr-10 hover:bg-white  text-pink-500 font-bold py-2 px-6 rounded-tl-2xl rounded-br-2xl w-[13%] "
            >
              SAVE
            </button>
            <div className="flex bg-pink-50 group-hover:bg-white  w-full p-[0.4px]" />
          </div>
        </div>
        <div className=" absolute left-[35%] z-10 max-w-xs w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <Image width={500} height={500} src="/frame.png" alt="Frame" />
        </div>
      </div>

      {/* Right Image (Girl) */}
      <div className="absolute right-0 top-0 md:block ">
        <Image width={500} height={500} src="/right-img.png" alt="Girl Image" />
      </div>
    </div>
  );
}
