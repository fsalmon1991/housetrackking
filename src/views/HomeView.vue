<template>
  <div class="h-screen relative">
    <GeoErrorModal
      @closeGeoError="closeGeoError"
      v-if="geoError"
      :geoErrorMsg="geoErrorMsg"
    />
    <div id="map" class="h-full z-[1]"></div>
  </div>
</template>

<script setup>
// @ is an alias to /src
/* eslint-disable */
import { onMounted, ref } from "vue";
import leaflet from "leaflet";
import GeoErrorModal from "../components/GeoErrorModal.vue";

var mbAttr =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var mbUrl = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_API_KEY}`;
let map;
onMounted(() => {
  var streets = leaflet.tileLayer(mbUrl, {
    id: "mapbox/streets-v11",
    tileSize: 512,
    maxZoom: 18,
    minZoom: 10,
    zoomOffset: -1,
    attribution: mbAttr,
  });
  var osm = leaflet.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 18,
      minZoom: 10,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  );
  var satellite = leaflet.tileLayer(mbUrl, {
    attribution: mbAttr,
    maxZoom: 18,
    minZoom: 10,
    id: "mapbox/satellite-v9",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: process.env.VUE_APP_API_KEY,
  });
  map = leaflet.map("map", {
    center: [33.5039591, -112.2923307],
    zoom: 17,
    layers: osm,
  });
  var baseLayers = {
    "Open Street Map": osm,
    Streets: streets,
    Satellite: satellite,
  };
  leaflet.control.layers(baseLayers).addTo(map);

  getLocation();
});

const coords = ref(null);
const fetchcoord = ref(null);
const geoMarker = ref(null);
const geoError = ref(true);
const geoErrorMsg = ref("Testing");

const getLocation = () => {
  if (sessionStorage.getItem("coords")) {
    coords.value = JSON.parse(sessionStorage.getItem("coords"));
    plotGeolocation(coords.value);
    return;
  }
  fetchcoord.value = true;
  navigator.geolocation.getCurrentPosition(setCoords, getLocError);
};
const setCoords = (pos) => {
  // stop fetching coords
  fetchcoord.value = null;
  // set coord in session storage
  const setSessionCoords = {
    lat: pos.coords.latitude,
    lon: pos.coords.longitude,
  };
  sessionStorage.setItem("coords", JSON.stringify(setSessionCoords));
  //set coords value
  coords.value = setSessionCoords;

  // plot user location on leaflet map function
  plotGeolocation(coords.value);
};
const getLocError = (err) => {
  fetchcoord.value = null;
  geoError.value = true;
  geoErrorMsg = err.message;
};
const closeGeoError = () => {
  geoError.value = null;
  geoErrorMsg = null;
};

const plotGeolocation = (coords) => {
  // create custom marker
  const customMarker = leaflet.icon({
    iconUrl: require("../assets/location.svg"),
    iconSize: [35, 35],
  });
  // cretae new marker and costum marker
  geoMarker.value = leaflet
    .marker([coords.lat, coords.lon], { icon: customMarker })
    .addTo(map);
  // set map view current location
  map.setView([coords.lat, coords.lon], 11);
};
</script>
