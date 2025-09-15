import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Helper functions for common operations
export const uploadFile = async (file: File, path: string) => {
  const { data, error } = await supabase.storage
    .from('experiment-files')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })
  
  if (error) throw error
  return data
}

export const getFileUrl = (path: string) => {
  const { data } = supabase.storage
    .from('experiment-files')
    .getPublicUrl(path)
  
  return data.publicUrl
}