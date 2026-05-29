import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tour',
  title: 'Tour Package',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Tour Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'featured', title: 'Featured on Homepage?', type: 'boolean', initialValue: false }),
    defineField({ name: 'mainImage', title: 'Main Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'photos', title: 'Gallery Photos', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'tagline', title: 'Short Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'duration', title: 'Duration (e.g. Full Day, 3 Days 2 Nights)', type: 'string' }),
    defineField({ name: 'price', title: 'Price (₱)', type: 'number' }),
    defineField({ name: 'priceNote', title: 'Price Note (e.g. per person, minimum 4 pax)', type: 'string' }),
    defineField({
      name: 'inclusions', title: 'Inclusions', type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'exclusions', title: 'Exclusions', type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'itinerary', title: 'Itinerary', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'time', title: 'Time', type: 'string' },
          { name: 'activity', title: 'Activity', type: 'string' },
        ],
      }],
    }),
    defineField({ name: 'destination', title: 'Destination Tag', type: 'string' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'destination', media: 'mainImage' },
  },
})