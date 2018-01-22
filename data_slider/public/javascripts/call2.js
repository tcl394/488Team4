$( document ).ready(function() {

  row2 = 2;

  var url = "http://localhost:3000/API/getRow"
  var data = {"n": row2}
  var result;
  var successFunction = function(object){

    var propValue;
    for(var propName in object) {
    propValue = object[propName]

    console.log(propValue, propName);

    var str = JSON.stringify(object);
    var questionNum1 = str.slice(25, 26);
    var quest = str.slice(39);
    var question = quest.split("\"");

    document.getElementById("2").innerHTML = questionNum1;
    document.getElementById("p2").innerHTML = question[0];
  }
}
$.getJSON(url, data, successFunction);


});
