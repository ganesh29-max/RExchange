export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          college: string
          major: string | null
          graduation_year: string | null
          bio: string | null
          rating: number
          review_count: number
          exchanges_completed: number
          is_verified: boolean
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string | null
          college?: string
          major?: string | null
          graduation_year?: string | null
          bio?: string | null
          rating?: number
          review_count?: number
          exchanges_completed?: number
          is_verified?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          college?: string
          major?: string | null
          graduation_year?: string | null
          bio?: string | null
          rating?: number
          review_count?: number
          exchanges_completed?: number
          is_verified?: boolean
          created_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          type: string
          category: string
          tags: string[]
          price: number
          exchange_type: string
          status: string
          condition: string | null
          location: string
          is_request: boolean
          images: string[]
          extra_details: Json | null
          embedding: number[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          type: string
          category: string
          tags?: string[]
          price?: number
          exchange_type: string
          status?: string
          condition?: string | null
          location?: string
          is_request?: boolean
          images?: string[]
          extra_details?: Json | null
          embedding?: number[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          type?: string
          category?: string
          tags?: string[]
          price?: number
          exchange_type?: string
          status?: string
          condition?: string | null
          location?: string
          is_request?: boolean
          images?: string[]
          extra_details?: Json | null
          embedding?: number[] | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
