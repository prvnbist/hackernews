export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
   public: {
      Tables: {
         account: {
            Row: {
               created_at: string | null
               email: string
               user_id: string
               id: string
               bio: string | null
            }
            Insert: {
               created_at?: string | null
               email: string
               user_id: string
               id?: string
               bio?: string | null
            }
            Update: {
               created_at?: string | null
               email?: string
               user_id?: string
               id?: string
               bio?: string | null
            }
         }
         post: {
            Row: {
               id: string
               created_at: string | null
               title: string
               url: string | null
               description: string | null
               user_id: string
            }
            Insert: {
               id?: string
               created_at?: string | null
               title: string
               url?: string | null
               description?: string | null
               user_id: string
            }
            Update: {
               id?: string
               created_at?: string | null
               title?: string
               url?: string | null
               description?: string | null
               user_id?: string
            }
         }
      }
      Views: {
         [_ in never]: never
      }
      Functions: {
         [_ in never]: never
      }
      Enums: {
         [_ in never]: never
      }
   }
}
