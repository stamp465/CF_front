import React from "react";
import { useEffect } from "react";

function Now({ unit, addTeam }) {

  const bgClass = {
    green: `border-2 border-green-900 bg-green-500
          rounded-tr-xl rounded-bl-xl rounded-tl-3xl rounded-br-3xl
          overflow-hidden w-[80px] h-[80px] `,
    blue: `border-2 border-blue-900 bg-blue-500
          rounded-tr-xl rounded-bl-xl rounded-tl-3xl rounded-br-3xl
          overflow-hidden w-[80px] h-[80px] `,
    red: `border-2 border-red-900 bg-red-500
          rounded-tr-xl rounded-bl-xl rounded-tl-3xl rounded-br-3xl
          overflow-hidden w-[80px] h-[80px] `,
    yellow: `border-2 border-yellow-900 bg-yellow-500
          rounded-tr-xl rounded-bl-xl rounded-tl-3xl rounded-br-3xl
          overflow-hidden w-[80px] h-[80px] `
  }

  useEffect(() => {
    console.log("unit change")
  }, [unit])

  return (
    <div>
      {unit ?
        <>
          <div>{`${unit.name} [${unit.main_tribe},${unit.sub_tribe}] [${unit.type}]`}</div>
          <div className="bg-blue-500 flex">
            <div className="flex justify-center items-center w-1/4">
              <div className={bgClass[unit.color]}><img
                src={unit.urlTMP}
                alt={unit.character_id}
              /></div>
            </div>
            <div className="flex justify-center items-center w-3/4 gap-4">
              <label htmlFor="my-modal" className="btn">Details</label>
              <button className="btn" onClick={() => { addTeam(unit) }}>Add to Team</button>
            </div>
          </div>

          <input type="checkbox" id="my-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <div>
                <div>Skill<br /></div>
                {unit.multiple_skill.length == 0 ?
                  <div>{`[${unit.skill_cd}CD] ${unit.skill_comment}`}</div> :
                  unit.multiple_skill.map((skill, i) => {
                    // console.log(skill)
                    return (<div key={i}>{`[${skill.cooldown}CD] ${skill.comment}`}</div>)
                  })
                }
              </div>
              <div>
                <div>C-Skill<br /></div>
                <div>{unit.cskill_comment}</div>
              </div>
              <div>
                {
                  unit.abilities.map((abi, i) => {
                    return (
                      <div key={i}>
                        <div>{`Ability ${i + 1} [${abi.bug} bug]`}</div>
                        <div>{abi.comment}</div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="modal-action">
                <label htmlFor="my-modal" className="btn">Close</label>
              </div>
            </div>
          </div>
        </> :
        " Not have"
      }
    </div>
  );
}

export default Now;