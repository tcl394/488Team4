$( document ).ready(function() {

  row = 6;

  var url = "http://localhost:3000/API/getRow"
  var data = {"n": row}
  var result;
  var successFunction = function(object){

    var propValue;
    for(var propName in object) {
    propValue = object[propName]

    console.log(propValue, propName);

    var str = JSON.stringify(object);
    var questionNum = str.slice(25, 26);
    var quest = str.slice(39);
    var question = quest.split("\"");

    document.getElementById("title6").innerHTML = questionNum;
    document.getElementById("paragraph6").innerHTML = question[0];
  }
}
$.getJSON(url, data, successFunction);


});
