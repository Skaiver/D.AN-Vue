import { ref } from 'vue'
import { defineStore } from 'pinia'
import { hasWorkingStorage } from '@/composables/hasWorkingStorage'
import type WeekInterface from '@/components/interfaces/WeekInterface'
import type ModalForm from '@/components/classes/ModalForm'

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
    let currentRawData = localStorage.getItem('d-an') ?? '[]' // syntax: [{},{}]

    if(currentRawData === '') currentRawData = "[]";

    console.log(currentRawData);
    

    let currentWeeks = JSON.parse(currentRawData)

    return currentWeeks
  }

  function storeWeek(week: ModalForm) {
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
        console.log('overwrite week at index ' + index)
        weeks[index] = week
      } else {
        throw new Error('Could not overwrite week. invalid index!')
      }
    } else {
      weeks.push(week)
    }

    localStorage.setItem('d-an', JSON.stringify(weeks))
  }

  function getIndexOfWeekInStorage(week: ModalForm) {
    return getWeeks()?.findIndex((storedWeek: any) => {
      return storedWeek.date.start === week.date.start && storedWeek.date.end === week.date.end
    })
  }

  function isDuplicate(week: ModalForm) {
    return getWeekFromStorage(week) ? true : false
  }

  function isValidWeek(week: ModalForm): boolean {
    return week.isValid();
  }

  function getWeekFromStorage(week: ModalForm): Object | null {
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
