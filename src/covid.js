import { useEffect, useState } from "react";

import ReactApexChart from "react-apexcharts";
const axios = require("axios");
let options = {
  chart: {
    type: "donut",
  },
  labels: ["Cases", "Deaths", "Recovered"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};
let series = [];
function Covid() {
  const [th, setTh] = useState(undefined);
  const [chart, setChart] = useState(undefined);

  useEffect(() => {
    console.log(th);
    console.log(series);
    if (th === undefined) {
      getData();
    } else {
      console.log("pass");
      series = [th.cases, th.deaths, th.recovered];
      console.log(series);
      setChart(
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          width={500}
        />
      );
    }
  }, [th]);

  async function getData() {
    let t = await axios({
      url: "https://disease.sh/v3/covid-19/countries/Thailand?strict=true",
      method: "get",
    })
      .then((res) => {
        // console.log(res.data);
        return res.data;
      })
      .catch((err) => undefined);
    setTh(t);
  }
  return <div className="vh-100">{chart}</div>;
}
export default Covid;
