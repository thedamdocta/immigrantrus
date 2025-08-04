import{D as e}from"./useIsSettingsIntegrationEnabled.B5bcKBF5.js";import{M as t}from"./index.Dg3lKJeg.js";const o=t`
  ${e}
  query GetManyDatabaseConnections($input: RemoteServerTypeInput!) {
    findManyRemoteServersByType(input: $input) {
      ...RemoteServerFields
    }
  }
`;export{o as G};
