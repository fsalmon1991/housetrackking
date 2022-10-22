<template>
  <div class="flex flex-col h-screen max-h-screen">
    <!-- Search/Result-->
    <div
      class="z-20 flex justify-center relative bg-hero-pattern bg-cover px-4 pt-8 pb-32"
    >
      <!-- Search Input -->
      <div class="w-full max-w-screen-sm">
        <h1 class="text-white text-center text-3xl pb-4">
          Gardens of the Queens Species Tracker
        </h1>
        <div class="flex">
          <input
            class="flex-1 py-3 px-2 rounded-tl-md rounded-bl-md focus:outline-none"
            type="text"
            placeholder="Search for species in the Gardens of the Queen National Park Area"
          />
          <i
            class="cursor-pointer bg-black text-white px-4 rounded-tr-md rounded-br-md flex items-center fas fa-solid fa-chevron-right"
          ></i>
        </div>
      </div>
      <!-- Location Info-->
      <LocationInfo />
    </div>

    <!-- Map -->
    <div id="map" class="h-full relative z-10">
      <!-- Species Info-->
      <SpeciesInfo />
    </div>
  </div>
</template>

<script setup>
// @ is an alias to /src
import LocationInfo from "../components/LocationInfo.vue";
import { onMounted } from "vue";
import leaflet from "leaflet";
import SpeciesInfo from "@/components/SpeciesInfo.vue";

var mbAttr =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var mbUrl =
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

onMounted(() => {
  var streets = leaflet.tileLayer(mbUrl, {
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    attribution: mbAttr,
  });
  var osm = leaflet.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 13,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  );
  var satellite = leaflet.tileLayer(mbUrl, {
    attribution: mbAttr,
    maxZoom: 13,
    minZoom: 10,
    id: "mapbox/satellite-v9",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiZnNhbG1vbjE5OTEiLCJhIjoiY2w4dXRlemIyMDJtcDQwbnU0aG9ib3lobyJ9.8wpifPoqm2o9KCDLu6mmlQ",
  });
  var map = leaflet.map("map", {
    center: [20.85788702677816, -78.97071006615306],
    zoom: 10,
    layers: osm,
  });
  var baseLayers = {
    "Open Street Map": osm,
    Streets: streets,
    Satellite: satellite,
  };
  leaflet.control.layers(baseLayers).addTo(map);
  leaflet.control
    .dialog()
    .setContent("<p>Hello! Welcome to your nice new dialog box!</p>")
    .addTo(map);
});
</script>
