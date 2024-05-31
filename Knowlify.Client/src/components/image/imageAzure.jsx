import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ImageDisplay = ({ sasUrl, blobName }) => {
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true)
        // Construir la URL completa del blob usando la URL SAS y el nombre del blob
        const blobUrl = `${sasUrl}${sasUrl.includes('?') ? '&' : '?'}blobName=${blobName}`

        // Descargar la imagen como un blob
        const response = await axios.get(blobUrl, {
          responseType: 'blob',
        })

        // Crear un objeto URL para la imagen descargada
        const url = URL.createObjectURL(response.data)
        setImageUrl(url)
      } catch (error) {
        console.error('Error downloading the image:', error)
        setError('Failed to download image.')
      } finally {
        setLoading(false)
      }
    }

    fetchImage()
  }, [sasUrl, blobName])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return <div>{imageUrl && <img src={imageUrl} alt='Downloaded Blob' />}</div>
}

export default ImageDisplay
