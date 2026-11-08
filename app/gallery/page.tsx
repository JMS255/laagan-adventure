import GalleryClient from '@/components/GalleryClient'
import { getGallery } from '@/lib/db'

export const revalidate = 60

export default async function GalleryPage() {
  const photos = await getGallery().catch(() => [])
  return <GalleryClient photos={photos} />
}
