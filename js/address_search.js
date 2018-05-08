$( document ).ready(function() { 

  document.getElementById("address_form").reset(); 

  $('#geocode').click(function(){
    geocode()
  }); 

  var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
  function geocode(){
    var address = document.getElementById("address").value;
    var address2 = document.getElementById("address2").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var postalcode = document.getElementById("zipcode").value;
    var url = "https://geocoder.cit.api.here.com/6.2/geocode.json?app_id=IXbsshdE6H3kF5HUBU0w&app_code=g6vDoodkOLaJqj36n0HgMw&searchtext="+address+','+address2+','+city+','+state+','+postalcode;
    $.ajax({
     url: url,
     async:true,
     type: 'GET',
     dataType: 'json',
     success: function(data) {
      address = data.Response.View[0].Result[0].Location.Address.Label
      lat = data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
      lng = data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
      var marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup(address)
      map.setView([lat, lng], 17);
      var url = "https://places.demo.api.here.com/places/v1/discover/search?at="+lat+"%2C"+lng+"&q=repair+shops&Accept-Language=en-US%2Cen%3Bq%3D0.5&app_id=IXbsshdE6H3kF5HUBU0w&app_code=g6vDoodkOLaJqj36n0HgMw"
      $.ajax({
       url: url,
       async:true,
       type: 'GET',
       dataType: 'json',
       success: function(data) {
        for (i = 0; i < data.results.items.length; i++) {
          title = data.results.items[i].title
          lat = data.results.items[i].position[0];
          lng = data.results.items[i].position[1];
          var marker = L.marker([lat, lng], {icon: greenIcon}).addTo(map);
          marker.bindPopup(title)
        } 
      },
      error: function(e) {
       console.log(e)
     }   
   });
    },
    error: function(e) {
     console.log(e)
   }   
 });
  }
});




