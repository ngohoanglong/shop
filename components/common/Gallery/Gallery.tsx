import React, { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
interface ItemImage {
  url: string
  alt?: string
}
interface Props {
  onClose: () => void
  images: ItemImage[]
  index: number
}
const Gallery: React.FC<Props> = ({ onClose, index = 0, images }) => {
  const [photoIndex, setIndex] = useState(index)
  return (
    <>
      <Lightbox
        mainSrc={images[photoIndex]?.url}
        nextSrc={images[(photoIndex + 1) % images.length]?.url}
        prevSrc={images[(photoIndex + images.length - 1) % images.length]?.url}
        onCloseRequest={onClose}
        onMovePrevRequest={() =>
          setIndex((photoIndex + images.length - 1) % images.length)
        }
        onMoveNextRequest={() => setIndex((photoIndex + 1) % images.length)}
      />
    </>
  )
}
export default Gallery
