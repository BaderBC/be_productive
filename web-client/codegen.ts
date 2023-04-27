import type { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv';

dotenv.config()

const config: CodegenConfig = {
  schema: process.env.VITE_GRAPHQL_URL,
  //documents: './src/**/*.gql',
  documents: process.env.VITE_GRAPHQL_DOCUMENTS,
  generates: {
    './graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo']
    }
  }
}
export default config
