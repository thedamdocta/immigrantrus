import{M as a,w as s,bM as r}from"./index.Dg3lKJeg.js";const u=a`
  fragment RemoteServerFields on RemoteServer {
    id
    createdAt
    foreignDataWrapperId
    foreignDataWrapperOptions
    foreignDataWrapperType
    userMappingOptions {
      user
    }
    updatedAt
    schema
    label
  }
`,o=e=>{switch(e){case"postgresql":return"postgres_fdw";case"stripe":return"stripe_fdw";default:return null}},n=e=>{switch(e){case"airtable":return r.IS_AIRTABLE_INTEGRATION_ENABLED;case"postgresql":return r.IS_POSTGRESQL_INTEGRATION_ENABLED;case"stripe":return r.IS_STRIPE_INTEGRATION_ENABLED;default:return null}},i=e=>{const t=n(e);return s(t)};export{u as D,o as g,i as u};
