import { hasWorkingStorage } from '@/composables/hasWorkingStorage'
import { getStoredData } from '@/composables/getStoredData'

// @ts-nocheck
export function setStoredData(newData: any) {
  if(!newData) {
    console.error('a')
  }

  if (!hasWorkingStorage('localStorage')) {
    console.error('b')
  }

  window.localStorage.setItem('d-an', JSON.stringify(newData))

  return getStoredData()
}
