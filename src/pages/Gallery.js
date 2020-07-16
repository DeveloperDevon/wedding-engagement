import React from 'react'
import Layout from '../components/Layout'
import Gallery from 'react-photo-gallery'

const image = (n) => require(`../assets/img/img${n}.jpg`)

const photos = [
  { src: image(1), width: 6016, height: 4016 },
  { src: image(2), width: 4016, height: 6016 },
  { src: image(3), width: 6016, height: 4016 },
  { src: image(5), width: 6016, height: 4016 },
  { src: image(4), width: 4016, height: 6016 },
  { src: image(6), width: 6016, height: 4016 },
  { src: image(7), width: 4016, height: 6016 },
  { src: image(8), width: 4016, height: 6016 },
  { src: image(9), width: 4016, height: 6016 },
  { src: image(10), width: 4016, height: 6016 },
  { src: image(13), width: 6016, height: 4016 },
  { src: image(14), width: 6016, height: 4016 },
  { src: image(15), width: 4016, height: 6016 },
  { src: image(11), width: 3467, height: 5194 },
  { src: image(16), width: 4016, height: 6016 },
  { src: image(17), width: 4016, height: 6016 },
  { src: image(12), width: 4016, height: 6016 },
  { src: image(18), width: 4016, height: 6016 },
  { src: image(19), width: 4016, height: 6016 },
  { src: image(20), width: 4016, height: 6016 },
  { src: image(21), width: 4016, height: 6016 },
  { src: image(22), width: 4016, height: 6016 },
  { src: image(23), width: 4016, height: 6016 },
  { src: image(24), width: 4016, height: 6016 },
  { src: image(25), width: 6016, height: 4016 },
  { src: image(26), width: 6016, height: 4016 },
  { src: image(27), width: 4016, height: 6016 },
  { src: image(28), width: 6016, height: 4016 },
  { src: image(29), width: 4016, height: 6016 },
  { src: image(30), width: 4016, height: 6016 },
  { src: image(31), width: 4016, height: 6016 },
  { src: image(32), width: 4016, height: 6016 },
  { src: image(33), width: 4016, height: 6016 },
  { src: image(34), width: 4016, height: 6016 },
  { src: image(35), width: 4016, height: 6016 },
]

const PhotoGallery = () => {
  return (
    <Layout>
      <Gallery photos={photos} />
    </Layout>
  )
}

export default PhotoGallery