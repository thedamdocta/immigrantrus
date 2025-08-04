import{a as o,j as t,h as n,p as w,ad as R,de as _,df as E,d2 as V,n as c,R as T,i as S,be as F,H as G,l as J,dg as B,z as j,ae as H,B as m,T as N,bd as k}from"./index.Dg3lKJeg.js";import{b as x,S as U}from"./SettingsRolesQueryEffect.DrlzoG9A.js";import{S as z}from"./SettingsPageContainer.CJeLyK8s.js";import{S as D}from"./TableHeader.D43eMMOy.js";import{T as I,S as L}from"./TableRow.BM7bNp8J.js";import{S as A,o as W,P as Z}from"./PermissionIcon.DB5sLPb9.js";import{S as X}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./IconTrashOff.DiMVUIb1.js";import"./Breadcrumb.CQyf5Hn6.js";const Y=()=>o(I,{gridAutoColumns:"1fr 48px",children:[t(D,{children:n._({id:"6YtxFj"})}),t(D,{"aria-label":n._({id:"7L01XJ"})})]}),Q=c.div`
  align-items: center;
  display: inline-flex;
  justify-content: flex-start;
  width: 48px;
`,O=c.div`
  align-items: center;
  display: flex;
  height: 24px;
  justify-content: center;
  width: 24px;
`,C=c.div`
  align-items: center;
  cursor: ${({isDisabled:e})=>e?"not-allowed":"pointer"};
  display: flex;
  height: 100%;
  justify-content: center;
  opacity: ${({isDisabled:e})=>e?.5:1};
  width: 100%;
`,q=({type:e="default",onChange:i,checked:b,disabled:r})=>{const a=w();return o(Q,{children:[e==="default"&&o(R,{children:[t(O,{children:t(_,{checked:!0,disabled:!0})}),t(O,{children:t(C,{onClick:r?void 0:i,isDisabled:r,children:t(E,{size:a.icon.size.md,color:a.font.color.secondary})})})]}),e==="override"&&o(R,{children:[t(O,{children:t(_,{checked:!1,disabled:!0})}),t(O,{children:t(C,{onClick:r?void 0:i,isDisabled:r,children:t(V,{size:a.icon.size.md,color:a.adaptiveColors.orange4})})})]}),e==="no_cta"&&t(O,{children:t(_,{checked:b,disabled:r,onChange:i})})]})},K=c(I)`
  align-items: center;
  display: flex;
  cursor: ${({isDisabled:e})=>e?"default":"pointer"};
`,ee=c(L)`
  align-items: center;
  display: flex;
  flex: 1;
  gap: ${({theme:e})=>e.spacing(1)};
  padding-left: ${({theme:e})=>e.spacing(2)};
`,te=c.div`
  align-items: center;
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
`,se=c.span`
  color: ${({theme:e})=>e.font.color.primary};
`,ae=c.div`
  align-items: center;
  color: ${({theme:e})=>e.font.color.tertiary};
  display: flex;
  gap: ${({theme:e})=>e.spacing(1)};
`,ie=c(L)`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding-right: ${({theme:e})=>e.spacing(4)};
`,ne=({permission:e,isEditable:i,settingsDraftRoleObjectPermissions:b,roleId:r})=>{const a=T(x(r)),f=e.label,u=A,h=b[e.key],y=u[e.key],s=a[y],d=!!h,g=S(h)&&s===!0&&d===!1,v=S(h)&&s===!1&&d===!0,p=h!==!1&&s===!0;let l;s===!0&&h===!1?l="override":s===!1?l="no_cta":l="default";const P=()=>{i&&(l==="default"?e.setValue(!1):l==="override"?e.setValue(null):l==="no_cta"&&e.setValue(!d))},M=W(e.key);return o(K,{onClick:P,isDisabled:!i,children:[o(ee,{children:[o(te,{children:[t(Z,{permission:e.key,state:g?"revoked":"granted"}),t(se,{children:f})]}),t(ae,{children:g?o(R,{children:[" · ",n._({id:"GG37FL"})]}):v?o(R,{children:[" · ",n._({id:"WUgtid"})]}):p?o(R,{children:[" · ",n._({id:"vbLBMd",values:{humanReadableAction:M}})]}):null})]}),t(ie,{onClick:$=>$.stopPropagation(),children:t(q,{onChange:P,disabled:!i,type:l,checked:d})})]})},le=c.div`
  border-bottom: 1px solid ${({theme:e})=>e.border.color.light};
`,oe=c.div`
  padding-bottom: ${({theme:e})=>e.spacing(2)};
  padding-top: ${({theme:e})=>e.spacing(2)};
`,ce=({roleId:e,objectMetadataItem:i})=>{var y;const[b,r]=F(x(e)),a=(y=b.objectPermissions)==null?void 0:y.find(s=>s.objectMetadataId===i.id);if(!a)return null;const f=i.labelPlural,u=(s,d)=>{r(g=>{if(!g.objectPermissions)return g;const v=g.objectPermissions.map(p=>{if(p.objectMetadataId!==i.id)return p;const l={...p,[s]:d};return(s==="canUpdateObjectRecords"||s==="canSoftDeleteObjectRecords"||s==="canDestroyObjectRecords")&&d!==!1&&(l.canReadObjectRecords=d),s==="canReadObjectRecords"&&!d&&(l.canUpdateObjectRecords=!1,l.canSoftDeleteObjectRecords=!1,l.canDestroyObjectRecords=!1),l});return{...g,objectPermissions:v}})},h=[{key:"canReadObjectRecords",label:n._({id:"rJnbMG",values:{objectLabel:f}}),value:a.canReadObjectRecords,setValue:s=>{u("canReadObjectRecords",s)}},{key:"canUpdateObjectRecords",label:n._({id:"fGxkii",values:{objectLabel:f}}),value:a.canUpdateObjectRecords,setValue:s=>{u("canUpdateObjectRecords",s)}},{key:"canSoftDeleteObjectRecords",label:n._({id:"2nRIIp",values:{objectLabel:f}}),value:a.canSoftDeleteObjectRecords,setValue:s=>{u("canSoftDeleteObjectRecords",s)}},{key:"canDestroyObjectRecords",label:n._({id:"vI0W/N",values:{objectLabel:f}}),value:a.canDestroyObjectRecords,setValue:s=>{u("canDestroyObjectRecords",s)}}];return o(J,{children:[t(G,{title:n._({id:"YJgmMZ"}),description:n._({id:"N4ZcCd"})}),o(le,{children:[t(Y,{}),t(oe,{children:h.map(s=>t(ne,{permission:s,isEditable:b.isEditable,settingsDraftRoleObjectPermissions:a,roleId:e},s.key))})]})]})},re=({roleId:e,objectMetadataId:i})=>{const b=T(x(e)),a=B({objectId:i}).objectMetadataItem,f=a.labelSingular,u=a.labelPlural;return t(X,{title:n._({id:"0Tx9MD",values:{objectLabelPlural:u}}),links:[{children:n._({id:"pmUArF"}),href:j(m.Workspace)},{children:n._({id:"5dJK4M"}),href:j(m.Roles)},{children:b.label,href:j(m.RoleDetail,{roleId:e})},{children:n._({id:"KiuPPj",values:{objectLabelSingular:f}})}],actionButton:t(H,{title:n._({id:"JmZ/+d"}),variant:"secondary",size:"small",accent:"blue",to:j(m.RoleDetail,{roleId:e})}),children:t(z,{children:t(ce,{objectMetadataItem:a,roleId:e})})})},pe=()=>{const{roleId:e,objectMetadataId:i}=N();return S(e)?S(i)?o(R,{children:[t(U,{}),t(re,{roleId:e,objectMetadataId:i})]}):t(k,{to:j(m.RoleDetail,{roleId:e})}):t(k,{to:j(m.Roles)})};export{pe as SettingsRoleObjectLevel};
