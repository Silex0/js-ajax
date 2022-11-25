// Location for selection list

function updateData(){
  var xmlreq = new XMLHttpRequest();
xmlreq.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/",true);
xmlreq.send();

xmlreq.onreadystatechange=function() {

  if(xmlreq.readyState==4 && xmlreq.status==200){
    var data = xmlreq.responseXML;

    var name = data.getElementsByTagName("Name");
    var id = data.getElementsByTagName("ID");

    for (var i = 0; i < name.length; i++) {
      var element = document.createElement('option');
           element.text =  name[i].innerHTML;
           element.value = id[i].innerHTML;
           document.getElementById("v2").add(element);
    }
  }
}
}


function update(){

    var location = document.getElementById('v2').value;
    var schedule = "https://www.finnkino.fi/xml/Schedule/?area=";
    url = schedule + location;

  //Creating Variables

    var xmlreq = new XMLHttpRequest();
    xmlreq.open("GET", url , true);
    xmlreq.send();
    xmlreq.onreadystatechange=function() {
      if(xmlreq.readyState==4 && xmlreq.status==200){
        var data = xmlreq.responseXML;
        var movie = data.getElementsByTagName("Title");
        var picture = data.getElementsByTagName("EventSmallImagePortrait");
        var length = data.getElementsByTagName("LengthInMinutes");
        var genre = data.getElementsByTagName("Genres");
        var langueage = data.getElementsByTagName("PresentationMethodAndLanguage");
        var start = data.getElementsByTagName("dttmShowStart");

        // Using Variables for table

        var txt = "<table>";
        for(var i = 0; i < movie.length; i++) {
            txt += "<tr><td>" + movie [i].childNodes[0].nodeValue  + "<br>Kesto:("+ length[i].childNodes[0].nodeValue +" Minuuttia)<br>Esitys aika:<br>"+ start[i].childNodes[0].nodeValue  + "</td>"+
                   "<td>"    + "<img src="+ picture[i].childNodes[0].nodeValue + ">" +  "</td>" +
                   "<td>"   + langueage[i].childNodes[0].nodeValue  + "<br>" + genre[i].childNodes[0].nodeValue +  "</td></tr>";

        }
        txt += "</table>";

        document.getElementById("v1").innerHTML = txt;

  }
}
}
