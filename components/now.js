import React from "react";
import { useEffect } from "react";

function Now({ unit }) {
  useEffect(() => {
    console.log("unit change")
  }, [unit])
  return (
    <div>
      {unit ?
        <img
          src={unit.urlTMP}
          alt={unit.character_id}
          width={100}
          height={100}
        /> :
        " Not have"
      }
    </div>
  );
}

export default Now;