import {ref} from 'vue'
import {defineStore} from 'pinia'
import {hasWorkingStorage} from '@/composables/hasWorkingStorage'

export const useWeeksStore = defineStore('weeks', () => {

    let weeksValue = [];
    const useLocalStorage = hasWorkingStorage("localStorage");
    // check if browser supports localStorage
    if (useLocalStorage) {
        // load existing value from localStorage
        const localStorage = window.localStorage;
        const currentRawData = localStorage.getItem('d-an'); // syntax: [{},{}]

        // console.log(currentRawData)
        const currentWeeks = JSON.parse(currentRawData);
        if (currentWeeks.constructor === Array) {
            weeksValue = currentWeeks;
        }
    }
    const weeks = ref(weeksValue)

    function storeWeek(week) {
        if (isValidWeek(week)) {
            weeks.value.push(week)
            if (useLocalStorage) {
                localStorage.setItem('d-an', JSON.stringify(weeks.value));
            }
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
