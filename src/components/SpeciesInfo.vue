<template>
  <div
    class="leaflet-control-dialog leaflet-control flex flex-col lg:flex-row rounded px-4 pt-8 pb-32 relative"
    style="width: 500px; height: 700px; top: 200px; left: 300px"
  >
    <div
      class="mt-4 -mb-3"
      style="width: 500px; height: 700px; top: 200px; left: 300px"
    >
      <div
        class="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25"
        style="margin-right: 0px"
      >
        <div
          class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
          style="background-position: 10px 10px"
        ></div>
        <div class="relative rounded-xl overflow-auto">
          <div
            class="mx-4 bg-white shadow-xl p-8 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
          >
            <div class="float-right ml-6">
              <div
                class="relative aspect-w-4 aspect-h-5 sm:aspect-w-16 sm:aspect-h-9 w-20 sm:w-44"
              >
                <img class="object-cover rounded-lg" :src="foto" />
                <div
                  class="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg"
                ></div>
              </div>
            </div>
            <p class="text-justify text-base">{{ info }}</p>
          </div>
        </div>
        <div
          class="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
var info =
  "Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.";
var foto =
  "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=320&amp;q=80";
</script>

<style>
.chat-notification-logo {
  height: 15rem;
  width: 12rem;
}
</style>
