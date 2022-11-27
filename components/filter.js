import React from "react";
import { useEffect, useState } from "react";

function Filter({ setFilter, filter }) {
  const [costs, setcosts] = useState([])
  const [colors, setcolors] = useState([])
  const [main_tribes, setmain_tribes] = useState([])
  const [sub_tribes, setsub_tribes] = useState([])
  const [types, settypes] = useState([])
  const [modeAND, setModeAND] = useState(false)

  const sendBack = () => {
    // console.log("costs", costs)
    // console.log("colors", colors)
    // console.log("types", types)
    // console.log("main_tribes", main_tribes)
    // console.log("sub_tribes", sub_tribes)
    setFilter({
      rare: 6,
      modeAND: modeAND,
      cost: costs,
      color: colors,
      main_tribe: main_tribes,
      // sub_tribe: sub_tribes,
      type: types
    })
  }

  const filterColor = (state, color) => {
    if (state) {
      setcolors([...colors, color])
    }
    else {
      let neww = []
      colors.map((colorin, k) => {
        if (colorin !== color) {
          neww = [...neww, colorin]
        }
      })
      setcolors(neww)
    }
  }

  const filterCost = (state, cost) => {
    if (state) {
      setcosts([...costs, cost])
    }
    else {
      let neww = []
      costs.map((costin, k) => {
        if (costin !== cost) {
          neww = [...neww, costin]
        }
      })
      setcosts(neww)
    }
  }

  const filterType = (state, type) => {
    if (state) {
      settypes([...types, type])
    }
    else {
      let neww = []
      types.map((typein, k) => {
        if (typein !== type) {
          neww = [...neww, typein]
        }
      })
      settypes(neww)
    }
  }

  const filterMain_tribes = (state, main_tribe) => {
    if (state) {
      setmain_tribes([...main_tribes, main_tribe])
    }
    else {
      let neww = []
      main_tribes.map((main_tribesin, k) => {
        if (main_tribesin !== main_tribe) {
          neww = [...neww, main_tribesin]
        }
      })
      setmain_tribes(neww)
    }
  }

  const filterAND = (state) => {
    setModeAND(state)
  }

  useEffect(() => {
    // console.log("nowFilter = ", nowFilter)
    // console.log("filter = ", filter)
  }, [])

  return (
    <div>
      <label htmlFor="filter-modal" className="btn btn-outline border-4">Filter</label>

      <input type="checkbox" id="filter-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center">Filter</h3>
          <p className="mt-2 font-bold text-lg">color</p>
          {filter.color.map((color, i) => {
            return (
              <div key={"color" + i} className="inline-flex items-center justify-start w-20 gap-0.5 px-1 py-0.5">
                <input type="checkbox" className="checkbox self-center" onClick={(ev) => { filterColor(ev.target.checked, color) }} />
                <span className="text-base">{color}</span>
              </div>
            )
          })}
          <p className="mt-2 font-bold text-lg">cost</p>
          {filter.cost.map((cost, i) => {
            return (
              <div key={"cost" + i} className="inline-flex items-center justify-start w-20 gap-0.5 px-1 py-0.5">
                <input type="checkbox" className="checkbox self-center" onClick={(ev) => { filterCost(ev.target.checked, cost) }} />
                <span className="">{cost}</span>
              </div>
            )
          })}
          <p className="mt-2 font-bold text-lg">type</p>
          {filter.type.map((type, i) => {
            return (
              <div key={"type" + i} className="inline-flex items-center justify-start w-48 gap-0.5 px-1 py-0.5">
                <input type="checkbox" className="checkbox self-center" onClick={(ev) => { filterType(ev.target.checked, type) }} />
                <span className="">{type}</span>
              </div>
            )
          })}
          <div className="mt-2 ">
            <span className="font-bold text-lg">Tribe</span>
            <span className="inline-flex items-center justify-start w-48 gap-0.5 px-1 py-0.5">
              <span className="">Use AND mode</span>
              <input type="checkbox" className="checkbox self-center" onClick={(ev) => { filterAND(ev.target.checked) }} />
            </span>

          </div>
          {filter.main_tribe.map((main_tribe, i) => {
            if (main_tribe && main_tribe !== 'Sanrio Character')
              return (
                <div key={"main_tribe" + i} className="inline-flex items-center justify-start w-32 gap-0.5 px-1 py-0.5">
                  <input type="checkbox" className="checkbox self-center" onClick={(ev) => { filterMain_tribes(ev.target.checked, main_tribe) }} />
                  <span className="">{main_tribe}</span>
                </div>
              )
          })}
          <div className="modal-action">
            <label htmlFor="filter-modal" className="btn btn-outline border-4" onClick={() => { sendBack() }}>Filter</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;