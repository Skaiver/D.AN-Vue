import { hasWorkingStorage } from '@/composables/hasWorkingStorage'
import { MESSAGES } from '@/composables/Messages'
import { setStoredSettings } from '@/composables/setStoredSettings'
import { setStoredData } from '@/composables/setStoredData'
import { getStoredData } from './getStoredData'
import { getStoredSettings } from './getStoredSettings'


// @ts-nocheck
export function initStorages() {
  if (!hasWorkingStorage('localStorage')) {
    console.error(MESSAGES.NOT_WORKING_LOCALSTORAGE)
  }

  // if having any data -> we do not init
  try {
    if(getStoredSettings()) {
        return false;
    }
    if(getStoredData()) {
        return false;
    }
  } catch(e) {}

  setStoredSettings({})
  setStoredData([])
  return true;
}
