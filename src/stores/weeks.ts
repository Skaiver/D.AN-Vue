import { ref } from 'vue'
import { defineStore } from 'pinia'
import { hasWorkingStorage } from '@/composables/hasWorkingStorage'
import type WeekInterface from '@/components/interfaces/WeekInterface'

export const useWeeksStore = defineStore('weeks', () => {
  const useLocalStorage = hasWorkingStorage('localStorage')

  // check if browser supports localStorage
  if (useLocalStorage) {
    // load existing value from localStorage
    const localStorage = window.localStorage
    const currentRawData = localStorage.getItem('d-an') // syntax: [{},{}]

    if (currentRawData === null) {
      initLocalStorage()
    }
  }

  function getWeeks(): Array<Object> | null {
    const currentRawData = localStorage.getItem('d-an') // syntax: [{},{}]

    let currentWeeks = JSON.parse(currentRawData)

    return currentWeeks
  }

  function storeWeek(week: WeekInterface) {
    let weeks = getWeeks()

    if (!(weeks instanceof Array)) {
      throw new Error('Weeks need to be array')
    }

    if (!useLocalStorage) {
      throw new Error('Cannot store invalid week')
    }
    if (!isValidWeek(week)) {
      throw new Error('Week is invalid. Cannot store invalid week')
    }

    // if is duplicate
    if (isDuplicate(week)) {
      // update week in weeks by index
      const index = getIndexOfWeekInStorage(week)
      
      if (index !== undefined && index >= 0) {
        console.log("overwrite week at index " + index);
        weeks[index] = week
      } else {
        throw new Error('Could not overwrite week. invalid index!')
      }
    } else {
      weeks.push(week)
    }

    localStorage.setItem('d-an', JSON.stringify(weeks))
  }

  function getIndexOfWeekInStorage(week: WeekInterface) {
    return getWeeks()?.findIndex((storedWeek) => {
      return storedWeek.date.start === week.date.start && storedWeek.date.end === week.date.end
    })
  }

  function isDuplicate(week: WeekInterface) {
    return getWeekFromStorage(week) ? true : false
  }

  function isValidWeek(week: Object): boolean {
    let isWeekValid = true
    const requiredWeekProperties = ['date', 'name', 'year', 'content', 'department']
    requiredWeekProperties.forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(week, key)) {
        isWeekValid = false
      }

      if (key === 'date') {
        // check if both start and end are present
        const cond =
          Object.prototype.hasOwnProperty.call(week, 'date') &&
          Object.prototype.hasOwnProperty.call(week.date, 'start') &&
          Object.prototype.hasOwnProperty.call(week.date, 'end')
        if (!cond) {
          isWeekValid = false
        }
      }
    })
    return isWeekValid
  }

  function getWeekFromStorage(week: WeekInterface): Object | null {
    const storedWeeks = getStorageWeeks()

    for (const i in storedWeeks) {
      const element: any = storedWeeks[i]
      const cond = element.date.start === week.date.start && element.date.end === week.date.end
      if (cond) return week
    }

    return null
  }

  function getStorageWeeks(): Array<Object> {
    const raw = window.localStorage.getItem('d-an')
    if (raw === null || !raw) {
      throw new Error('Cannot access weeks in localStorage')
    }
    return JSON.parse(raw)
  }

  function initLocalStorage() {
    window.localStorage.setItem('d-an', '[]')
  }

  return { getWeeks, storeWeek }
})
