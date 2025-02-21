import {defineField, defineType} from 'sanity'
import {FolderIcon} from '@sanity/icons'

export default defineType({
  name: 'tagType',
  title: 'Tag Type',
  type: 'document',
  icon: FolderIcon,
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
  ],
})
