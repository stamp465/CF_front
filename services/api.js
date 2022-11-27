export async function getUnitData() {
  const res = await fetch(process.env.NEXT_API_URL + "/units");
  // console.log(res)
  return res.json();
}

export async function getUnitTmpData() {
  const res = await fetch(process.env.NEXT_API_URL + "/tmps");
  return res.json();
}
