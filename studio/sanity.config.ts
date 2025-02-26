import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {dashboardTool, projectInfoWidget} from '@sanity/dashboard'
import {schemaTypes} from './schemaTypes'
import {editorStructureResolver, configStructureResolver, extendedDocumentNode} from './structure'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['settings'])

export default defineConfig({
  title: 'Harri(son) Knight Molloy',
  name: 'harrison-knight-molloy',
  projectId: 'isbv79ef',
  dataset: 'production',

  plugins: [
    dashboardTool({widgets: [projectInfoWidget()]}),
    structureTool({
      name: 'editor',
      title: 'Editor',
      structure: editorStructureResolver,
      defaultDocumentNode: extendedDocumentNode,
    }),
    structureTool({
      name: 'config',
      title: 'Config',
      structure: configStructureResolver,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global “New document” menu options
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
