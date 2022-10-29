import { useState } from 'react';
import { HiCheckBadge } from 'react-icons/hi2';
import { MdLocationOn } from 'react-icons/md';
import Router from 'next/router';
import Error from 'next/error';

const notify = () =>
  toast('This username does not exist', {
    icon: '🥴',
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });

function User({ src, id, errorCode }) {
  if (errorCode) {
    notify();
    return <Error statusCode={errorCode} />;
  }
  console.log(src);

  const viewImage = () => {
    Router.push({
      pathname: `/profile/${id}}`,
      query: {
        img: src.srcTxt,
      },
    });
  };
  return (
    <div className="flex h-screen items-center justify-center bg-banner bg-no-repeat bg-cover">
      <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-gray-200 w-full mb-6 shadow-lg rounded-xl mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                <img
                  src={src.srcTxt}
                  className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
              </div>
            </div>
            <div className="w-full text-center mt-20">
              <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    {src.postTxt}
                  </span>
                  <span className="text-sm text-slate-400">Posts</span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    {src.follworsTxt}
                  </span>
                  <span className="text-sm text-slate-400">Followers</span>
                </div>

                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    {src.follwingTxt}
                  </span>
                  <span className="text-sm text-slate-400">Following</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <h3 className="flex items-center justify-center text-2xl text-slate-700 font-bold leading-normal mb-1">
              {src.titleTxt}
              <span>
                <HiCheckBadge className="ml-2 h-6 text-blue-600" />
              </span>
            </h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              <div className="flex items-center justify-center">
                <MdLocationOn className="mr-2 text-gray-500" />{' '}
                {src.locationTxt}
              </div>
            </div>
          </div>
          <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <p className="font-light leading-relaxed text-slate-600 mb-4">
                  {src.bioTxt}
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
    </div>
  );
}

export default User;
export async function getServerSideProps(context) {
  const { query } = context;

  const { id } = query;
  const url = context.req.headers.host;
  const res = await fetch(`https://${url}/api/hello`, {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const errorCode = res.ok ? false : res.status;
  const { src } = await res.json();
  return {
    props: { src, id, errorCode },
  };
}
