const getValue = (key: string) => {
  return localStorage.getItem(key)
}

const setValue = (key: string, value: any) => {
  localStorage.setItem(key, value)
}

const removeItem = (key: string) => {
  localStorage.removeItem(key)
}

const getJsonItem = (key: string) => {
  const value = localStorage.getItem(key)
  if (value===null)
    return null
  return JSON.parse(value)
}

const setJsonItem = (key: string, item: any) => {
  const value = item ? JSON.stringify(item) : null
  setValue(key, value)
}

export const storageUtils = {
  getValue,
  setValue,
  removeItem,
  getJsonItem,
  setJsonItem
}