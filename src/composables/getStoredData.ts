import { hasWorkingStorage } from '@/composables/hasWorkingStorage'

// @ts-nocheck
export function getStoredData() {
  if (!hasWorkingStorage('localStorage')) {
    console.error('a')
  }

  if (!window.localStorage.getItem('d-an')) {
    throw new Error('device does not have settings db: "d-an"')
  }

  const data = window.localStorage.getItem('d-an');

  return JSON.stringify(data) || ''
}
