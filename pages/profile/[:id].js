import { useRouter } from 'next/router';
import React from 'react';
import { saveAs } from 'file-saver';

function ProfilePic() {
  const router = useRouter();
  const {
    query: { img },
  } = router;

  const download = () => {
    saveAs(img?.toString(), 'image.jpg');
  };

  return (
    <div className="bg-gray-400 h-screen flex flex-col items-center justify-center">
      <img
        src={img?.toString()}
        alt=""
        className="h-96 w-96 object-contain shadow-xl hover:scale-105 cursor-pointer transition duration-200 ease-in"
      />
      <button
        className="mt-10 bg-gradient-to-b from-[#6646ff] to-[#ba68ed] px-4 py-3 rounded-full text-white text-sm shadow-md hover:shadow-xl"
        onClick={download}
      >
        Download
      </button>
    </div>
  );
}

export default ProfilePic;
