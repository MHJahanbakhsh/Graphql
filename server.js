import {
  ApolloServer,
  gql
} from "apollo-server" //gql is a tag function which means we can tag a template literal with it

//type defenitions define schemas?
const typeDefs = gql `
# optional
schema{
  query:shit
}

type shit{
greeting: String
}
`

//resolvers defines how server gives back the response
const resolvers = {
  shit: {
    //greeting function will be called by graphql engine,everytime client sends a greeting query
    greeting: () => 'Hello world'
  }
}
//obviously resolver functions must accuratly mirror the relevant type defenitions



const server = new ApolloServer({
  typeDefs,
  resolvers
}) //we used shortcut since the names already match. also this returns a promis
const serverInfo = await server.listen({
  port: 9000
})
console.log(`server running at ${serverInfo.url}`) //>>>> server running at http://localhost:9000/










// console.log(typeDefs)
/* >>>> this object represents an AST of the graphql query that we wrote
{
  kind: 'Document',
  definitions: [
    {
      kind: 'ObjectTypeDefinition',
      description: undefined,
      name: [Object],
      interfaces: [],
      directives: [],
      fields: [Array]
    }
  ],
  loc: Location {
    start: 0,
    end: 32,
    source: Source {
      body: '\ntype Query{\ngreeting: String\n}\n',
      name: 'GraphQL request',
      locationOffset: [Object]
    }
  }
}
*/

//if we change the "type" keyword to somthing else forexample "class" ; then we'll face an error