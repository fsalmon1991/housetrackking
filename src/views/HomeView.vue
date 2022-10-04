<template>
  <div class="flex flex-col h-screen max-h-screen">
    <!-- Search/Result-->
    <div
      class="z-20 flex justify-center relative bg-hero-pattern bg-cover px-4 pt-8 pb-32"
    >
      <!-- Search Input -->
      <div class="w-full max-w-screen-sm">
        <h1 class="text-white text-center text-3xl pb-4">Species Tracker</h1>
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
      <!-- Species Info-->
      <SpeciesInfo />
    </div>
    <!-- Map -->
    <div id="map" class="h-full z-10"></div>
  </div>
</template>

<script setup>
// @ is an alias to /src
import SpeciesInfo from "../components/SpeciesInfo.vue";
import { onMounted } from "vue";
import leaflet from "leaflet";

let map;
onMounted(() => {
  map = leaflet.map("map").setView([20.85788702677816, -78.97071006615306], 11);
  leaflet
    .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 13,
      minZoom: 11,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiZnNhbG1vbjE5OTEiLCJhIjoiY2w4dXRlemIyMDJtcDQwbnU0aG9ib3lobyJ9.8wpifPoqm2o9KCDLu6mmlQ",
    })
    .addTo(map);
});
</script>
