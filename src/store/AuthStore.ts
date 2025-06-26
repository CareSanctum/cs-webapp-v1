import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  username: string | null
  setusername: (username: string) => void
  clearusername: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: null,
      setusername: (username) => set({ username }),
      clearusername: () => set({ username: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ username: state.username }) ,
    }
  )
)
