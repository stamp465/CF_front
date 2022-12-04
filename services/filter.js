export async function combine_unitTMP(all_unit, all_tmp) {

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
      // all_unit[i].urlTMP = `https://api-crashlibrary.cf/images/_hq/Unit${15555}.png`
      // all_unit[i].urlTMP = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
      all_unit[i].urlTMP = false
      // console.log(i)
    }
  }
  return all_unit
}

export function list_filter(all_unit, want) {
  let list = []
  all_unit.forEach((unit) => {
    let check = 0
    list.forEach((data) => {
      if (unit[want] == data) {
        check = 1
      }
    })
    if (!check) {
      list = [...list, unit[want]]
    }
  })
  console.log("filter with", want, list)
  return list
}

export function filterdata(data, nowFilter) {
  let newdata = []
  data.map((unit, i) => {
    let canRare = 0
    if (unit.rare === 6) canRare = 1

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




    if (((canColor && canCost) && (canMain_tribe && canType)) && canRare) {
      newdata = [...newdata, unit]
    }
  })
  return newdata
}