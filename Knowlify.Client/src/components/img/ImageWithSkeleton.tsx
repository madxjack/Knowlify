import { useState } from 'react'

interface ImageWithSkeletonProps {
  src: string
  alt: string
  className?: string
}

function ImageWithSkeleton({ src, alt, className }: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <img src='/placeholder.svg' alt='Loading' />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ease-in-out ${className}`}
        style={{ width: '100%', height: 'auto' }}
        loading='lazy'
      />
    </>
  )
}

export default ImageWithSkeleton
