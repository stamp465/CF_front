import React from "react";
import { useEffect } from "react";

function Now({ unit }) {
  useEffect(() => {
    console.log("unit change")
  }, [unit])

  const showData = (
    <>

      <div>{`${unit.name} [${unit.main_tribe},${unit.sub_tribe}] [${unit.type}]`}</div>
      <div className="bg-blue-500 grid grid-cols-4">
        <div className="flex justify-center items-center"><img
          src={unit.urlTMP}
          alt={unit.character_id}
          width={100}
          height={100}
        /></div>
        <div className="col-span-3">
          <div>
            <>Skill<br /></>
            {`[${unit.skill_cd}CD] ${unit.skill_comment}`}
          </div>
          <div>
            <>C-Skill<br /></>
            <>{unit.cskill_comment}</>
          </div>
          <div>
            {
              unit.abilities.map((abi, i) => {
                return (
                  <>
                    <div>{`Ability ${i + 1} [${abi.bug} bug]`}</div>
                    <div>{abi.comment}</div>
                  </>

                )
              })
            }
          </div>
        </div>

      </div>
    </>
  )

  return (
    <div>
      {unit ?
        showData :
        " Not have"
      }
    </div>
  );
}

export default Now;