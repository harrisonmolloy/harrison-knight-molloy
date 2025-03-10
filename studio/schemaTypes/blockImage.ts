import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blockImage',
  title: 'Block Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      title: 'Alternative Text',
      name: 'alt',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
