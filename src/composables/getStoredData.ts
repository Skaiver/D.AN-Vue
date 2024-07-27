import { hasWorkingStorage } from './hasWorkingStorage'

// @ts-nocheck
export function getStoredData() {
  if (!hasWorkingStorage('localStorage')) {
    console.error('a')
  }

  if (!window.localStorage.getItem('d-an')) {
    console.error('b')
  }

  const data = window.localStorage.getItem('d-an');

  console.log(data);
  

  return JSON.stringify(data) || ''
}
