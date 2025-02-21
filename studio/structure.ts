export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Regular document types
      S.documentTypeListItem('post').title('Posts'),

      // Add a visual divider
      S.divider(),

      S.documentTypeListItem('tag').title('Tags'),

      S.documentTypeListItem('tagType').title('Tag Types'),

      // Add a visual divider
      S.divider(),

      // Our singleton type has a list item with a custom child
      S.listItem().title('Settings').id('settings').child(
        // Instead of rendering a list of documents, we render a single
        // document, specifying the `documentId` manually to ensure
        // that we're editing the single instance of the document
        // S.document().schemaType('settings').documentId('settings'),

        S.editor().id('settings').schemaType('settings').documentId('settings'),
      ),
    ])
