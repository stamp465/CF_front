function test({ tmps }) {
  console.log(tmps.urlPicture.length)
  return (
    <div>
      <img src={'data:image/png;base64,' + tmps.urlPicture.slice(2, tmps.urlPicture.length - 1)} />
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
        //8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
    </div>
  );
}

async function getTexttmp() {
  const res = await fetch(process.env.NEXT_API_URL + "/texttmps");
  // console.log(res)
  return res.json();
}

export async function getStaticProps(ctx) {
  const tmps = await getTexttmp()

  return {
    props: {
      tmps: tmps.results[0]
    }
  }
}

export default test;