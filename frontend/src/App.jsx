import './App.css'
import { useEffect, useState } from 'react'

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

      <div>
        {data ? (
          data.map(photo => (
            <div key={photo.id}>
              <h3>{photo.author}</h3>
              <img src={photo.download_url} alt={photo.author} width="200" />
              <a href={photo.download_url}>Download</a>
            </div>
          ))
        ) : (
          <h1>Something Went wrong !!! No data Available</h1>
        )}
      </div>
      
    </>
  )
}

export default App
