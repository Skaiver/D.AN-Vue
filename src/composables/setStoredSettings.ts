import { hasWorkingStorage } from '@/composables/hasWorkingStorage'
import { getStoredSettings } from '@/composables/getStoredSettings'

// @ts-nocheck
export function setStoredSettings(newSettings: Object) {
  if (!hasWorkingStorage('localStorage')) {
    console.error('a')
  }

  if (!window.localStorage.getItem('d-an-settings')) {
    console.error('b')
  }

  window.localStorage.setItem('d-an-settings', JSON.stringify(newSettings))

return getStoredSettings()
}
