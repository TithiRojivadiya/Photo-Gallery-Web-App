
import React from "react";

function Card(props) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <img
        src={props.download_url}
        alt={props.author}
        className="h-48 w-full object-cover"
      />

      <div className="flex items-center justify-between p-4">
        <h3 className="font-semibold text-gray-800">
          {props.author}
        </h3>

        <button className="text-2xl text-gray-400 hover:text-red-500">
          ♥
        </button>
      </div>
    </div>
  );
}

export default Card;
