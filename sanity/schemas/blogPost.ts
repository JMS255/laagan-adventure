import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'mainImage', title: 'Cover Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'excerpt', title: 'Short Excerpt', type: 'text', rows: 2 }),
    defineField({
      name: 'body', title: 'Content', type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'excerpt', media: 'mainImage' },
  },
})