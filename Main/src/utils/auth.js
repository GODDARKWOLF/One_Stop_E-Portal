// src/utils/auth.js
import users from '../data/users.json'
import { addBlock } from './blockchain'

const USER_KEY = 'sim_user_v1'

export function login(email, password) {
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
        // persist session
        localStorage.setItem(USER_KEY, JSON.stringify(user))
        // record the login as a block
        addBlock({ user: user.email, action: 'Login' })
        return user
    }
    return null
}

export function signup(email, password, role = 'citizen') {
    // purely local demo -- doesn't update users.json (read-only) but we can still store session
    const user = { role, email, password }
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    addBlock({ user: user.email, action: 'Signup' })
    return user
}

export function logout() {
    const cur = getCurrentUser()
    if (cur) addBlock({ user: cur.email, action: 'Logout' })
    localStorage.removeItem(USER_KEY)
}

export function getCurrentUser() {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
}
