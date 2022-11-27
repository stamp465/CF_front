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

  const borderH = {
    yellow: "font-bold text-base border-2 border-yellow-600 inline-block px-1 py-0.5 rounded-md",
    green: "font-bold text-base border-2 border-green-600 inline-block px-1 py-0.5 rounded-md",
    blue: "font-bold text-base border-2 border-blue-600 inline-block px-1 py-0.5 rounded-md",
    red: "font-bold text-base border-2 border-red-600 inline-block px-1 py-0.5 rounded-md"
  }

  const borderS = {
    yellow: "my-2 text-sm border-2 border-yellow-400 px-1 py-0.5 rounded-md",
    green: "my-2 text-sm border-2 border-green-400 px-1 py-0.5 rounded-md",
    blue: "my-2 text-sm border-2 border-blue-400 px-1 py-0.5 rounded-md",
    red: "my-2 text-sm border-2 border-red-400 px-1 py-0.5 rounded-md"
  }

  const btn = {
    blue: "btn btn-outline btn-info border-4 ",
    green: "btn btn-outline btn-success border-4 ",
    yellow: "btn btn-outline btn-warning border-4 ",
    red: "btn btn-outline btn-error border-4 "
  }

  useEffect(() => {
    console.log("unit change")
  }, [unit])

  return (
    <div>
      {unit ?
        <>
          <div className="text-lg font-bold">{`${unit.name} `}</div>
          <div className="text-base">{`[${unit.main_tribe},${unit.sub_tribe}] [${unit.type}]`}</div>
          <div className="flex gap-4">
            <div className="flex justify-center items-center w-1/4">
              <div className={bgClass[unit.color]}><img
                src={unit.urlTMP}
                alt={unit.character_id}
              /></div>
            </div>
            <div className="flex justify-center items-center w-3/4 gap-4">
              <label htmlFor="my-modal" className={btn[unit.color]}>Details</label>
              <button className={btn[unit.color]} onClick={() => { addTeam(unit) }}>Add to Team</button>
            </div>
          </div>

          <input type="checkbox" id="my-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <div>
                <div className={borderH[unit.color]}>Skill</div>
                {unit.multiple_skill.length == 0 ?
                  <div className={borderS[unit.color]}>{`[${unit.skill_cd}CD] ${unit.skill_comment}`}</div> :
                  unit.multiple_skill.map((skill, i) => {
                    // console.log(skill)
                    return (<div key={i}>{`[${skill.cooldown}CD] ${skill.comment}`}</div>)
                  })
                }
              </div>
              <div>
                <div className={borderH[unit.color]}>C-Skill</div>
                <div className={borderS[unit.color]}>{unit.cskill_comment}</div>
              </div>
              <div>
                {
                  unit.abilities.map((abi, i) => {
                    return (
                      <div key={i}>
                        <div className={borderH[unit.color]}>{`Ability ${i + 1} [${abi.bug} bug]`}</div>
                        <div className={borderS[unit.color]}>{abi.comment}</div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="modal-action">
                <label htmlFor="my-modal" className={btn[unit.color]}>Close</label>
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