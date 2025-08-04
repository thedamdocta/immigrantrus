import{M as g,br as d,bO as m,T as b,a5 as A,r as C,aa as f}from"./index.Dg3lKJeg.js";import{D as I,g as E,u as T}from"./useIsSettingsIntegrationEnabled.B5bcKBF5.js";import{u as D}from"./useGetDatabaseConnectionTables.CekobOmF.js";import{u as N}from"./useSettingsIntegrationCategories.BCNgJ2AL.js";const O=g`
  ${I}
  query GetOneDatabaseConnection($input: RemoteServerIdInput!) {
    findOneRemoteServerById(input: $input) {
      ...RemoteServerFields
    }
  }
`,v=({databaseKey:i,connectionId:e,skip:r,fetchPolicy:s})=>{const p=d(),a=E(i),u=s?{fetchPolicy:s}:{},{data:t,loading:o}=m(O,{client:p??void 0,skip:r||!p||!a,variables:{input:{id:e}},...u}),n=(t==null?void 0:t.findOneRemoteServerById)??null;return{connection:(n==null?void 0:n.foreignDataWrapperType)===a?n:null,loading:o}},R=({fetchPolicy:i})=>{const{databaseKey:e="",connectionId:r=""}=b(),s=A(),[p]=N(),a=p.integrations.find(({from:{key:l}})=>l===e),u=T(e),t=!!a&&u,{connection:o,loading:n}=v({databaseKey:e,connectionId:r,skip:!t,fetchPolicy:i});C.useEffect(()=>{(!t||!n&&!o)&&s(f.NotFound)},[a,e,s,t,o,n]);const{tables:c}=D({connectionId:r,skip:!o,shouldFetchPendingSchemaUpdates:!0,fetchPolicy:i});return{connection:o,integration:a,databaseKey:e,tables:c}};export{R as u};
