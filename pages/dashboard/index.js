import Team from "../../components/team";
import Unit from "../../components/unit";
import Now from "../../components/now";
import Filter from "../../components/filter";
import React, { useEffect } from "react";
import { useState } from "react";

function Index({ data, filter }) {

  const [chooseUnit, setChooseUnit] = useState(data)
  const [nowUnit, setNowUnit] = useState()
  const [show, setShow] = useState()
  const [nowFilter, setNowFilter] = useState(filter)
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
  const setFilter = (data) => {
    setNowFilter(data)
  }
  const [unitShow, setUnitShow] = useState(
    <div className='bg-red-200 flex flex-row flex-wrap gap-1 justify-center overflow-auto h-[450px]'>
      {chooseUnit.map((item, i) => {
        return (
          <Unit unit={item} key={i} onClick={click_unit} />
        )
      })}
    </div>
  )

  useEffect(() => {
    console.log(nowFilter)
    const newdata = filterdata(data, nowFilter)
    setChooseUnit(newdata)
  }, [nowFilter])

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
          <Filter setFilter={setFilter} filter={filter} />
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
  // console.log(res)
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

// function list_filter(all_unit, want) {
//   let list = []
//   all_unit.forEach((unit) => {
//     let check = 0
//     list.forEach((data) => {
//       if (unit[want] == data) {
//         check = 1
//       }
//     })
//     if (!check) {
//       list = [...list, unit[want]]
//     }
//   })
//   console.log("filter with", want, list)
//   return list
// }

function filterdata(data, nowFilter) {
  let newdata = []
  data.map((unit, i) => {
    let canCost = 0
    if (nowFilter.cost.length === 0) canCost = 1
    else {
      nowFilter.cost.map((c, i) => {
        if (unit.cost === c) {
          canCost = 1
        }
      })
    }

    let canColor = 0
    if (nowFilter.color.length === 0) canColor = 1
    else {
      nowFilter.color.map((c, i) => {
        if (unit.color === c) {
          canColor = 1
        }
      })
    }

    let canType = 0
    if (nowFilter.type.length === 0) canType = 1
    else {
      nowFilter.type.map((c, i) => {
        if (unit.type === c) {
          canType = 1
        }
      })
    }

    let canMain_tribe = 0


    if (nowFilter.main_tribe.length === 0) canMain_tribe = 1
    else {
      if (nowFilter.modeAND) {
        let t1 = 0, t2 = 0
        nowFilter.main_tribe.map((c, i) => {
          if (unit.main_tribe === c) {
            t1 = 1
          }
          if (unit.sub_tribe === c) {
            t2 = 1
          }
        })
        if (t1 && t2) canMain_tribe = 1
      }
      else {
        nowFilter.main_tribe.map((c, i) => {
          if (unit.main_tribe === c) {
            canMain_tribe = 1
          }
          if (unit.sub_tribe === c) {
            canMain_tribe = 1
          }
        })
      }

    }




    if ((canColor && canCost) && (canMain_tribe && canType)) {
      newdata = [...newdata, unit]
    }
  })
  return newdata
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
  let filter = {}
  // filter.cost = await list_filter(combine_data, 'cost')
  filter.cost = [99, 87, 69, 68, 65, 63, 60, 59, 58, 55, 53, 50, 48, 45, 40]
  // filter.color = await list_filter(combine_data, 'color')
  filter.color = ['green', 'yellow', 'blue', 'red']
  // filter.main_tribe = await list_filter(combine_data, 'main_tribe')
  filter.main_tribe = [
    'Astro', 'QUEEN',
    'Chaotic', 'Unidentified',
    'Weapon', 'Mech',
    'Academic', 'Human',
    'Animal', 'Fantasy',
    'WonderPlanet', 'Hero',
    'Deity', 'Guardian',
    'Demon', 'Idol',
    'Samurai', 'Prototype',
    'Admin', 'Dragon',
    'Summer', 'Sacred',
    'Sanrio Character', 'Mutant',
    null, 'Orochi'
  ]
  // filter.type = await list_filter(combine_data, 'type')
  filter.type = [
    'Balanced Type',
    'Recovery Type',
    'Technical Type',
    'Offense Type',
    'Stamina Type',
    'Coin Type'
  ]
  filter.modeAND = false

  const out_data = filterdata(combine_data, filter)

  return {
    props: {
      data: out_data,
      filter: filter
    }
  }
}

export default Index;