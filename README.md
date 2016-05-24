Neighbourhood Map
========================

###Summary###
  This web app provides user with ability to search for the city and get the restaurant information in its neighborhood. This app is developed using Knockout.js, HTML5 and TwitterBootstrap. It employs concept of OOJS, built upon MVVM framework of Knockout and features its Observables and two-way binding using ViewModel 

----------

### Project Setup###

 - Copy the repo in your system and double click on index.html.
 -  You can check the Live Demo [here](http://github.com/sksingh-usu/neighborhood-map)

### Navigation###

1. Home page contains the map of Saint Louis and it's popular restaurant fetched using Locu API. 
2. The top bar contains the current temperature of the Saint Louis city fetched from api.openweathermap.org
3. On the left panel you will see a list of the restaurants. It also has a search bar on top of it where you can search for the restaurants and it will filter based on your search term. 
4. Once you start typing, it will filter the restaurant based on the input in the search box in real time and also updates the markers in the map.
4. Clicking on any restaurant will pop up the info window in the map which will show the address, phone number and website of the restaurant.


----------

### Architecture###
This app employs MVVM model of knockout. js. MVVM stands for Model-View-ViewModel. In this app it is achieved as can be explained using observables which allows two-way binding between view and model-view.
The data is bind in the view using **data-bind** property of KO.

####View####
##### Index.html#####
This is the initial html files which gets loaded to the browser. It is the home page of the app. It loads the app.js which binds the MapViewModel() to this index.html.

####Model-View####
#####app.js#####
This contains the view-model of the app and calls services to the openweather to fetch the temperature and also the places using the locu api. It renders the map and also loads the restaurant data in the list.

####Service####
I have used JavaScript's promises to handle async calls. $.ajax is used to make calls to external api and the results is stored in the promise. Once promise is resolved then next call is executed. In this app once the renderMap is resolved then only displayRestaurant() is called to talk to Locu api fetching and displaying restaurant. This is also used to handle the errors in case of any network or third Party API call failure.

###Resource###
1.	Locu Api : https://dev.locu.com/documentation/v1/
2.	Open Weather API: http://openweathermap.org/api
3.	Google Map API: https://developers.google.com/maps/documentation/javascript/
4.	Knockout Tutorial: http://learn.knockoutjs.com/
5.	Javascript Promises: https://dev.locu.com/documentation/v1/

