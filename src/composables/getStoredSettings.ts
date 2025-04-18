import { hasWorkingStorage } from '@/composables/hasWorkingStorage'
import { MESSAGES } from '@/composables/Messages'

// @ts-nocheck
export function getStoredSettings() {
  if (!hasWorkingStorage('localStorage')) {
    console.error(MESSAGES.NOT_WORKING_LOCALSTORAGE)
  }
  if (!window.localStorage.getItem('d-an-settings')) {
    throw new Error('device does not have settings db: "d-an-settings"')
  }
  const data = window.localStorage.getItem('d-an-settings');
  return data || ''
}
