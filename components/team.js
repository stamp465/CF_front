import React from "react";
import { useEffect, useState } from "react";


function Team({ team, removeTeam }) {

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

  let show = <></>
  const [showTeam, setShowTeam] = useState(<></>)

  useEffect(() => {
    console.log("team change")
    show = team.map((unit, i) => {
      return (
        <>
          <div className={bgClass[unit.color]}><img
            src={unit.urlTMP}
            alt={unit.character_id}
          /></div>
          <label htmlFor={String(unit._id)} className="btn">Details</label>
          <button className="btn" onClick={() => { removeTeam(i) }}>Remove</button>
          <input type="checkbox" id={String(unit._id)} className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
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
              <div className="modal-action">
                <label htmlFor={String(unit._id)} className="btn">Close</label>
              </div>
            </div>
          </div>
        </>

      )
    })
    setShowTeam(show)
  }, [team])

  return (
    <div className="flex justify-center items-center w-screen gap-4">
      {
        team.length !== 0 ?
          showTeam :
          "Not have"
      }
    </div>
  );
}

export default Team;