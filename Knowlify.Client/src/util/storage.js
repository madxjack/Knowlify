export function saveUserLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getUserLocalStorage() {
  return JSON.parse(localStorage.getItem('user'))
}

export function removeUserLocalStorage() {
  localStorage.removeItem('user')
}
