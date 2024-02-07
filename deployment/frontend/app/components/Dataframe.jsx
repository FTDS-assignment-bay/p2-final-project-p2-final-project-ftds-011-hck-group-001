"use client";
import React, { useEffect, useState } from "react";
import Model from "../models/class";
const Dataframe = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [index, setIndex] = useState([]);
  // Loading Feature
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const models = new Model();

    const invoker = async () => {
      console.log("useEffect Infoker Run");
      await models.fetchData();
      const fdata = models.seeData();
      setData(fdata["data"]);
      setColumns(fdata["columns"]);
      setIndex(fdata["index"]);
      // Invoke Loading Feature after above is finished
      setLoading(false);
    };

    invoker();
  }, []);

  // Execute if it still loading
  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    // <div>
    //   {index.map((i) => {
    //     return <p>{data[i][i]}</p>;
    //   })}
    // </div>
    <div className="my-12 p-5 w-full bg-black border border-white border-2 rounded-3xl">
      <h1 className="my-3 py-3 text-3xl text-center android:hidden desktop:block">
        Sample Data Frame:
      </h1>
      <div className="my-3 text-sm py-3 justify-center android:hidden desktop:flex">
        <div>
          <table>
            {/* Columns */}
            <tr>
              {columns.map((i) => (
                <th className="p-2 border border-white">{i}</th>
              ))}
            </tr>
            {index.map((i) => {
              return (
                <tr>
                  {data[i].map((j) => {
                    return <td className="p-2 border border-white">{j}</td>;
                  })}
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );

  // return <div>{data}</div>;
};

export default Dataframe;
