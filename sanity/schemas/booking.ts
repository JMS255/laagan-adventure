import { defineType, defineField } from 'sanity'

export const booking = defineType({
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    defineField({ name: 'bookingRef', title: 'Reference', type: 'string' }),
    defineField({
      name: 'status', title: 'Status', type: 'string',
      options: { list: ['pending', 'confirmed', 'cancelled'] },
      initialValue: 'pending',
    }),
    defineField({ name: 'tourTitle', title: 'Tour', type: 'string' }),
    defineField({ name: 'tourSlug', title: 'Tour Slug', type: 'string' }),
    defineField({ name: 'date', title: 'Tour Date', type: 'string' }),
    defineField({ name: 'guests', title: 'Guests', type: 'number' }),
    defineField({ name: 'name', title: 'Lead Passenger', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone / Viber', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'totalPrice', title: 'Total (₱)', type: 'number' }),
    defineField({ name: 'depositSent', title: 'Deposit Sent?', type: 'boolean', initialValue: false }),
    defineField({ name: 'promo', title: 'Promo Code', type: 'string' }),
    defineField({ name: 'notes', title: 'Special Requirements', type: 'text' }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tourTitle', description: 'date' },
    prepare(v: Record<string, string>) {
      return { title: `${v.title} — ${v.subtitle}`, subtitle: v.description }
    },
  },
  orderings: [{
    title: 'Newest first', name: 'submittedAtDesc',
    by: [{ field: 'submittedAt', direction: 'desc' }],
  }],
})
