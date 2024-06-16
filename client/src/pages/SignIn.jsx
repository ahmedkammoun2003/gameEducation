import React from "react";
import knight from "../assets/knight-1283910_1280.jpg";
import Oauth from "../components/Oauth";
export default function () {
  return (
    <div className=" h-[92vh] p-10" style={{backgroundColor: "#A1622F"}}>
      <div
        className="h-[80vh] mx-auto bg-center bg-no-repeat flex justify-center items-center"
        style={{  backgroundImage: `url(${knight})`}}
      >
        <div className="">
            <input type="checkbox" id="" />
            <span>TEACHER</span>
        </div>
        <div className="">
            <input type="checkbox" id="" />
            <span>STUDENT</span>
        </div>
        <Oauth className="text-white bg-black p-3 opacity-70 rounded-lg" text="SIGN WITH GOOGLE"/>
      </div>
    </div>
  );
}