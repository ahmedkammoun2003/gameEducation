import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="flex justify-between bg-black p-3 rounded-lg text-3xl">
      <div className="text-white">
        <FontAwesomeIcon icon={faUserShield} />
        <span>funEdu</span>
      </div>
      <div className="text-white flex gap-6">
        <h1 className="">HOME</h1>
        <span>SIGNIN</span>
        <span>SIGNUP</span>
      </div>
    </div>
  );
}
