import React from "react";
import { useState } from "react";

function Unit({ unit, key, onClick }) {
  return (
    <div>
      <img
        src={unit.urlTMP}
        alt={unit.character_id}
        width={100}
        height={100}
      />
      <button onClick={() => onClick(unit)}>test data</button>
    </div>
  );
}

export default Unit;