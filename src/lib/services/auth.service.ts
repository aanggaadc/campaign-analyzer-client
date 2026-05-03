import { supabase } from '$lib/utils/supabase'
import { authStore } from '$lib/stores/auth.store'

export const authService = {
  async register(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    authStore.setUser(data.user)
    return data
  },

  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    authStore.clear()
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },

  onAuthStateChange(callback: (user: unknown) => void) {
    return supabase.auth.onAuthStateChange((_, session) => {
      callback(session?.user ?? null)
    })
  }
}