import{M as S,br as T,bp as C,bs as _,j as a,a as d,L as v,n as b,K as k,dz as j,dA as B,dB as x,eJ as w,bx as U,E as F,cm as P,d9 as Q,eK as q,ad as p,a6 as z,bO as Y,bE as G,fy as V,r as m,fz as H,fA as A,fB as L,aJ as $,i as E,d2 as K,ae as J,a1 as W,aG as X,fC as h,a2 as f,N as Z,z as R,B as y,H as N}from"./index.Dg3lKJeg.js";import{S as ee}from"./SettingsPageContainer.CJeLyK8s.js";import{G as te}from"./findManyDatabaseConnections.CX9HXIjR.js";import{S as ae}from"./SettingsIntegrationDatabaseConnectionSyncStatus.Cf7HBNS4.js";import{R as I}from"./useGetDatabaseConnectionTables.CekobOmF.js";import{S as ne}from"./SettingsListCard.8D1EoUNq.js";import{u as oe}from"./useDatabaseConnection.CZtEeBAJ.js";import{B as se}from"./Breadcrumb.CQyf5Hn6.js";import{S as O}from"./index.DYjQm0RB.js";import{S as ie}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./useIsSettingsIntegrationEnabled.B5bcKBF5.js";import"./useSettingsIntegrationCategories.BCNgJ2AL.js";const re=S`
  mutation deleteServer($input: RemoteServerIdInput!) {
    deleteOneRemoteServer(input: $input) {
      id
    }
  }
`,ce=()=>{const e=T(),[t]=C(re,{client:e});return{deleteOneDatabaseConnection:async o=>await t({variables:{input:o},awaitRefetchQueries:!0,refetchQueries:[_(te)??""]})}},le=b(k)`
  align-items: center;
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
  padding: ${({theme:e})=>e.spacing(2)};
  min-height: ${({theme:e})=>e.spacing(6)};
`,de=b.div`
  color: ${({theme:e})=>e.font.color.primary};
  display: flex;
  font-weight: ${({theme:e})=>e.font.weight.medium};
  gap: ${({theme:e})=>e.spacing(2)};
  margin-right: auto;
`,me=({title:e,rightComponent:t})=>a(v,{children:d(le,{children:[a(de,{children:e}),t]})}),ue=b.div`
  align-items: center;
  display: flex;
  height: ${({theme:e})=>e.spacing(4)};
  justify-content: center;
  width: ${({theme:e})=>e.spacing(4)};
`,be=b.img`
  height: 100%;
`,ge=({databaseLogoUrl:e,connectionId:t,connectionLabel:n,onRemove:o})=>a(me,{title:d(p,{children:[a(ue,{children:a(be,{alt:"",src:e})}),n]}),rightComponent:d(p,{children:[a(ae,{connectionId:t,shouldFetchPendingSchemaUpdates:!0}),a(j,{dropdownId:"settings-integration-database-connection-summary-card-dropdown",clickableComponent:a(Q,{Icon:q,accent:"tertiary"}),dropdownComponents:a(B,{children:d(x,{children:[a(w,{LeftIcon:U,text:"Remove",onClick:o}),a(F,{to:"./edit",children:a(w,{LeftIcon:P,text:"Edit"})})]})})})]})}),he=S`
  ${I}
  mutation syncRemoteTable($input: RemoteTableInput!) {
    syncRemoteTable(input: $input) {
      ...RemoteTableFields
    }
  }
`,M=({cache:e,fieldModifiers:t,remoteTableName:n})=>{const o=`RemoteTable:{"name":"${n}"}`;e.modify({id:o,fields:t,optimistic:!0})},D=({skip:e}={})=>{const{enqueueErrorSnackBar:t}=z(),{data:n,loading:o,error:s,refetch:l}=Y(V,{skip:e,onError:r=>{G("useFindManyObjectMetadataItems error : "+r),t({apolloError:r})}});return{objectMetadataItems:m.useMemo(()=>H({pagedObjectMetadataItems:n}),[n]),loading:o,error:s,refetch:l}},pe=()=>{const e=T(),t=A(),{refetch:n}=D(),{findManyRecordsQuery:o}=L({objectNameSingular:$.View}),[s]=C(he,{client:e});return{syncRemoteTable:m.useCallback(async c=>{const r=await s({variables:{input:c},update:(g,{data:i})=>{E(i)&&M({cache:g,remoteTableName:c.name,fieldModifiers:{status:()=>i.syncRemoteTable.status}})}});return await n(),await t.query({query:o,fetchPolicy:"network-only"}),r},[t,o,s,n])}},ye=S`
  ${I}
  mutation syncRemoteTableSchemaChanges($input: RemoteTableInput!) {
    syncRemoteTableSchemaChanges(input: $input) {
      ...RemoteTableFields
    }
  }
`,Se=()=>{const e=T(),t=A(),{refetch:n}=D(),{findManyRecordsQuery:o}=L({objectNameSingular:$.View}),[s,l]=C(ye,{client:e});return{syncRemoteTableSchemaChanges:m.useCallback(async r=>{const g=await s({variables:{input:r},update:(i,{data:u})=>{E(u)&&M({cache:i,remoteTableName:r.name,fieldModifiers:{schemaPendingUpdates:()=>u.syncRemoteTableSchemaChanges.schemaPendingUpdates||[],status:()=>u.syncRemoteTableSchemaChanges.status}})}});return await n(),await t.query({query:o,fetchPolicy:"network-only"}),g},[s,n,o,t]),isLoading:l.loading}},Te=S`
  ${I}
  mutation unsyncRemoteTable($input: RemoteTableInput!) {
    unsyncRemoteTable(input: $input) {
      ...RemoteTableFields
    }
  }
`,Ce=()=>{const e=T(),{refetch:t}=D(),[n]=C(Te,{client:e});return{unsyncRemoteTable:m.useCallback(async s=>{const l=await n({variables:{input:s},update:(c,{data:r})=>{E(r)&&M({cache:c,remoteTableName:s.name,fieldModifiers:{status:()=>r.unsyncRemoteTable.status}})}});return await t(),l},[n,t])}},fe=b.h3`
  color: ${({theme:e})=>e.font.color.tertiary};
  font-size: ${({theme:e})=>e.font.size.md};
  font-weight: ${({theme:e})=>e.font.weight.regular};
  margin: 0;
`,Re=({updatesText:e,onUpdate:t})=>d(p,{children:[e&&a(fe,{children:e}),e&&a(J,{Icon:K,title:"Update",size:"small",onClick:t})]}),Ee=({tableName:e,tableStatus:t,onSyncUpdate:n})=>{const[o,s]=m.useState(!1),l=async c=>{o||(s(!0),await n(c,e),s(!1))};return a(X,{value:t===W.SYNCED,disabled:o,onChange:l})};f.object({syncedTablesByName:f.record(f.boolean())});const Ie=b.div`
  align-items: center;
  display: flex;
  gap: ${({theme:e})=>e.spacing(1)};
`,Me=e=>e.includes(h.TABLE_DELETED)?"Table has been deleted":e.includes(h.COLUMNS_ADDED)&&e.includes(h.COLUMNS_DELETED)?"Columns have been added and other deleted":e.includes(h.COLUMNS_ADDED)?"Columns have been added":e.includes(h.COLUMNS_DELETED)?"Columns have been deleted":null,De=({connectionId:e,tables:t})=>{const{syncRemoteTable:n}=pe(),{unsyncRemoteTable:o}=Ce(),{syncRemoteTableSchemaChanges:s}=Se(),l=t.map(i=>({...i,id:i.name,updatesText:i.schemaPendingUpdates?Me(i.schemaPendingUpdates):null})),c=m.useCallback(async(i,u)=>{i?await n({remoteServerId:e,name:u}):await o({remoteServerId:e,name:u})},[n,e,o]),r=m.useCallback(async i=>s({remoteServerId:e,name:i}),[s,e]),g=m.useCallback(({item:i})=>d(Ie,{children:[i.updatesText&&a(Re,{updatesText:i.updatesText,onUpdate:()=>r(i.name)}),a(Ee,{tableName:i.name,tableStatus:i.status,onSyncUpdate:c})]}),[r,c]);return a(ne,{items:l,RowRightComponent:g,getItemLabel:i=>i.id})},we=()=>{const e=Z(),{connection:t,integration:n,databaseKey:o,tables:s}=oe({fetchPolicy:"network-only"}),{deleteOneDatabaseConnection:l}=ce();if(!t||!n)return null;const c=async()=>{await l({id:t.id}),e(y.IntegrationDatabase,{databaseKey:o})},r=R(y.Integrations);return d(p,{children:[a(se,{links:[{children:"Integrations",href:r},{children:n.text,href:`${r}/${o}`},{children:t.label}]}),d(O,{children:[a(N,{title:"About",description:"About this remote object"}),a(ge,{databaseLogoUrl:n.from.image,connectionId:t.id,connectionLabel:t.label,onRemove:c})]}),d(O,{children:[a(N,{title:"Tables",description:"Select the tables that should be tracked"}),!!(s!=null&&s.length)&&a(De,{connectionId:t.id,tables:s})]})]})},Fe=()=>a(ie,{title:"Database Connection",links:[{children:"Workspace",href:R(y.Workspace)},{children:"Integrations",href:R(y.Integrations)},{children:"Database Connection"}],children:a(ee,{children:a(we,{})})});export{Fe as SettingsIntegrationShowDatabaseConnection};
