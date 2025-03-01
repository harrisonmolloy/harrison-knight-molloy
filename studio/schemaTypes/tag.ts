import {defineField, defineType} from 'sanity'
import {HashIcon} from '@sanity/icons'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: HashIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
    }),
  ],
})
