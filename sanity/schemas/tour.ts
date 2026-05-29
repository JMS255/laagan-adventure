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
      name: 'itinerary', title: 'Simple Itinerary (time + activity)', type: 'array',
      description: 'For single-day tours. Use Day-by-Day below for multi-day tours.',
      of: [{
        type: 'object',
        fields: [
          { name: 'time', title: 'Time', type: 'string' },
          { name: 'activity', title: 'Activity', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'dayItinerary',
      title: 'Day-by-Day Itinerary (multi-day tours)',
      description: 'Use this for tours that span multiple days. Each item is one day with an expandable accordion.',
      type: 'array',
      of: [{
        type: 'object',
        name: 'dayItem',
        fields: [
          { name: 'dayLabel', title: 'Day Label', type: 'string', description: 'e.g. "Day 1", "Day 2"' },
          { name: 'title', title: 'Day Title', type: 'string', description: 'e.g. "Arrive in Zamboanga City"' },
          { name: 'photo', title: 'Day Photo', type: 'image', options: { hotspot: true } },
          { name: 'description', title: 'What Happens This Day', type: 'text', rows: 4 },
          {
            name: 'highlights', title: 'Activity Highlights', type: 'array',
            of: [{ type: 'string' }],
            description: 'Key activities, e.g. "Island hopping to 3 islands", "Fresh seafood lunch at the pier"',
          },
        ],
        preview: { select: { title: 'title', subtitle: 'dayLabel', media: 'photo' } },
      }],
    }),
    defineField({ name: 'destination', title: 'Destination Tag', type: 'string' }),
    defineField({
      name: 'mapQuery',
      title: 'Map Location (Google Maps search)',
      type: 'string',
      description: 'e.g. "Santa Cruz Island, Zamboanga City, Philippines" — used to embed the map on the tour page',
    }),
    defineField({
      name: 'faq',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [{
        type: 'object',
        name: 'faqItem',
        fields: [
          { name: 'question', title: 'Question', type: 'string' },
          { name: 'answer', title: 'Answer', type: 'text', rows: 3 },
        ],
        preview: { select: { title: 'question' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'destination', media: 'mainImage' },
  },
})