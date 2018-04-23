$( document ).ready(function() {

  row3 = 3;

  var url = "http://localhost:3000/API/getRow"
  var data = {"n": row3}
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

    document.getElementById("title3").innerHTML = questionNum;
    document.getElementById("paragraph3").innerHTML = question[0];
  }
}
$.getJSON(url, data, successFunction);


});
