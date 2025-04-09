import React, { lazy } from 'react'

function SafeImport(importFn, componentName = 'UnknownComponent', remoteName = 'UnknownRemote') {
  return lazy(async () => {
    try {
      return await importFn()
    } catch (error) {
      console.error(`❌ Failed to load ${componentName} from ${remoteName}:`, error)

      return {
        default: () => (
          <div className="p-6 border border-red-500 bg-red-100 text-red-700 text-center">
            <h2 className="text-lg font-semibold">⚠️ Failed to load <span className="font-bold">{componentName}</span></h2>
            <p className="text-sm">Remote: <span className="font-mono px-2 py-1 rounded">{remoteName}</span></p>
            <p className="text-xs mt-2 italic">{error.message}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
            >
              🔄 Retry
            </button>
          </div>
        )
      }
    }
  })
}

export { SafeImport }