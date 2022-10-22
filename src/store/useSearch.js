import {defineStore} from "pinia"

export const useSearchStore = defineStore("main",{
    state: () => ({
        listspecies: ["a","b","c"],
        sciencename : "",
        locations : [],
        extinsion : false,
        info: "",
        picture: ""


    }),
    actions: {
        

    }

})