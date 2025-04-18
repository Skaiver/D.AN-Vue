import { hasWorkingStorage } from '@/composables/hasWorkingStorage'
import { getStoredSettings } from '@/composables/getStoredSettings'
import { MESSAGES } from '@/composables/Messages'

// @ts-nocheck
export function setStoredSettings(newSettings: Object) {
  if (!hasWorkingStorage('localStorage')) {
    console.error(MESSAGES.NOT_WORKING_LOCALSTORAGE)
  }
  window.localStorage.setItem('d-an-settings', JSON.stringify(newSettings))
  return getStoredSettings()
}
