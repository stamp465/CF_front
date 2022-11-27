import React from "react";
import { useEffect, useState } from "react";
import { bgClass, borderH, borderS, btn } from "../styles/color"

function Team({ team, removeTeam }) {

  let show = <></>
  const [showTeam, setShowTeam] = useState(<></>)

  useEffect(() => {
    console.log("team change")
    show = team.map((unit, i) => {
      return (
        <div key={"team" + i} className="flex flex-col gap-0.5">
          <div className={bgClass[unit.color]}><img
            src={unit.urlTMP}
            alt={unit.character_id}
          /></div>
          <label htmlFor={String(unit._id)} className="btn btn-xs">Details</label>
          <button className="btn btn-xs" onClick={() => { removeTeam(i) }}>Remove</button>
          <input type="checkbox" id={String(unit._id)} className="modal-toggle" />
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
                <label htmlFor={String(unit._id)} className={btn[unit.color]}>Close</label>
              </div>
            </div>
          </div>
        </div>

      )
    })
    setShowTeam(show)
  }, [team])

  return (
    <div className="flex justify-center items-center w-screen gap-4">
      {
        team.length !== 0 ?
          showTeam :
          <div className="font-bold text-2xl">{"Crash Fever Team Build"}</div>
      }
    </div>
  );
}

export default Team;