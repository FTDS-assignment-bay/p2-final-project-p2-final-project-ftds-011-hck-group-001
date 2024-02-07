"use client";
import React, { useCallback, useState } from "react";
import Model from "../models/Class";

const Showcase = () => {
  // const [test, setTest] = useState("A");

  // Create Start and End Limit State
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  // Create Previous and Current Cluster State
  const [prev, setPrev] = useState("");
  const [current, setCurrent] = useState("");

  // create HTML State
  const [html, setHtml] = useState(
    <h1 className="text-xl text-center font-bold hidden">Loading...</h1>
  );
  const handler = useCallback(async (e) => {
    // Add Buffering
    setHtml(<h1 className="text-xl text-center font-bold">Loading...</h1>);

    // Create Model
    const model = new Model();

    // Create Desired Input
    const columns = "cluster";
    const data = e.target.value;
    if (!current) {
      setCurrent(data);
    }

    // Get Model from Backend
    await model.fetchOneData(columns, data);
    const response = model.seeData();
    console.log(response);
    if (response) {
      const htmlparse = (
        <table className="w-full">
          {/* Columns */}
          <tr>
            {response["columns"].map((i) => (
              <th className="p-2 border border-white">{i}</th>
            ))}
          </tr>
          {response["index"].map((i) => {
            return (
              <tr>
                {response["data"][i].map((j) => {
                  return <td className="p-2 border border-white">{j}</td>;
                })}
              </tr>
            );
          })}
        </table>
      );
      setHtml(htmlparse);
    } else {
      const htmlparse = <h1 className="text-3xl hidden"> No Data</h1>;
      setHtml(htmlparse);
    }
  }, []);

  return (
    <div className="my-12 p-5 w-full bg-black border border-white border-2 rounded-3xl">
      <div className="my-3 w-full h-20 text-center">
        <h1 className="text-3xl font-bold">
          Top 10 Based of Frequency and Monetary Values By Each Segmentation
        </h1>
      </div>
      {/* <h1>{test}</h1> */}
      <div className="my-3 w-full">
        <h1 className="text-3xl font-bold">Insight:</h1>
        <ol>
          <li className="my-12 mx-5 list-disc">
            <h1 className="text-3xl font-bold">Loyal High Spenders</h1>
            <p>
              {" "}
              This cluster represents the most valuable customers, who shop
              frequently and spend the most. Strategies to retain these
              customers and encourage them to continue their shopping habits
              could be highly beneficial.
            </p>
          </li>
          <li className="my-12 mx-5 list-disc">
            <h1 className="text-3xl font-bold">At-Risk Low Spenders</h1>
            <p>
              {" "}
              These customers are at risk of churning as they haven't made
              recent purchases, don't buy frequently, and spend little.
              Retargeting strategies, re-engagement campaigns, and customer
              feedback analysis could be critical to reactivating these
              customers.
            </p>
          </li>
          <li className="my-12 mx-5 list-disc">
            <h1 className="text-3xl font-bold">New Enthusiasts</h1>
            <p>
              {" "}
              This cluster might represent newer customers who have started to
              engage with the brand. They don't spend as much as the high-value
              customers in Loyal High Spenders but show potential. Tailored
              marketing campaigns and special offers could encourage them to
              increase their frequency and monetary value.
            </p>
          </li>
        </ol>
      </div>
      <div className="w-full my-12 mx-auto">
        <select
          name=""
          id=""
          className="bg-black w-full p-3 border border-white "
          onChange={handler}
        >
          <option value="" selected="selected">
            --Choose The Option---
          </option>
          <option value="0">Loyal High Spenders</option>
          <option value="1">At-Risk Low Spenders</option>
          <option value="2">New Enthusiasts</option>
        </select>

        <div className=" my-12 mx-auto overflow-y-scroll w-full border-r border-white">
          {html}
        </div>
      </div>
    </div>
  );
};

export default Showcase;
