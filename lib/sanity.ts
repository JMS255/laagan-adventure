import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'o5mustem',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = createImageUrlBuilder(client)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

// Queries
export const TOURS_QUERY = `*[_type == "tour"] | order(_createdAt asc) {
  _id, title, slug, tagline, mainImage, price, priceNote, duration, destination, featured,
  audience, badgeLabel, urgencyNote
}`

export const FEATURED_TOURS_QUERY = `*[_type == "tour" && featured == true] | order(_createdAt asc) {
  _id, title, slug, tagline, mainImage, price, priceNote, duration, destination
}`

export const TOUR_QUERY = `*[_type == "tour" && slug.current == $slug][0] {
  _id, title, slug, tagline, description, mainImage, photos,
  price, priceNote, duration, destination,
  inclusions, exclusions, itinerary,
  dayItinerary[] { _key, dayLabel, title, description, highlights, photo },
  pricingTiers[] { label, minPax, maxPax, pricePerPerson },
  availabilityNote,
  mapQuery, faq
}`

export const SIMILAR_TOURS_QUERY = `*[_type == "tour" && slug.current != $slug] | order(_createdAt asc)[0...3] {
  _id, title, slug, tagline, mainImage, price, priceNote, duration, destination
}`

export const GALLERY_QUERY = `*[_type == "galleryPhoto"] | order(order asc) {
  _id, image, caption, destination
}`

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(date desc) {
  _id, name, tour, review, rating, photo
}`

export const BLOG_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id, title, slug, excerpt, mainImage, publishedAt, tags
}`

export const BLOG_POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id, title, slug, excerpt, mainImage, publishedAt, tags, body
}`

export const TOURS_BY_DESTINATION_QUERY = `*[_type == "tour" && destination == $destination] | order(_createdAt asc) {
  _id, title, slug, tagline, mainImage, price, priceNote, duration, destination, badgeLabel, urgencyNote, audience
}`
