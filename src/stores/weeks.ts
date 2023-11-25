import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useWeeksStore = defineStore('weeks', () => {
    const weeks = ref([{}])

    function storeWeek(week) {
        weeks.value.push(week)
    }

    return {weeks, storeWeek}

})
