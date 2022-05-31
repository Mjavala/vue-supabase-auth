import { defineStore } from 'pinia';
import { createClient } from '@supabase/supabase-js';

export const useSupabaseStore = defineStore('AuthStore', {
  state: () => {
    return {
      client: createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
      ),
      username: '',
      email: '',
      loggedIn: false,
    };
  },
  actions: {
    setUser(email: string) {
      this.email = email;
    },
  },
});
