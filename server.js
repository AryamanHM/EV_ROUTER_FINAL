/**
 * Calculates and displays a EV route from 
 * defined points in India.
 * A full list of available request parameters can be found in the Routing API documentation.
 * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-calculate-route.html
 * @param {H.service.Platform} platform A stub class to access HERE services
 */
//const fs = require('fs');
var distanceString,durationString,chargingDurationString,stopsString;
function calculateRouteFromAtoB(platform, origin, destination, initialCharge) {
  var router = platform.getRoutingService(null, 8),
      routeRequestParams = {
      'transportMode': 'car',
     'origin':'12.9767936,77.590082', //bangalore
      //'origin': origin,
     'destination': '28.6273928,77.1716954', //delhi
      //'destination': destination,
      'return': 'polyline,turnByTurnActions,actions,instructions,travelSummary', 
      'ev[freeFlowSpeedTable]':'0,0.239,27,0.239,45,0.259,60,0.196,75,0.207,90,0.238,100,0.26,110,0.296,120,0.337,130,0.351,250,0.351',
      'ev[trafficSpeedTable]':'0,0.349,27,0.319,45,0.329,60,0.266,75,0.287,90,0.318,100,0.33,110,0.335,120,0.35,130,0.36,250,0.36',
      'ev[auxiliaryConsumption]':'1.8',
      'ev[ascent]':'9',
      'ev[descent]':'4.3',
      'ev[initialCharge]':initialCharge,
      'ev[maxCharge]':'99',
      'ev[chargingCurve]':'0,239,32,199,56,167,60,130,64,111,68,83,72,55,76,33,78,17,80,1',
      'ev[maxChargingVoltage]':'400',
      'ev[maxChargeAfterChargingStation]':'80',
      'ev[minChargeAtChargingStation]':'8',
      'ev[minChargeAtDestination]':'8',
      'ev[chargingSetupDuration]':'300',
      'ev[makeReachable]':'true',
      'ev[connectorTypes]':'iec62196Type1Combo,iec62196Type2Combo,Chademo,Tesla'
      };

  router.calculateRoute(
    routeRequestParams,
    onSuccess,
    onError
  );
}
const destinations= [
  {
      id: 0,
      value: "delhi",
      name: "Delhi, India",
      position: "28.679079,77.069710",
      mapZoom: 7,
      mapCenter: {lat:28.679079, lng:77.069710} 
  },
  {
      id: 1,
      value: "mumbai",
      name: "Mumbai, Maharashtra, India",
      position: "19.076090,72.877426",
      mapZoom: 7,
      mapCenter: {lat:19.076090, lng:72.877426}
  },
  {
      id: 2,
      value: "kanpur",
      name: "Kanpur, Uttar Pradesh, India",
      position: "26.449923,80.331871",
      mapZoom: 7,
      mapCenter: {lat:35.633862, lng:-117.679367}
  },
  {
      id: 3,
      value: "chennai",
      name: "Chennai, Tamil Nadu",
      position: "13.074737,80.267689",
      mapZoom: 8,
      mapCenter: {lat:33.953350, lng:-117.396156} 
  },
  {
      id: 4,
      value: "bangalore",
      name: "Bangalore, Karnataka",
      position: "12.97708,77.596173",
      mapZoom: 8,
      mapCenter: {lat:12.97708, lng:77.596173} 
  },
  {
      id: 5,
      value: "hyderabad",
      name: "Hyderabad, Andhra Pradesh",
      position: "17.399667,78.488244",
      mapZoom: 6,
      mapCenter: {lat:17.399667, lng:78.488244} 
  },
  {
      id: 6,
      value: "patna",
      name: "Patna, Bihar",
      position: "25.603125,85.119195",
      mapZoom: 7,
      mapCenter: {lat:25.603125, lng:85.119195} 
  },
  {
      id: 7,
      value: "goa",
      name: "South Goa",
      position: "15.304936,73.959411",
      mapZoom: 8,
      mapCenter: {lat:15.304936, lng:73.959411} 
  },
  {
      id: 8,
      value: "kolkata",
      name: "Kolkata, West Bengal",
      position: "22.548783,88.39894",
      mapZoom: 7,
      mapCenter: {lat:22.548783, lng:88.39894} 
  },
  {
      id: 9,
      value: "pondicherry",
      name: "Pondicherry,Pondicherry",
      position: "11.935363,79.83229",
      mapZoom: 7,
      mapCenter: {lat:11.935363, lng:79.83229} 
  },
  {
      id: 10,
      value: "pune",
      name: "Pune,Maharashtra",
      position: "18.525994,73.862602",
      mapZoom: 7,
      mapCenter: {lat:18.525994, lng:73.862602} 
  },
  {
    id: 11,
    value: "lucknow",
    name: "Lucknow, India",
    position: "26.83323,80.943614",
    mapZoom: 7,
    mapCenter: {lat:26.83323, lng:80.943614} 
}]
/*
]
const origins = [
  {
      id: 0,
      value: "delhi",
      name: "Delhi, India",
      position: "28.679079,77.069710",
      mapZoom: 7,
      mapCenter: {lat:35.633862, lng:-117.679367} 
  },
  {
      id: 1,
      value: "mumbai",
      name: "Mumbai, Maharashtra, India",
      position: "19.076090,72.877426",
      mapZoom: 7,
      mapCenter: {lat:35.633862, lng:-117.679367}
  },
  {
      id: 2,
      value: "kanpur",
      name: "Kanpur, Uttar Pradesh, India",
      position: "26.449923,80.331871",
      mapZoom: 7,
      mapCenter: {lat:35.633862, lng:-117.679367}
  },
  {
      id: 3,
      value: "chennai",
      name: "Chennai, Tamil Nadu",
      position: "13.074737,80.267689",
      mapZoom: 8,
      mapCenter: {lat:33.953350, lng:-117.396156} 
  },
  {
      id: 4,
      value: "bangalore",
      name: "Bangalore, Karnataka",
      position: "12.97708,77.596173",
      mapZoom: 8,
      mapCenter: {lat:35.633862, lng:-117.679367} 
  },
  {
      id: 5,
      value: "hyderabad",
      name: "Hyderabad, Andhra Pradesh",
      position: "17.399667,78.488244",
      mapZoom: 6,
      mapCenter: {lat:38.575764, lng:-121.478851} 
  },
  {
      id: 6,
      value: "patna",
      name: "Patna, Bihar",
      position: "25.603125,85.119195",
      mapZoom: 7,
      mapCenter: {lat:36.114647, lng:-115.172813} 
  },
  {
      id: 7,
      value: "goa",
      name: "South Goa",
      position: "15.304936,73.959411",
      mapZoom: 8,
      mapCenter: {lat:35.393528, lng:-119.043732} 
  },
  {
      id: 8,
      value: "kolkata",
      name: "Kolkata, West Bengal",
      position: "22.548783,88.39894",
      mapZoom: 7,
      mapCenter: {lat:35.633862, lng:-117.679367} 
  },
  {
      id: 9,
      value: "pondicherry",
      name: "Pondicherry,Pondicherry",
      position: "11.935363,79.83229",
      mapZoom: 7,
      mapCenter: {lat:33.720577, lng:-116.215561} 
  },
  {
      id: 10,
      value: "pune",
      name: "Pune,Maharashtra",
      position: "18.525994,73.862602",
      mapZoom: 7,
      mapCenter: {lat:37.661388, lng:-120.994446} 
  },
  {
    id: 11,
    value: "lucknow",
    name: "Lucknow, India",
    position: "26.83323,80.943614",
    mapZoom: 7,
    mapCenter: {lat:35.633862, lng:-117.679367} 
}

]
*/


/**
 * This function will be called once the Routing REST API provides a response
 * @param {Object} result A JSONP object representing the calculated route
 *
 * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-type-calculate-route.html
 */
function onSuccess(result) {
  routeInstructionsContainer.innerHTML = '';
  if (result.routes.length > 0){
    var route = result.routes[0];
    console.log(route);

  /*
   * The styling of the route response on the map is entirely under the developer's control.
   * A representative styling can be found the full JS + HTML code of this example
   * in the functions below:
   */
  
    addRouteShapeToMap(route);
    addManueversToMap(route);
    addSummaryToPanel(route);
    addWaypointsToPanel(route);
    addManueversToPanel(route);
  }else{
    routeInstructionsContainer.innerHTML = "<p style='color:red'>" + result.notices[0].title + "</p>";
  }
  
}

/**
 * This function will be called if a communication error occurs during the JSON-P request
 * @param {Object} error The error message received.
 */
function onError(error) {
  alert('Can\'t reach the remote server');
  routeInstructionsContainer.innerHTML = "<p style='color:red'>" + "Can\'t reach the remote server" + "</p>";

}

/**
 * Boilerplate map initialization code starts below:
 */

// set up containers for the map + panel
var mapContainer = document.getElementById('map'),
  routeInstructionsContainer = document.getElementById('directionPanel'),
  directionTitleContainer = document.getElementById('directionTitle');


var destinationIndex = 0;
var initialChargeIndex = 0;
var carTypeIndex = 0;


// Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: 'Yqto0OWdVQ1lN4JyZSUwbyw5gH_EpEWlflfn_-Oe3lI'
});

var defaultLayers = platform.createDefaultLayers();

// Step 2: initialize a map - this map is centered over Ridgecrest
var map = new H.Map(mapContainer,
  defaultLayers.raster.terrain.map,{
  center: {lat:20.5937, lng:78.9629}, //lucknow 26.83323,80.943614
  zoom: 5,
  pixelRatio: window.devicePixelRatio || 1
});

// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Hold a reference to any infobubble opened
var bubble;

/**
 * Opens/Closes a infobubble
 * @param {H.geo.Point} position The location on the map.
 * @param {String} text          The contents of the infobubble.
 */
function openBubble(position, text) {
  if (!bubble) {
    bubble = new H.ui.InfoBubble(
      position,
      // The FO property holds the province name.
      {content: text});
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
}

/**
 * Creates a H.map.Polyline from the shape of the route and adds it to the map.
 * @param {Object} route A route as received from the H.service.RoutingService
 */
function addRouteShapeToMap(route) {  
  route.sections.forEach((section) => {
    // decode LineString from the flexible polyline
    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

    // Create a polyline to display the route:
    let polyline = new H.map.Polyline(linestring, {
      style: {
        lineWidth: 4,
        strokeColor: '#00AFAA'//'rgba(0, 128, 255, 0.7)'
      }
    });
    // Add the polyline to the map
    map.addObject(polyline);
  });
}

/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route A route as received from the H.service.RoutingService
 */
function addManueversToMap(route) {
  var svgEVMarkup = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#004744" class="bi bi-ev-station-fill" viewBox="0 0 16 16"><path d="M1 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1 2 2v.5a.5.5 0 0 0 1 0V9c0-.258-.104-.377-.357-.635l-.007-.008C13.379 8.096 13 7.71 13 7V4a.5.5 0 0 1 .146-.354l.5-.5a.5.5 0 0 1 .708 0l.5.5A.5.5 0 0 1 15 4v8.5a1.5 1.5 0 1 1-3 0V12a1 1 0 0 0-1-1v4h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V2Zm2 .5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5Zm2.631 9.96H4.14v-.893h1.403v-.505H4.14v-.855h1.49v-.54H3.485V13h2.146v-.54Zm1.316.54h.794l1.106-3.333h-.733l-.74 2.615h-.031l-.747-2.615h-.764L6.947 13Z"/></svg>',
  dotMarkup = '<svg width="18" height="18" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<circle cx="8" cy="8" r="8" ' +
    'fill="#004744" stroke="white" stroke-width="1" />' +
  '</svg>',
    dotIcon = new H.map.Icon(dotMarkup, {anchor: {x:8, y:8}}),
    EVIcon = new H.map.Icon(svgEVMarkup, {anchor: {x:8, y:8}}),
    group = new H.map.Group(),
    i,
    j;
  //adding departing marker
    var dotMarker = new H.map.Marker({
      lat: 12.9767936,
      lng: 77.590082},
      {icon: dotIcon});
      dotMarker.instruction = "Departing from Start Location";
      group.addObject(dotMarker);

  route.sections.forEach((section, index, theArray) => {
    let poly = H.geo.LineString.fromFlexiblePolyline(section.polyline).getLatLngAltArray();

    let actions = section.actions;
    
    let action = actions[actions.length-1];
      var EVMarker = new H.map.Marker({
        lat: poly[action.offset * 3],
        lng: poly[action.offset * 3 + 1]},
        {icon: EVIcon});
        var dotMarker = new H.map.Marker({
          lat: poly[action.offset * 3],
          lng: poly[action.offset * 3 + 1]},
          {icon: dotIcon});
    if (index < theArray.length -1 && index >-1){
    
      EVMarker.instruction = section.postActions[1].action + " " 
      + "Arrival Charge: " + section.postActions[1].arrivalCharge + "% " 
      + "Consumable Power: " + section.postActions[1].consumablePower + " " 
      + "Duration: " + toMMSS(section.postActions[1].duration) + " " 
      + "Target Charge: " + section.postActions[1].targetCharge + "% ";
      group.addObject(EVMarker);
      
    }else{
      dotMarker.instruction = action.instruction;
      group.addObject(dotMarker);
    }
    

    group.addEventListener('tap', function (evt) {
      map.setCenter(evt.target.getGeometry());
      openBubble(evt.target.getGeometry(), evt.target.instruction);
    }, false);

    // Add the maneuvers group to the map
    map.addObject(group);
  });
}

/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route A route as received from the H.service.RoutingService
 */
function addWaypointsToPanel(route) {
  var nodeH3 = document.createElement('h3'),
    labels = [];

  route.sections.forEach((section) => {
    if (section.index < section.length)labels.push(
      section.turnByTurnActions[0].nextRoad.name[0].value);
    if (section.index > 0) labels.push(
      section.turnByTurnActions[section.turnByTurnActions.length - 1].currentRoad.name[0].value);
  });

  nodeH3.textContent = labels.join(' - ');

  var directionSubtitle = document.createElement('p');
  directionSubtitle.innerHTML= "<h3>Charging Stops:</h3>";
  routeInstructionsContainer.appendChild(directionSubtitle);

  routeInstructionsContainer.appendChild(nodeH3);
}

function clearMap(){
  routeInstructionsContainer.innerHTML = '';
  map.removeObjects(map.getObjects())
}

function createUIforDropdown() {
  
  var subTitle = document.createElement('p');
  subTitle.innerHTML= "<p>This window calculates the EV route</b>";
  directionTitleContainer.appendChild(subTitle);

  var destinationDropdown = document.createElement("SELECT");
  destinationDropdown.setAttribute("id", "destinationDropDown");
  directionTitleContainer.appendChild(destinationDropdown);

  for (var i = 0; i < destinations.length; i++) {
    var option = document.createElement("option");
    option.value = destinations[i].value;
    option.text = destinations[i].name;
    document.getElementById("destinationDropDown").appendChild(option);
  }

  var space = document.createElement('p');
  directionTitleContainer.appendChild(space);

  var initialChargeP = document.createElement('label');
  initialChargeP.innerHTML= "Initial EV battery level (%): ";
  directionTitleContainer.appendChild(initialChargeP);

  var evInitialCharge = document.createElement("SELECT");
  evInitialCharge.setAttribute("id", "evInitialCharge");
  directionTitleContainer.appendChild(evInitialCharge);

  var space2 = document.createElement('p');
  directionTitleContainer.appendChild(space2);
  
  for (var i = 10; i < 11; i++){
    var option = document.createElement("option");
    option.value = i;
    option.text = i*10;
    document.getElementById("evInitialCharge").appendChild(option);
  }

  function eventDestination(){
    clearMap();
    destinationIndex = this.selectedIndex;
    map.setCenter(destinations[this.selectedIndex].mapCenter);
    map.setZoom(destinations[this.selectedIndex].mapZoom);
    calculateRouteFromAtoB(platform, "12.9716,77.5946", destinations[destinationIndex].position, (initialChargeIndex+5)*10);
  }

  function eventEvInitialCharge(){
    clearMap();
    initialChargeIndex = this.selectedIndex;
    calculateRouteFromAtoB(platform, "12.9716,77.5946", destinations[destinationIndex].position, (initialChargeIndex+5)*10);
  }
  
  document.getElementById("destinationDropDown").onchange = eventDestination;
  document.getElementById("evInitialCharge").onchange = eventEvInitialCharge;
  
}
//const fs = require('fs');
/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route A route as received from the H.service.RoutingService
 */
function addSummaryToPanel(route) {
  var directionSubtitle = document.createElement('p');
  directionSubtitle.innerHTML= "<h3>Summary:</h3>";
  routeInstructionsContainer.appendChild(directionSubtitle);


  let duration = 0,
  chargingDuration = 0,
    distance = 0,stops=0;

  route.sections.forEach((section, index, theArray) => {
    distance += section.travelSummary.length;
    duration += section.travelSummary.duration;
    //adding charging time 
    if (index < theArray.length -1) {
      chargingDuration += section.postActions[0].duration + section.postActions[1].duration;
      duration += section.postActions[0].duration + section.postActions[1].duration;
    stops+=1}
  });

  var summaryDiv = document.createElement('div'),
    content = '<b>Total distance</b>: ' + (distance/1000).toFixed(2) + ' km. <br />' +
    '<b>Charging Time</b>: ' + toHHMMSS(chargingDuration) + '<br />' +
      '<b>Travel Time</b>: ' + toHHMMSS(duration) + ' (in current traffic)'+stops;
      
  distanceString = (distance).toFixed(2).toString();
  durationString = duration.toString();
  chargingDurationString = chargingDuration.toString();
  stopsString = stops.toString();
  console.log(distanceString+' '+durationString+' '+chargingDurationString+' '+stopsString)
  summaryDiv.style.fontSize = 'small';
  summaryDiv.style.marginLeft = '5%';
  summaryDiv.style.marginRight = '5%';
  summaryDiv.innerHTML = content;
  routeInstructionsContainer.appendChild(summaryDiv);
  summaryDiv.setAttribute('id', 'myinfo');
  
  
}

/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route A route as received from the H.service.RoutingService
 */
function addManueversToPanel(route) {
  var nodeOL = document.createElement('ol');

  nodeOL.style.fontSize = 'small';
  nodeOL.style.marginLeft ='5%';
  nodeOL.style.marginRight ='5%';
  nodeOL.className = 'directions';

  route.sections.forEach((section, sid, theSArray) => {
    section.actions.forEach((action, idx, theArray) => {
      var li = document.createElement('li'),
        spanArrow = document.createElement('span'),
        spanInstruction = document.createElement('span');

      //removing turn-by-turn driving directions
      spanArrow.className = 'arrow ' + (action.direction || '') + action.action;
      spanInstruction.innerHTML = section.actions[idx].instruction;
      li.appendChild(spanArrow);
      li.appendChild(spanInstruction);

      nodeOL.appendChild(li);

      //charging stops details
      if (idx == theArray.length-1 && sid < theSArray.length - 1) {
        spanInstruction.innerHTML = "<b>Location:</b> " + section.arrival.place.name + ". <br>";
        spanArrow.className = 'arrow ' + section.postActions[1].action;
        spanInstruction.innerHTML += "<b>Details:</b> " + " " 
      + "Arrival Charge: " + (section.postActions[1].arrivalCharge).toFixed(1) + "%, " 
      + "Consumable Power: " + section.postActions[1].consumablePower + ", " 
      + "Duration: " + toMMSS(section.postActions[1].duration) + ", " 
      + "Target Charge: " + section.postActions[1].targetCharge + "%, ";
      li.appendChild(spanArrow);
      li.appendChild(spanInstruction);

      nodeOL.appendChild(li);
      }      
    });
  });

  routeInstructionsContainer.appendChild(nodeOL);
}

function toMMSS(duration) {
  return Math.floor(duration / 60) + ' minutes ' + (duration % 60) + ' seconds.';
}

function toHHMMSS(duration) {
  return Math.floor(duration / 3600) + ' hours ' + Math.floor(duration % 3600 /60) + ' minutes ' + (duration % 60) + ' seconds.';
}


calculateRouteFromAtoB(platform, "12.97708,77.596173", "12.9352,77.6245", 50);
createUIforDropdown();
/*
const fs = require('fs');
fs.appendFile('data.csv', `${distanceString}, ${durationString}, ${chargingDurationString}, ${stopsString}\n`, (err) => {
  if (err) throw err;
  console.log('Data appended to data.csv');
});
*/
