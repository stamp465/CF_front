import React from "react";
import { useState } from "react";

function Unit({ unit, key, onClick }) {
  const bgClass = {
    green: `border-2 border-green-900 bg-green-500
          rounded-tr-xl rounded-bl-xl rounded-tl-3xl rounded-br-3xl
          overflow-hidden w-[80px] h-[80px]`,
    blue: `border-2 border-blue-900 bg-blue-500
          rounded-tr-xl rounded-bl-xl rounded-tl-3xl rounded-br-3xl
          overflow-hidden w-[80px] h-[80px]`,
    red: `border-2 border-red-900 bg-red-500
          rounded-tr-xl rounded-bl-xl rounded-tl-3xl rounded-br-3xl
          overflow-hidden w-[80px] h-[80px]`,
    yellow: `border-2 border-yellow-900 bg-yellow-500
          rounded-tr-xl rounded-bl-xl rounded-tl-3xl rounded-br-3xl
          overflow-hidden w-[80px] h-[80px]`
  }
  return (
    <div>

      <button
        onClick={() => onClick(unit)}
        className={bgClass[unit.color]}
      >
        <img
          src={unit.urlTMP}
          alt={unit.character_id}
        />
      </button>

    </div>
  );
}

export default Unit;