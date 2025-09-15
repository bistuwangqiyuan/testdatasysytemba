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
      devices: {
        Row: {
          id: string
          device_address: string
          device_type: string
          status: 'online' | 'offline' | 'shutdown'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          device_address: string
          device_type: string
          status?: 'online' | 'offline' | 'shutdown'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          device_address?: string
          device_type?: string
          status?: 'online' | 'offline' | 'shutdown'
          created_at?: string
          updated_at?: string
        }
      }
      experiment_data: {
        Row: {
          id: string
          device_id: string
          current: number
          voltage: number
          power: number
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          device_id: string
          current: number
          voltage: number
          power: number
          timestamp: string
          created_at?: string
        }
        Update: {
          id?: string
          device_id?: string
          current?: number
          voltage?: number
          power?: number
          timestamp?: string
          created_at?: string
        }
      }
      file_records: {
        Row: {
          id: string
          filename: string
          file_url: string
          upload_time: string
          data_count: number
          status: 'processing' | 'completed' | 'failed'
        }
        Insert: {
          id?: string
          filename: string
          file_url: string
          upload_time?: string
          data_count: number
          status?: 'processing' | 'completed' | 'failed'
        }
        Update: {
          id?: string
          filename?: string
          file_url?: string
          upload_time?: string
          data_count?: number
          status?: 'processing' | 'completed' | 'failed'
        }
      }
      anomaly_records: {
        Row: {
          id: string
          device_id: string
          anomaly_type: string
          anomaly_value: Json
          detected_at: string
        }
        Insert: {
          id?: string
          device_id: string
          anomaly_type: string
          anomaly_value: Json
          detected_at?: string
        }
        Update: {
          id?: string
          device_id?: string
          anomaly_type?: string
          anomaly_value?: Json
          detected_at?: string
        }
      }
      simulation_records: {
        Row: {
          id: string
          input_voltage: number
          input_current: number
          output_voltage: number
          output_current: number
          shutdown_time: number
          simulation_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          input_voltage: number
          input_current: number
          output_voltage: number
          output_current: number
          shutdown_time: number
          simulation_data: Json
          created_at?: string
        }
        Update: {
          id?: string
          input_voltage?: number
          input_current?: number
          output_voltage?: number
          output_current?: number
          shutdown_time?: number
          simulation_data?: Json
          created_at?: string
        }
      }
    }
  }
}