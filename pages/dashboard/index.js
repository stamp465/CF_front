import Team from "../../components/team";
import Unit from "../../components/unit";
import Now from "../../components/now";
import Filter from "../../components/filter";
import React, { useEffect } from "react";
import { useState } from "react";
import { getUnitData, getUnitTmpData } from "../../services/api"
import { combine_unitTMP, filterdata, list_filter } from "../../services/filter"

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
        <div className='bg-slate-200 h-[180px] m-2 flex flex-col justify-center '>
          <Team team={team} removeTeam={removeTeam} />
        </div>
        <div className="flex flex-row items-center justify-center gap-8 m-2 h-[140px]">
          <Filter setFilter={setFilter} filter={filter} />
          <Now unit={nowUnit} addTeam={addTeam} />
        </div>
        <div className='border-4 border-black rounded-xl flex flex-row flex-wrap gap-2 justify-center overflow-auto h-[375px] p-8'>
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
  filter.rare = 6
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