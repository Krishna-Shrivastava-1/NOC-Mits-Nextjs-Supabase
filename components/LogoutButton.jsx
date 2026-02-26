'use client'
import { supabase } from '@/lib/supabase'

export const LogoutFunc = async () => {
  try {
    await supabase.auth.signOut()  // Await to ensure session clears
    window.location.href = '/login'  // Simple redirect works for direct use
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
