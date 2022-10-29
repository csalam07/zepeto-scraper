import Head from 'next/head';
import logo from '../assets/logo.png';
import { useState } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import Router from 'next/router';

const Home = () => {
  const [userName, setuserName] = useState('');

  const fetchProfile = async (e) => {
    e.preventDefault();
    if (!userName) return;
    // const response = await fetch('/api/hello', {
    //   method: 'POST',
    //   body: JSON.stringify({ userName }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // if (!(response.status === 200)) {
    //   return notify();
    // }
    // const { src } = await response.json();
    // console.log(src);
    // setdDatas(src);
    Router.push({
      pathname: `/user/${userName}}`,
      query: {
        id: userName,
      },
    });
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

      <Toaster />
    </div>
  );
};

export default Home;
