import React from "react";
import { useEffect } from "react";
import { bgClass, borderH, borderS, btn } from "../styles/color"

function Now({ unit, addTeam }) {

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
        <div className="font-bold">{"Pls select Unit"}</div>

      }
    </div>
  );
}

export default Now;