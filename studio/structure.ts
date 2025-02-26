import DocumentsPane from 'sanity-plugin-documents-pane'
import {type StructureBuilder} from 'sanity/structure'

export const editorStructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.divider(),
      S.documentTypeListItem('tag').title('Tags'),
      S.divider(),
      S.listItem()
        .title('All')
        .child(S.documentList().title('All Documents').filter("_id != 'config'")),
    ])

export const configStructureResolver = (S: StructureBuilder) =>
  S.document().id('config').schemaType('config').documentId('config')

export const extendedDocumentNode = (S: StructureBuilder) =>
  S.document().views([
    S.view.form(),
    S.view
      .component(DocumentsPane)
      .options({
        query: `*[references($id)]`,
        params: {id: `_id`},
        options: {perspective: 'previewDrafts'},
      })
      .title('Incoming References'),
  ])
