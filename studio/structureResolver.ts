import {type StructureBuilder} from 'sanity/structure'

export const structureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.divider(),
      S.documentTypeListItem('tag').title('Tags'),
      S.documentTypeListItem('tagType').title('Tag Types'),
      S.divider(),
      S.listItem()
        .title('Settings')
        .id('settings')
        .child(S.editor().id('settings').schemaType('settings').documentId('settings')),
    ])
