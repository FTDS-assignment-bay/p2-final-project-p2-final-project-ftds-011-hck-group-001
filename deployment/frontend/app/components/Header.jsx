import React from "react";

const Header = () => {
  return (
    <div className="my-3 p-5 w-full bg-black border border-white border-2 rounded-3xl">
      <div>
        <h1 className="text-3xl text-center font-bold">
          Customer Segmentation by RFM and Clustering Analysis
        </h1>
      </div>
      <div className="my-3 p-12 grid desktop:grid-cols-3 desktop:items-center android:grid-flow-cols">
        <div className="m-3">
          <h1 className="text-xl android:text-lg"> Nama: Adam Nur Ramadan</h1>
          <h1 className="text-xl android:text-lg">
            {" "}
            Role: Data Engineer, Fullstack Developer
          </h1>
        </div>
        <div className="m-3">
          <h1 className="text-xl android:text-lg">
            {" "}
            Nama: Fajar Ibrah Muhammad
          </h1>
          <h1 className="text-xl android:text-lg"> Role: Data Scientist</h1>
        </div>
        <div className="m-3">
          <h1 className="text-xl android:text-lg"> Nama: Nadia Novira</h1>
          <h1 className="text-xl android:text-lg"> Role: Data Scientist</h1>
        </div>
        <div className="m-3">
          <h1 className="text-xl android:text-lg">
            {" "}
            Nama: Permata Hajjarianti
          </h1>
          <h1 className="text-xl android:text-lg"> Role: Data Analyst</h1>
        </div>

        <div className="m-3">
          <h1 className="text-xl android:text-lg"> Nama: Maulidya Fauziyyah</h1>
          <h1 className="text-xl android:text-lg"> Role: Data Analyst</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
