import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Client Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'tour', title: 'Tour Taken', type: 'string' }),
    defineField({ name: 'review', title: 'Review', type: 'text', rows: 3, validation: r => r.required() }),
    defineField({ name: 'rating', title: 'Rating (1-5)', type: 'number', validation: r => r.min(1).max(5) }),
    defineField({ name: 'photo', title: 'Client Photo (optional)', type: 'image' }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tour' },
  },
})