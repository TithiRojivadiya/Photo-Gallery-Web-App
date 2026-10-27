import './App.css'
import { useEffect, useState } from 'react'
import Card from './Components/Card'

function App() {
  
  const [data, setdata] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetch('https://picsum.photos/v2/list?limit=30')
      .then(res => res.json())
      .then(data => setdata(data))
      .finally(() => setLoading(false))

  }, [])

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
        <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">
            Photo Gallery
          </h1>

          {data && data.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {data.map(photo => (
                <Card
                  key={photo.id}
                  author={photo.author}
                  download_url={photo.download_url}
                />
              ))}
            </div>
          ) : (
            <h1>Something went wrong! No data available.</h1>
          )}

        </div>
      
    </>
  )
}

export default App
