import {defineField, defineType} from 'sanity'
// import {FolderIcon} from '@sanity/icons'

export default defineType({
  name: 'config',
  title: 'Config',
  type: 'document',
  // icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
