import type {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: "./schema.graphql",
    generates: {
        './graphql/generated.ts': {
            plugins: ['typescript', 'typescript-operations'],
        }
    }
}
export default config
