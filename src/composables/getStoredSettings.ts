import { hasWorkingStorage } from '@/composables/hasWorkingStorage'

// @ts-nocheck
export function getStoredSettings() {
  if (!hasWorkingStorage('localStorage')) {
    console.error('a')
  }

  if (!window.localStorage.getItem('d-an-settings')) {
    console.error('b')
  }

  const data = window.localStorage.getItem('d-an-settings');

  return JSON.stringify(data) || ''
}
