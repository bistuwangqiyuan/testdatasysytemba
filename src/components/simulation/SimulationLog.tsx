'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Terminal } from 'lucide-react'

interface Props {
  logs: string[]
}

export default function SimulationLog({ logs }: Props) {
  return (
    <div className="glass rounded-xl p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-5 h-5 text-gray-400" />
        <h3 className="text-lg font-semibold">仿真日志</h3>
      </div>
      
      <ScrollArea className="h-[200px] w-full rounded-md border border-gray-800 bg-black/50 p-3">
        {logs.length === 0 ? (
          <p className="text-gray-500 text-sm font-mono">等待仿真开始...</p>
        ) : (
          <div className="space-y-1">
            {logs.map((log, index) => (
              <p key={index} className="text-xs font-mono text-green-400">
                {log}
              </p>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}