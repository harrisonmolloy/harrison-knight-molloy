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
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'tagType',
      title: 'Tag Type',
      type: 'reference',
      to: [{type: 'tagType'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagType.title',
    },
  },
})
