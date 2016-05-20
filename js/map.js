'use strict';

//Render the map in the div
var renderMap = function () {

    try {
         $('#map-canvas').css('height', window.innerHeight + 'px');
        var map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: {lat: 38.6068867843944, lng: -90.28923873853023},
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        return map;
    }
    catch (err) {
        alert('Map cannot be loaded. Please try again');
    }
};

// Call the Locu Api and display the locations on the google Map.
// This call always executes after the map is loaded as it is called renderMap promise
var displayRestaurant = function (map) {
    return new Promise(function (resolve, reject) {
        if (map == undefined || map == null) {
            alert("Something is wrong with google Maps! Please try Again");
            reject('-1');
        }
        var url = 'http://api.locu.com/v1_0/venue/search/?locality=saint+louis&category=restaurant&api_key=b827df72109febb7e8fd45f4ce3baaac2861f692';
        $.ajax({
            url: url,
            type: "GET",
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function (data) {
                return resolve(processData(data, map));
            },
            error: function (err) {
                alert('err');
                return reject(err);
            }
        });
    });
};

var processData = function (data, map) {
    var len = data.objects.length;
    var restaurants = data.objects;
    if (len > 13) {
        len = 13;
    }
    var places = [];
    var markers = [];
    var placeDescriptionList = [];
    var mapContent = {};
    for (var i = 0; i < len; i++) {
        var lat = restaurants[i].lat;
        var long = restaurants[i].long;
        var myLatLng = {lat: lat, lng: long};
        var marker = new google.maps.Marker({
            position: myLatLng
        });
        var placeDetails = {};
        placeDetails.website_url = restaurants[i].website_url;
        placeDetails.phone = restaurants[i].phone;
        placeDetails.id = restaurants[i].id;
        placeDetails.name = restaurants[i].name;
        placeDetails.street_address = restaurants[i].street_address;
        placeDescriptionList.push(placeDetails);
        marker.setMap(map);
        markers.push(marker);
        places.push(restaurants[i].name);
    }
    mapContent.places = places;
    mapContent.markers = markers;
    mapContent.placeDescriptionList = placeDescriptionList;
    return mapContent;
};
