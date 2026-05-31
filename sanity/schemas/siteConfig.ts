import { defineType, defineField } from 'sanity'

export const siteConfig = defineType({
  name: 'siteConfig',
  title: 'Site Config',
  type: 'document',
  fields: [
    defineField({
      name: 'tripSmallGroupPrice',
      title: 'Trip Builder — Small Group Price (2–5 pax)',
      type: 'number',
      description: 'Total price in PHP for groups of 2 to 5 people. Default: 3500.',
    }),
    defineField({
      name: 'tripLargeGroupPrice',
      title: 'Trip Builder — Large Group Price (6+ pax)',
      type: 'number',
      description: 'Total price in PHP for groups of 6 or more. Default: 4500.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Config' }),
  },
})
