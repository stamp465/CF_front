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
      <label htmlFor="filter-modal" className="btn">Filter</label>

      <input type="checkbox" id="filter-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Filter</h3>
          <span className="">Use AND mode</span>
          <input type="checkbox" className="checkbox self-center" onClick={(ev) => { filterAND(ev.target.checked) }} />
          <p className="py-4">color</p>
          {filter.color.map((color, i) => {
            return (
              <div key={"color" + i} className="inline-flex items-center justify-center bg-blue-200 border-blue-900 border-2 w-20">
                <span className="">{color}</span>
                <input type="checkbox" className="checkbox self-center" onClick={(ev) => { filterColor(ev.target.checked, color) }} />
              </div>
            )
          })}
          <p className="py-4">cost</p>
          {filter.cost.map((cost, i) => {
            return (
              <div key={"cost" + i} className="inline-flex items-center justify-center bg-red-200 border-red-900 border-2 w-20">
                <span className="">{cost}</span>
                <input type="checkbox" className="checkbox self-center" onClick={(ev) => { filterCost(ev.target.checked, cost) }} />
              </div>
            )
          })}
          <p className="py-4">type</p>
          {filter.type.map((type, i) => {
            return (
              <div key={"type" + i} className="inline-flex items-center justify-center bg-orange-200 border-orange-900 border-2 w-48">
                <span className="">{type}</span>
                <input type="checkbox" className="checkbox self-center" onClick={(ev) => { filterType(ev.target.checked, type) }} />
              </div>
            )
          })}
          <p className="py-4">main_tribe</p>
          {filter.main_tribe.map((main_tribe, i) => {
            return (
              <div key={"main_tribe" + i} className="inline-flex items-center justify-center bg-yellow-200 border-yellow-900 border-2 w-32">
                <span className="">{main_tribe}</span>
                <input type="checkbox" className="checkbox self-center" onClick={(ev) => { filterMain_tribes(ev.target.checked, main_tribe) }} />
              </div>
            )
          })}
          <div className="modal-action">
            <label htmlFor="filter-modal" className="btn" onClick={() => { sendBack() }}>Filter</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;