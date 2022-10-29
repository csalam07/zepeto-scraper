import type { NextPage } from 'next';
import Head from 'next/head';
import { HiCheckBadge } from 'react-icons/hi2';
import { MdLocationOn } from 'react-icons/md';
import logo from '../assets/logo.png';
import { useState } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import Router from 'next/router';

const notify = () =>
  toast('This username does not exist', {
    icon: '🥴',
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });

const Home: NextPage = () => {
  const [datas, setdDatas] = useState('');
  const [userName, setuserName] = useState('');

  const viewImage = () => {
    Router.push({
      pathname: `/profile/${userName}}`,
      query: {
        img: datas.srcTxt,
      },
    });
  };

  const fetchProfile = async (e: any) => {
    e.preventDefault();
    const response = await fetch('/api/hello', {
      method: 'POST',
      body: JSON.stringify({ userName }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!(response.status === 200)) {
      return notify();
    }
    const { src } = await response.json();
    console.log(src);
    setdDatas(src);
  };

  return (
    <div
      className="flex items-center justify-center h-screen
    bg-gradient-to-b from-[#6646ff] to-[#ba68ed]
    "
    >
      <Head>
        <title>Zepeto Me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!datas && (
        <div className="flex flex-col items-center">
          <Image src={logo} alt="" className="h-72 w-72 object-contain" />
          <form onSubmit={fetchProfile}>
            <input
              type="text"
              placeholder="seacrh user"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              className="bg-gray-50 text-sm border-none outline-none shadow-md px-4 py-2 rounded-md"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
        </div>
      )}

      {/* <img src={datas} alt="" className="h-96 w-96 m-10" /> */}
      {datas && (
        <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full flex justify-center">
                <div className="relative">
                  <img
                    src={datas.srcTxt}
                    className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                  />
                </div>
              </div>
              <div className="w-full text-center mt-20">
                <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                  <div className="p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                      {datas.postTxt}
                    </span>
                    <span className="text-sm text-slate-400">Posts</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                      {datas.follworsTxt}
                    </span>
                    <span className="text-sm text-slate-400">Followers</span>
                  </div>

                  <div className="p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                      {datas.follwingTxt}
                    </span>
                    <span className="text-sm text-slate-400">Following</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-2">
              <h3 className="flex items-center justify-center text-2xl text-slate-700 font-bold leading-normal mb-1">
                {datas.titleTxt}
                <span>
                  <HiCheckBadge className="ml-2 h-6 text-blue-600" />
                </span>
              </h3>
              <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                <div className="flex items-center justify-center">
                  <MdLocationOn className="mr-2 text-gray-500" />{' '}
                  {datas.locationTxt}
                </div>
              </div>
            </div>
            <div className="mt-6 py-6 border-t border-slate-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                  <p className="font-light leading-relaxed text-slate-600 mb-4">
                    {datas.bioTxt}
                  </p>
                </div>
                <button
                  className=" bg-gradient-to-b from-[#6646ff] to-[#ba68ed] px-4 py-3 rounded-full text-white text-sm shadow-md hover:shadow-xl"
                  onClick={viewImage}
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default Home;
