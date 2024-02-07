export default class Model {
  constructor() {
    console.log("EXECUTING FETCH");
    this.data = null;
  }
  async fetchData(api = "http://127.0.0.1:9900/get_data") {
    try {
      const response = await fetch(api, {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const results = await response.json();
      console.log(typeof results);
      console.log(JSON.parse(results));
      this.data = JSON.parse(results);
      // if (!this.data) {
      //   throw new Error("Respose are Undefined");
      // }

      // console.log(typeof this.data);
    } catch (error) {
      console.error("error fetching data", error);
    }
  }
  async fetchOneData(
    columns,
    value,
    starts,
    end,
    api = "http://127.0.0.1:9900/get_one_data"
  ) {
    try {
      const response = await fetch(api, {
        mode: "cors",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          columns: columns,
          value: value,
          starts: starts,
          end: end,
        }),
      });
      console.log("Response executed");
      console.log(response);
      const res = await response.json();
      this.data = JSON.parse(res);
      console.log("Data being Added to");
    } catch (error) {
      console.error(error);
    }
  }
  seeData() {
    return this.data;
  }
}
