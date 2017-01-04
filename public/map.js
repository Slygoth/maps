var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: new google.maps.LatLng(18.0234382, -76.7841638),
        mapTypeId: 'terrain'
    });
    var script = document.createElement('script');
    script.src = "test.js"
    document.getElementsByTagName('head')[0].appendChild(script);
}

window.eqfeed_callback = function(results) {
  var infowindow = null;
    for (var i = 0; i < results.features.length; i++) {
        if (JSON.stringify(results.features[i].properties.LEAK_STATUS) === '"exi"') {
          //adding the marker from json
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1], coords[0]);
          var marker = new google.maps.Marker({
              position: latLng,
              map: map,
          });
          var contentString = '<div id="iw-container">' +
                  '<div class="iw-content">' +
                    '<div class="iw-subTitle">Location</div>' +
                    results.features[i].properties.LOCAT_DESC +
                    '<div class="iw-subTitle">Code</div>' +
                    results.features[i].properties.CODE +
                  '</div>' +
                  '<div class="iw-bottom-gradient"></div>' +
                '</div>';
          infowindow = new google.maps.InfoWindow({
              content: contentString
          });
            marker.addListener('click', function() {
                // infowindow.setContent(this.html);
                infowindow.open(map, this);
            });
        }
    }
}
