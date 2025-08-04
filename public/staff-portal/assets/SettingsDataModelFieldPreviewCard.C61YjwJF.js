import{a as J,b as X,c as Z}from"./mutations.DtsxS3kK.js";import{bo as k,bp as _,be as ee,gT as te,br as W,gU as re,M as m,fA as N,gV as ae,b6 as P,bz as ne,fB as se,aJ as T,gW as ie,i as g,a_ as oe,af as c,gX as le,aP as x,d_ as V,aj as ce,R as U,gY as ue,gZ as de,r as $,g_ as pe,g$ as B,h0 as ge,h1 as me,g7 as ye,b3 as he,h2 as fe,h3 as p,a2 as E,eQ as Fe,h4 as b,d as G,h5 as Se,h6 as L,h7 as Ee,h8 as be,p as I,ao as Q,ab as Ce,j as u,a as F,h9 as Te,ha as Re,hb as ve,hc as Ae,hd as we,ad as Ve,n as y,f9 as ke,K as _e,L as Pe}from"./index.Dg3lKJeg.js";import{u as De}from"./DatabaseIdentifierMaximumLength.CM85nVoY.js";import{R as Oe,O as Ne,W as xe}from"./workspaceMemberQueryFragment.BaSCE7Jb.js";import{S as j}from"./SettingsFieldTypeConfigs.DAFrDVaZ.js";import{g as Ue,S as Le}from"./getObjectTypeLabel.CC2ZWRUI.js";const Me=e=>{var r,t,a;return{defaultValue:e.defaultValue,description:((r=e.description)==null?void 0:r.trim())??null,icon:e.icon,label:(t=e.label)==null?void 0:t.trim(),name:(a=e.name)==null?void 0:a.trim(),options:e.options,settings:e.settings,isLabelSyncedWithName:e.isLabelSyncedWithName}},We=()=>{const{refreshObjectMetadataItems:e}=k("network-only"),[r]=_(J),{refreshCachedViews:t}=De();return{createOneFieldMetadataItem:async n=>{const s=await r({variables:{input:{field:n}}});return await e(),await t(),s}}},$e=()=>{const[e]=_(X),{refreshObjectMetadataItems:r}=k("network-only"),[t,a]=ee(te),n=W(),s=async i=>{(t==null?void 0:t.fieldMetadataId)===i&&a({operation:re.COUNT,fieldMetadataId:null}),await n.refetchQueries({include:["FindManyViews"]})};return{deleteOneFieldMetadataItem:async i=>{const l=await e({variables:{idToDelete:i}});return await s(i),await r(),l}}};m`
  fragment AuthTokenFragment on AuthToken {
    token
    expiresAt
  }
`;m`
  fragment AuthTokensFragment on AuthTokenPair {
    accessToken {
      ...AuthTokenFragment
    }
    refreshToken {
      ...AuthTokenFragment
    }
  }
`;const Be=m`
  fragment AvailableWorkspaceFragment on AvailableWorkspace {
    id
    displayName
    loginToken
    inviteHash
    personalInviteToken
    workspaceUrls {
      subdomainUrl
      customUrl
    }
    logo
    sso {
      type
      id
      issuer
      name
      status
    }
  }
`,Ge=m`
  fragment AvailableWorkspacesFragment on AvailableWorkspaces {
    availableWorkspacesForSignIn {
      ...AvailableWorkspaceFragment
    }
    availableWorkspacesForSignUp {
      ...AvailableWorkspaceFragment
    }
  }
`,Ie=m`
  fragment WorkspaceUrlsFragment on WorkspaceUrls {
    subdomainUrl
    customUrl
  }
`,Qe=m`
  fragment DeletedWorkspaceMemberQueryFragment on DeletedWorkspaceMember {
    id
    name {
      firstName
      lastName
    }
    avatarUrl
    userEmail
  }
`,je=m`
  ${Oe}
  ${Ne}
  ${Ie}
  ${Ge}
  ${Be}
  fragment UserQueryFragment on User {
    id
    firstName
    lastName
    email
    canAccessFullAdminPanel
    canImpersonate
    supportUserHash
    onboardingStatus
    workspaceMember {
      ...WorkspaceMemberQueryFragment
    }
    workspaceMembers {
      ...WorkspaceMemberQueryFragment
    }
    deletedWorkspaceMembers {
      ...DeletedWorkspaceMemberQueryFragment
    }
    currentUserWorkspace {
      permissionFlags
      objectRecordsPermissions
      objectPermissions {
        ...ObjectPermissionFragment
      }
      twoFactorAuthenticationMethodSummary {
        twoFactorAuthenticationMethodId
        status
        strategy
      }
    }
    currentWorkspace {
      id
      displayName
      logo
      inviteHash
      allowImpersonation
      activationStatus
      isPublicInviteLinkEnabled
      isGoogleAuthEnabled
      isMicrosoftAuthEnabled
      isPasswordAuthEnabled
      subdomain
      hasValidEnterpriseKey
      customDomain
      isCustomDomainEnabled
      workspaceUrls {
        ...WorkspaceUrlsFragment
      }
      featureFlags {
        key
        value
      }
      metadataVersion
      currentBillingSubscription {
        id
        status
        interval
        metadata
        billingSubscriptionItems {
          id
          hasReachedCurrentPeriodCap
          quantity
          billingProduct {
            name
            description
            metadata {
              planKey
              priceUsageBased
              productKey
            }
          }
        }
      }
      billingSubscriptions {
        id
        status
        metadata
      }
      workspaceMembersCount
      defaultRole {
        ...RoleFragment
      }
      defaultAgent {
        id
      }
      isTwoFactorAuthenticationEnforced
    }
    availableWorkspaces {
      ...AvailableWorkspacesFragment
    }
    userVars
  }

  ${xe}
  ${Qe}
`,Ye=m`
  query GetCurrentUser {
    currentUser {
      ...UserQueryFragment
    }
  }

  ${je}
`,He=()=>{const e=N(),r=W(),{refreshObjectMetadataItems:t}=k("network-only"),{setRecordGroupsFromViewGroups:a}=ae(),n=N().cache,s=P(ne),{findManyRecordsQuery:o}=se({objectNameSingular:T.View,recordGqlFields:{id:!0,viewGroups:{id:!0,fieldMetadataId:!0,isVisible:!0,fieldValue:!0,position:!0}}}),[i]=_(Z);return{updateOneFieldMetadataItem:async({objectMetadataId:d,fieldMetadataIdToUpdate:v,updatePayload:S})=>{var D;const C=await i({variables:{idToUpdate:v,updatePayload:S}}),h=await t(),{data:f}=await e.query({query:Ye});s((D=f==null?void 0:f.currentUser)==null?void 0:D.currentWorkspace);const{data:A}=await r.query({query:o,variables:{filter:{objectMetadataId:{eq:d}}},fetchPolicy:"network-only"}),q=ie({recordConnection:A==null?void 0:A.views});for(const w of q){const O=h==null?void 0:h.find(z=>z.id===d);g(O)&&a(w.id,w.viewGroups,O),n.evict({id:`Views:${w.id}`})}return C}}},Rt=()=>{const{createOneFieldMetadataItem:e}=We(),{updateOneFieldMetadataItem:r}=He(),{deleteOneFieldMetadataItem:t}=$e();return{activateMetadataField:(i,l)=>r({objectMetadataId:l,fieldMetadataIdToUpdate:i,updatePayload:{isActive:!0}}),createMetadataField:i=>{const l=Me(i);return e({...l,objectMetadataId:i.objectMetadataId,type:i.type,label:l.label??"",name:l.name??"",isLabelSyncedWithName:l.isLabelSyncedWithName??!0,relationCreationPayload:i.relationCreationPayload})},deactivateMetadataField:(i,l)=>r({objectMetadataId:l,fieldMetadataIdToUpdate:i,updatePayload:{isActive:!1}}),deleteMetadataField:i=>t(i.id)}},vt=()=>oe(({snapshot:e})=>({fieldMetadataItem:r})=>{if(r.type!==c.RELATION)return null;const t=r.relation;if(!t)return null;const a=e.getLoadable(le({objectName:t.targetObjectMetadata.nameSingular,objectNameType:"singular"})).getValue();if(!a)return null;const n=a.fields.find(s=>s.id===t.targetFieldMetadata.id);return n?{relationFieldMetadataItem:n,relationObjectMetadataItem:a,relationType:t.type}:null},[]),Ke=e=>e in j,M="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2058%2046'%20width='58'%20height='46'%20fill='none'%20preserveAspectRatio='xMidYMid%20meet'%3e%3crect%20width='9'%20height='9'%20x='.5'%20y='18.5'%20stroke='%23EBEBEB'%20rx='2.5'%20/%3e%3crect%20width='4'%20height='4'%20x='3'%20y='21'%20fill='%23D6D6D6'%20rx='1'%20/%3e%3crect%20width='9'%20height='9'%20x='48.5'%20y='.5'%20stroke='%23EBEBEB'%20rx='2.5'%20/%3e%3crect%20width='4'%20height='4'%20x='51'%20y='3'%20fill='%23D6D6D6'%20rx='1'%20/%3e%3crect%20width='9'%20height='9'%20x='48.5'%20y='18.5'%20stroke='%23EBEBEB'%20rx='2.5'%20/%3e%3crect%20width='4'%20height='4'%20x='51'%20y='21'%20fill='%23D6D6D6'%20rx='1'%20/%3e%3crect%20width='9'%20height='9'%20x='48.5'%20y='36.5'%20stroke='%23EBEBEB'%20rx='2.5'%20/%3e%3crect%20width='4'%20height='4'%20x='51'%20y='39'%20fill='%23D6D6D6'%20rx='1'%20/%3e%3cpath%20fill='%23D6D6D6'%20d='M5.113%2022.5h48v1h-48v-1Z'%20/%3e%3cpath%20stroke='%23D6D6D6'%20d='M52.884%2041H45.06a7.544%207.544%200%200%201-7.56-7.561V12.56A7.544%207.544%200%200%201%2045.06%205h7.793'%20/%3e%3c/svg%3e",At={[V.ONE_TO_MANY]:{label:"Has many",Icon:x,imageSrc:M},[V.MANY_TO_ONE]:{label:"Belongs to one",Icon:x,imageSrc:M,isImageFlipped:!0}},R=e=>j[e],Y=ce({key:"settingsPreviewRecordIdState",defaultValue:null}),qe=({recordId:e,fieldName:r,value:t})=>{const a=U(Y),n=U(ue(a??"")),s=P(de({recordId:e,fieldName:r}));return $.useEffect(()=>{g(n)&&n[r]?s(n[r]):s(t)},[t,s,e,r,n]),null},ze=({record:e})=>{const{upsertRecords:r}=pe(),t=P(Y);return $.useEffect(()=>{r([e]),t(e.id)},[e,r,t]),null},H=({fieldMetadataItem:e})=>{var t,a;if(!Ke(e.type))return null;if(!B({fieldDefinition:{type:e.type},fieldValue:ge(e.defaultValue)}))return me({fieldMetadataItem:e});const r=R(e.type);return g(r)&&"exampleValues"in r&&g((t=r.exampleValues)==null?void 0:t[0])?(a=r.exampleValues)==null?void 0:a[0]:null},K=({objectMetadataItem:e,skip:r})=>{const t=ye(e),a=r||!t;let n;e.nameSingular===T.NoteTarget&&(n={id:!0,note:!0}),e.nameSingular===T.TaskTarget&&(n={id:!0,task:!0});const{records:s}=he({objectNameSingular:e.nameSingular,recordGqlFields:n,limit:1,skip:a});if(a)return null;const[o]=s;if(g(o)&&!B({fieldDefinition:{type:t.type},fieldValue:o==null?void 0:o[t.name]}))return o;const i=t.type===c.TEXT?e.labelSingular:H({fieldMetadataItem:t});return{__typename:fe(e.nameSingular),id:"",[t.name]:i}},Je=({relationObjectMetadataItem:e,skip:r})=>K({objectMetadataItem:e,skip:r}),Xe=({fieldMetadataItem:e})=>{var n,s,o;if(e.type!==c.ADDRESS)return null;const t=(n=R(c.ADDRESS).exampleValues)==null?void 0:n[0],a=(s=e.defaultValue)!=null&&s.addressCountry&&e.defaultValue.addressCountry!==""?p((o=e.defaultValue)==null?void 0:o.addressCountry):null;return{...t,addressCountry:a}},Ze=E.nativeEnum(Fe),et=E.object({amountMicros:E.number().nullable(),currencyCode:b.refine(e=>Ze.safeParse(p(e)).success,{message:"String is not a valid currencyCode"})}),tt=({fieldMetadataItem:e})=>{var a;if(e.type!==c.CURRENCY)return null;const t=(a=R(c.CURRENCY).exampleValues)==null?void 0:a[0];return et.transform(n=>({amountMicros:n.amountMicros||t.amountMicros,currencyCode:p(n.currencyCode)})).catch(t).parse(e.defaultValue)},rt=e=>{if(!(e!=null&&e.length))return E.array(b).nullable();const r=e.map(({value:t})=>t);return E.array(b.refine(t=>r.includes(p(t)),{message:`String is not a valid multi-select option, available options are: ${e.join(", ")}`})).nullable()},at=({fieldMetadataItem:e})=>{var t;if(e.type!==c.MULTI_SELECT||!((t=e.options)!=null&&t.length))return null;const r=e.options.map(({value:a})=>a);return rt(e.options).refine(g).transform(a=>a.map(p).filter(G.isNonEmptyString)).refine(Se).catch(r).parse(e.defaultValue)},nt=e=>be().includes(e),wt=e=>{if(!e||!nt(e))return`+${L}`;const r=Ee(e);return r?`+${r}`:`+${L}`},st=({fieldMetadataItem:e})=>{var s,o,i,l,d;if(e.type!==c.PHONES)return null;const t=(s=R(c.PHONES).exampleValues)==null?void 0:s[0],a=(o=e.defaultValue)!=null&&o.primaryPhoneCountryCode&&e.defaultValue.primaryPhoneCountryCode!==""?p((i=e.defaultValue)==null?void 0:i.primaryPhoneCountryCode):null,n=(l=e.defaultValue)!=null&&l.primaryPhoneCallingCode&&e.defaultValue.primaryPhoneCallingCode!==""?p((d=e.defaultValue)==null?void 0:d.primaryPhoneCallingCode):null;return{...t,primaryPhoneCountryCode:a,primaryPhoneCallingCode:n}},it=e=>{if(!(e!=null&&e.length))return b.nullable();const r=e.map(({value:t})=>t);return b.refine(t=>r.includes(p(t)),{message:`String is not a valid select option, available options are: ${e.join(", ")}`}).nullable()},ot=({fieldMetadataItem:e})=>{var t;if(e.type!==c.SELECT||!((t=e.options)!=null&&t.length))return null;const r=e.options[0].value;return it(e.options).refine(g).transform(p).refine(G.isNonEmptyString).catch(r).parse(e.defaultValue)},lt=({fieldMetadataItem:e,relationObjectMetadataItem:r,skip:t})=>{var n;const a=Je({relationObjectMetadataItem:r??{fields:[],labelSingular:"",labelIdentifierFieldMetadataId:"20202020-1000-4629-87e5-9a1fae1cc2fd",nameSingular:T.Company},skip:t||e.type!==c.RELATION||!r});if(t===!0)return null;switch(e.type){case c.CURRENCY:return tt({fieldMetadataItem:e});case c.RELATION:return((n=e.relation)==null?void 0:n.type)===V.MANY_TO_ONE?a:[a];case c.SELECT:return ot({fieldMetadataItem:e});case c.MULTI_SELECT:return at({fieldMetadataItem:e});case c.ADDRESS:return Xe({fieldMetadataItem:e});case c.PHONES:return st({fieldMetadataItem:e});default:return H({fieldMetadataItem:e})}},ct=y.div`
  align-items: center;
  background-color: ${({theme:e})=>e.background.primary};
  border: 1px solid ${({theme:e})=>e.border.color.medium};
  border-radius: ${({theme:e})=>e.border.radius.sm};
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
  height: fit-content;
  line-height: 24px;
  overflow: hidden;
  padding: 0
    ${({shrink:e,theme:r})=>e?r.spacing(1):r.spacing(2)};
  white-space: nowrap;
  margin-top: ${({theme:e})=>e.spacing(2)};
  padding-top: ${({theme:e})=>e.spacing(2)};
  padding-bottom: ${({theme:e})=>e.spacing(2)};
`,ut=y.div`
  align-items: center;
  color: ${({theme:e})=>e.font.color.tertiary};
  display: flex;
  gap: ${({theme:e})=>e.spacing(1)};
`,dt=({fieldMetadataItem:e,objectMetadataItem:r,relationObjectMetadataItem:t,shrink:a,withFieldLabel:n=!0})=>{var h,f;const s=I(),{getIcon:o}=Q(),i=o(e.icon),l=!!e.id&&!!e.name&&Ce({fieldMetadataItem:{id:e.id,name:e.name},objectMetadataItem:r}),d=K({objectMetadataItem:r,skip:!l}),v=lt({fieldMetadataItem:e,relationObjectMetadataItem:t,skip:l}),S=e.name||`${e.type}-new-field`,C=(d==null?void 0:d.id)??`${r.nameSingular}-${S}-${(h=e.relation)==null?void 0:h.type}-${t==null?void 0:t.nameSingular}-preview`;return u(Ve,{children:F(we.Provider,{value:{instanceId:"record-field-component-instance-id"},children:[g(d)?u(ze,{record:d}):u(qe,{recordId:C,fieldName:S,value:v}),F(ct,{shrink:a,children:[!!n&&F(ut,{children:[u(i,{size:s.icon.size.md,stroke:s.icon.stroke.sm}),e.label,":"]}),u(Te.Provider,{value:{recordId:C,isLabelIdentifier:l,fieldDefinition:{type:e.type,iconName:"FieldIcon",fieldMetadataId:e.id||"",label:e.label,metadata:{fieldName:S,objectMetadataNameSingular:r.nameSingular,relationObjectMetadataNameSingular:t==null?void 0:t.nameSingular,options:e.options??[],settings:e.settings,relationType:(f=e.relation)==null?void 0:f.type},defaultValue:e.defaultValue},isReadOnly:!1,disableChipClick:!0},children:e.type===c.BOOLEAN?u(Re,{readonly:!0}):e.type===c.RATING?u(ve,{readonly:!0}):u(Ae,{})})]})]})})},pt=y.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`,gt=y.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
  max-width: 60%;
`,mt=y.div`
  flex-shrink: 0;
`,yt=({className:e,objectMetadataItem:r,pluralizeLabel:t=!0})=>{const a=I(),{getIcon:n}=Q(),s=n(r.icon),o=Ue(r);return F(pt,{className:e,children:[F(gt,{children:[u(mt,{children:u(s,{size:a.icon.size.sm,stroke:a.icon.stroke.md})}),u(ke,{text:t?r.labelPlural:r.labelSingular})]}),u(Le,{objectTypeLabel:o})]})},ht=y(Pe)`
  border-radius: ${({theme:e})=>e.border.radius.md};
  color: ${({theme:e})=>e.font.color.primary};
`,ft=y(_e)`
  padding: ${({theme:e})=>e.spacing(2)};
`,Vt=({className:e,fieldMetadataItem:r,objectMetadataItem:t,relationObjectMetadataItem:a,shrink:n,withFieldLabel:s=!0,pluralizeLabel:o=!1})=>u(ht,{className:e,fullWidth:!0,children:F(ft,{children:[u(yt,{objectMetadataItem:t,pluralizeLabel:o}),u(dt,{objectMetadataItem:t,fieldMetadataItem:r,relationObjectMetadataItem:a,shrink:n,withFieldLabel:s})]})});export{At as R,yt as S,vt as a,He as b,Vt as c,et as d,wt as e,Me as f,R as g,Ke as i,rt as m,it as s,Rt as u};
