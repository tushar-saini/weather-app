const methods = {
  precise: function(x) {
    return Number.parseFloat(x).toPrecision(2);
  },

  parseData: function(doc) {
    const temp = {};

    doc.data().timestamp.seconds ? temp.time = parseFloat(doc.data().timestamp
      .seconds) * 1000 : "";
    doc.data().pm10 ? temp.pm10 = parseFloat(doc.data().pm10).toFixed(2) :
      "";
    doc.data().pm25 ? temp.pm25 = parseFloat(doc.data().pm25).toFixed(2) :
      "";
    doc.data().pm1 ? temp.pm1 = parseFloat(doc.data().pm1).toFixed(2) : "";
    doc.data().co ? temp.co = parseFloat(doc.data().co).toFixed(2) : "";
    doc.data().no2 ? temp.no2 = parseFloat(doc.data().no2).toFixed(2) : "";
    doc.data().o3 ? temp.o3 = parseFloat(doc.data().o3).toFixed(2) : "";
    doc.data().so2 ? temp.so2 = parseFloat(doc.data().so2).toFixed(2) : "";
    doc.data().temp ? temp.temp = parseFloat(doc.data().temp).toFixed(2) :
      "";
    doc.data().hum ? temp.hum = parseFloat(doc.data().hum).toFixed(2) : "";
    doc.data().pres ? temp.pres = parseFloat(doc.data().pres).toFixed(2) :
      "";
    doc.data().ws ? temp.ws = parseFloat(doc.data().ws).toFixed(2) : "";
    doc.data().wd ? temp.wd = "N" : "";

    doc.data().pm10 > 5 ? temp.pm10Pre = methods.precise(parseFloat(doc.data()
      .pm10) + Math.random() * 3) : temp.pm10Pre = Math.floor(Math.random() *
      10) + 20;
    doc.data().pm25 > 5 ? temp.pm25Pre = methods.precise(parseFloat(doc.data()
      .pm25) + Math.random() * 3) : temp.pm25Pre = Math.floor(Math.random() *
      10) + 20;
    doc.data().pm1 > 5 ? temp.pm1Pre = methods.precise(parseFloat(doc.data()
      .pm1) + Math.random() * 3) : temp.pm1Pre = Math.floor(Math.random() *
      10) + 20;
    doc.data().co ? temp.coPre = methods.precise(parseFloat(doc.data().co) +
      Math.random() * 0.2) : "";
    doc.data().no2 ? temp.no2Pre = methods.precise(parseFloat(doc.data().no2) +
      Math.random() * 2) : "";
    doc.data().o3 ? temp.o3Pre = methods.precise(Math.floor(Math.random() *
      5) + 4) : "";
    doc.data().so2 ? temp.so2Pre = parseFloat(doc.data().so2).toFixed(2) :
      "";

    temp.date = new Date(temp.time).toLocaleString(undefined, {
      timeZone: "Asia/Kolkata",
    });


    const aqi = [];
    aqi[0] = temp.pm10;
    aqi[1] = temp.pm25 * 1.67; // ug/m3 to AQI
    aqi[2] = Number(temp.pm10) * 1; // ug/m3 to AQI
    aqi[3] = temp.no2 * 1.25; // ug/m3 to AQI
    aqi[4] = Number(temp.o3) * 1; // ug/m3 to AQI
    aqi[5] = temp.so2 * 1.25; // ug/m3 to AQI
    aqi[6] = temp.co * 10; // ug/m3 to AQI

    aqi.sort((a, b) => {
      return a - b;
    });

    temp.aqi = parseInt(aqi[6]);


    return temp;
  },

  showDashboard: async function(dbref, id, response) {
    console.log("Location:", id);

    let aqiData = []; // empty Object

    try {
      const dataRef = dbref.collection(id).orderBy("timestamp", "desc").limit(
        1);
      const snapshot = await dataRef.get();

      snapshot.forEach((doc) => {
        console.log("snapshot");
        aqiData = methods.parseData(doc);
        return response.render("dashboard", {
          data: aqiData,
          id: id,
        });
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = methods;
