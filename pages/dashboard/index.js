import Team from "../../components/team";
import Unit from "../../components/unit";
import Now from "../../components/now";
import Filter from "../../components/filter";
import React from "react";
import { useState } from "react";

function Index({ data }) {

  const [chooseUnit, setChooseUnit] = useState(data)
  const [nowUnit, setNowUnit] = useState()
  const [show, setShow] = useState()
  const [team, setTeam] = useState([])
  const click_unit = (data) => {
    setNowUnit(data)
    console.log(data)
  }
  const addTeam = (unit) => {
    console.log("add unit", unit)
    if (team.length < 4) {
      setTeam([...team, unit])
    }
  }
  const removeTeam = (i) => {
    console.log("rm", i)
    let newTeam = []
    team.map((unit, k) => {
      if (k !== i) {
        newTeam = [...newTeam, unit]
      }
    })
    setTeam(newTeam)
  }

  return (
    <div>
      <div className="flex flex-col justify-center ">
        <div className='bg-slate-200 h-[120px]'>
          <Team team={team} removeTeam={removeTeam} />
        </div>
        <div className='bg-green-200 h-[120px]'>
          <Now unit={nowUnit} addTeam={addTeam} />
          {/* {show} */}
        </div>
        <div className="flex flex-row justify-center ">
          <Filter />
        </div>
        <div className='bg-red-200 flex flex-row flex-wrap gap-1 justify-center overflow-auto h-[450px]'>
          {chooseUnit.map((item, i) => {
            return (
              <Unit unit={item} key={i} onClick={click_unit} />
            )
          })}
        </div>

      </div>
    </div>
  );
}

async function getUnitData() {
  const res = await fetch(process.env.NEXT_API_URL + "/units");
  return res.json();
}

async function getUnitTmpData() {
  const res = await fetch(process.env.NEXT_API_URL + "/tmps");
  return res.json();
}

async function combine_unitTMP(all_unit, all_tmp) {
  for (let i = 0; i < all_unit.length; i++) {
    let havePic = 0;
    if (!all_unit[i].name) {
      // console.log(all_unit[i])
      all_unit[i].name = 'None'
    }
    for (let j = 0; j < all_tmp.length; j++) {
      if (all_unit[i].character_id === all_tmp[j].character_id) {
        all_unit[i].urlTMP = all_tmp[j].urlPicture
        havePic = 1;
        break;
      }
    }
    if (!havePic) {
      // all_unit[i].urlTMP = `https://api-crashlibrary.cf/images/_hq/Unit${all_unit[i].character_id}.png`
      all_unit[i].urlTMP = `https://api-crashlibrary.cf/images/_hq/Unit${15555}.png`
    }
  }
  return all_unit
}

export async function getStaticProps(ctx) {

  const unitData = await getUnitData();
  const tmpData = await getUnitTmpData();
  const all_unit = unitData.results
  const all_tmp = tmpData.results
  await all_unit.sort(function (first, second) {
    return second.character_id - first.character_id;
  });
  const combine_data = await combine_unitTMP(all_unit, all_tmp);
  console.log('finish')
  // console.log(combine_data[0])

  return {
    props: {
      data: combine_data
    }
  }
}

export default Index;