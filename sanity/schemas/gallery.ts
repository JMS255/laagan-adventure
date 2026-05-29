import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryPhoto',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'destination', title: 'Destination', type: 'string' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'caption', subtitle: 'destination', media: 'image' },
  },
})