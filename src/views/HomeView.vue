<template>
  <div class="h-screen relative">
    <GeoErrorModal
      @closeGeoError="closeGeoError"
      v-if="geoError"
      :geoErrorMsg="geoErrorMsg"
    />
    <MapFeature
      @getLocation="getLocation"
      @plotResult="plotResult"
      @toggleSearchResults="toggleSearchResults"
      @removeResult="removeResult"
      :coords="coords"
      :fetchcoord="fetchcoord"
      :searchResults="searchResults"
    />
    <div id="map" class="h-full z-[1]"></div>
  </div>
</template>

<script setup>
// @ is an alias to /src
/* eslint-disable */
import { onMounted, ref, onUpdated } from "vue";
import leaflet from "leaflet";
import GeoErrorModal from "../components/GeoErrorModal.vue";
import MapFeature from "../components/MapFeature.vue";

let map;
onMounted(() => {
  // init map
  map = leaflet
    .map("map", {
      zoomControl: false,
    })
    .setView([33.4484, -112.074], 10);
  // add tile layers
  leaflet
    .tileLayer(
      `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_API_KEY}`,
      {
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.VUE_APP_API_KEY,
      }
    )
    .addTo(map);
  map.on("moveend", () => {
    closeSearchResult();
  });
  map.on("zoomend", () => {
    var geo = map.getCenter();
    console.log(map.getZoom());
    if (map.getZoom() > 14) {
      if (resultMarker.value) {
        map.removeLayer(resultMarker.value);
      }
      // create custom marker
      const resultMarkerIcon = leaflet.icon({
        iconUrl: require("../assets/location-2.svg"),
        iconSize: [35, 35],
      });
      // cretae new marker and costum marker
      resultMarker.value = leaflet
        .marker([coords.coordinates[1], coords.coordinates[0]], {
          icon: resultMarkerIcon,
        })
        .addTo(map);
      // set map view current location
      //const latlng = map.latLng(coords.coordinates[1], coords.coordinates[0]);
      map.setView(
        [coords.coordinates[1], coords.coordinates[0]],
        map.getZoom()
      );
    }
  });
  getLocation();
});

const coords = ref(null);
const fetchcoord = ref(null);
const geoMarker = ref(null);
const geoError = ref(null);
const geoErrorMsg = ref("Testing");
const resultMarker = ref(null);
const searchResults = ref(null);

const getLocation = () => {
  if (coords.value) {
    coords.value = null;
    sessionStorage.removeItem("coords");
    map.removeLayer(geoMarker.value);
    return;
  }
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
  //const latlng = map.latLng(coords.lat, coords.lon);
  map.setView([coords.lat, coords.lon], 14);
};
const plotResult = (coords) => {
  if (resultMarker.value) {
    map.removeLayer(resultMarker.value);
  }
  // create custom marker
  const resultMarkerIcon = leaflet.icon({
    iconUrl: require("../assets/location-2.svg"),
    iconSize: [35, 35],
  });
  // cretae new marker and costum marker
  resultMarker.value = leaflet
    .marker([coords.coordinates[1], coords.coordinates[0]], {
      icon: resultMarkerIcon,
    })
    .addTo(map);
  // set map view current location
  //const latlng = map.latLng(coords.coordinates[1], coords.coordinates[0]);
  map.setView([coords.coordinates[1], coords.coordinates[0]], 14);
  closeSearchResult();
};
const toggleSearchResults = () => {
  searchResults.value = !searchResults.value;
};
const closeSearchResult = () => {
  searchResults.value = null;
};
const removeResult = () => {
  map.removeLayer(resultMarker.value);
};
</script>
