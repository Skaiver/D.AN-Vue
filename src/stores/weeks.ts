import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useWeeksStore = defineStore('weeks', () => {
    const weeks = ref([])

    function storeWeek(week) {
        if (isValidWeek(week)) {
            weeks.value.push(week)
        } else {
            throw new Error('Cannot store invalid week')
        }
    }

    function isValidWeek(week: Object): boolean {
        let isWeekValid = true;
        const requiredWeekProperties = ['date', 'name', 'year', 'content', 'department']
        requiredWeekProperties.forEach((key) => {
            if (!(Object.prototype.hasOwnProperty.call(week, key))) {
                isWeekValid = false;
            }

            if (key === 'date') {
                // check if both start and end are present
                const cond =
                    Object.prototype.hasOwnProperty.call(week, "date")
                    && Object.prototype.hasOwnProperty.call(week.date, "start")
                    && Object.prototype.hasOwnProperty.call(week.date, "end")
                if (!(cond)) {
                    isWeekValid = false;
                }
            }
        })
        return isWeekValid;
    }

    return {weeks, storeWeek}

})
