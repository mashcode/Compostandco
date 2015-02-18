// based on https://blog.safaribooksonline.com/2013/07/25/an-arduino-powered-bbq-thermometer/

var j5 = require("johnny-five");
var board = new j5.Board();

var LEDPIN = 8;
var THMPIN = "A0";

board.on("ready", function(){
  var led = new j5.Led(LEDPIN);
  var thm = new j5.Sensor({ pin: THMPIN, freq: 500 });

  // do stuff w/ the temperature, here

  // Compost temp alert range
  //var alertTemperatureF = 135;

  //debug temp alert
  var alertTemperatureF = 90;
  var currentTemp;
 
  thm.on("change",  function(err, thmVoltage){
    currentTemp = convertVoltToTemp(thmVoltage);
 
    if (currentTemp.tempF &gt;= alertTemperatureF) {
      led.on();
    } else {
      led.off();
    }
 
    console.log("Current TempF: ", currentTemp.tempF);
  });


function convertVoltToTemp(volt){
  var tempK, tempC, tempF;

  // get the Kelvin temperature
  tempK = Math.log(((10240000/volt) - 10000));
  tempK = 1 / (0.001129148 + (0.000234125 * tempK) + (0.0000000876741 * 
      tempK * tempK * tempK));

  // convert to Celsius and round to 1 decimal place
  tempC = tempK - 273.15;
  tempC = Math.round(tempC*10)/10;

  // get the Fahrenheit temperature, rounded
  tempF = (tempC * 1.8) + 32;
  tempF = Math.round(tempF*10)/10;

  // return all three temperature scales
  return {
    tempK: tempK,
    tempC: tempC,
    tempF: tempF
  };
}

});

