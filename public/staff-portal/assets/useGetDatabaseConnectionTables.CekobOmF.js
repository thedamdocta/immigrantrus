import{M as a,br as r,bO as T}from"./index.Dg3lKJeg.js";const b=a`
  fragment RemoteTableFields on RemoteTable {
    id
    name
    schema
    status
    schemaPendingUpdates
  }
`,p=a`
  ${b}
  query GetManyRemoteTables($input: FindManyRemoteTablesInput!) {
    findDistantTablesWithStatus(input: $input) {
      ...RemoteTableFields
    }
  }
`,c=({connectionId:n,skip:i,shouldFetchPendingSchemaUpdates:o,fetchPolicy:t})=>{const s=r(),l=t?{fetchPolicy:t}:{},{data:e,error:u}=T(p,{client:s??void 0,skip:i||!s,variables:{input:{id:n,shouldFetchPendingSchemaUpdates:o}},...l});return{tables:(e==null?void 0:e.findDistantTablesWithStatus)||[],error:u}};export{b as R,c as u};
