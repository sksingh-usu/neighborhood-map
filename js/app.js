"use strict";
function MapViewModel() {
    // Variable Initialization
    var self = this;
    self.placeNames = ko.observableArray([]);
    self.markers = [];
    self.placeDescriptionList = [];
    self.currentBounceIndex = -1;
    self.currentInfoWindow = null;
    self.query = ko.observable("");
    self.temperature = ko.observable("Unavailable");


    // Displaying Map in Canvas
    var map = renderMap();
    // Displaying Restaurant using google place APIs and getting the marker and place Description List
    displayRestaurant(map).then(function (response) {
        $('#restaurantList').css('height', window.innerHeight - 50 + 'px');
        self.pushData(response);
    }, function (error) {
        alert('Error Displaying Restaurant. Please try again.');
    });

    // Pushing data in observable properties
    self.pushData = function (response) {
        if (response != null || response != undefined)
            var placesList = response.places;
        var placeDescriptionList = response.placeDescriptionList;
        var markerList = response.markers;
        for (var i = 0; i < placesList.length; i++) {
            self.placeNames.push(placesList[i]);
            self.markers.push(markerList[i]);
            self.placeDescriptionList.push(placeDescriptionList[i]);
        }
    };

    // OnClick Event Handler for Restaurant List
    self.onClickRestaurant = function () {
        var placeName = this;
        var index = self.placeNames.indexOf(placeName);
        self.animateMarker(index);
        self.displayInfoWindow(index);
    };

    self.displayInfoWindow = function (index) {
        var content = "No Data Found";
        var infowindow = new google.maps.InfoWindow();
        if (index != -1) {
            var marker = self.markers[index];
            if (self.currentInfoWindow != null)
                self.currentInfoWindow.close();
            var placeDetails = self.placeDescriptionList[index];
            content = "<div><b> Website: <a href='" + placeDetails.website_url + ' \'>' + placeDetails.website_url + '</a> <br> Address: ' + placeDetails.street_address + '<br> Phone: ' + placeDetails.phone + "</b> </div>";
        }
        infowindow.setContent(content);
        self.currentInfoWindow = infowindow;
        infowindow.open(map, marker);
    };

    // Setting marker Animation
    self.animateMarker = function (index) {
        if (index != -1) {
            if (self.currentBounceIndex != -1) {
                self.markers[self.currentBounceIndex].setAnimation(null);
            }
            self.currentBounceIndex = index;
            self.markers[index].setAnimation(google.maps.Animation.BOUNCE);
        }
    };

    // Filtering
    self.filter = function (data, event) {
        var filter = self.query().toLowerCase();
        self.placeNames.splice(0, self.placeNames().length);
        for (var i = 0; i < self.placeDescriptionList.length; i++) {
            if (self.placeDescriptionList[i].name.toLowerCase().indexOf(filter) != -1) {
                self.placeNames.push(self.placeDescriptionList[i].name);
                self.markers[i].setMap(map);
            } else {
                self.markers[i].setMap(null);
            }
        }
    };

    self.getTemperature = function () {
        console.log('ca');
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=saintluis,mo&appid=bc7fdd8d57dee9e264567551c7ff0a18';
        $.getJSON(url, function (data) {
            self.temperature(Math.round(data.main.temp) - 273);
        }).fail(function() {
            console.log('Weather not available.');
            //Doing nothing as this has fall back property 'unavailable' and to prevent multiple alert boxes.
        });
    };
    self.getTemperature();
}

ko.applyBindings(new MapViewModel());

