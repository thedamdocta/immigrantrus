import{p as F,N as T,r as d,be as $,a7 as z,ao as D,a as l,j as s,bf as I,h as n,l as h,H as R,n as o,_ as L,B as x,T as B,R as N,z as H,bd as J,ad as W}from"./index.Dg3lKJeg.js";import{S as A}from"./SettingsPageContainer.CJeLyK8s.js";import{b as y,S as E}from"./SettingsRolesQueryEffect.DrlzoG9A.js";import{h as M,i as V}from"./hasPermissionOverride.DGOjBu0b.js";import{S as j}from"./SettingsCard.EuecTdsf.js";import{S as X}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./Breadcrumb.CQyf5Hn6.js";const q=o.div`
  display: flex;
  flex-direction: column;
  gap: inherit;
  width: 100%;
`,C=o.div`
  display: flex;
  gap: ${({theme:t})=>t.spacing(2)};
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
`,O=o.div`
  cursor: pointer;
  display: flex;
  position: relative;
  width: calc(50% - ${({theme:t})=>t.spacing(1)});
`,G=o.div`
  padding-bottom: ${({theme:t})=>t.spacing(2)};
`,K=o(L)`
  input {
    background: ${({theme:t})=>t.background.transparent.lighter};
    border: 1px solid ${({theme:t})=>t.border.color.medium};
  }
`,Q=({roleId:t})=>{const r=F(),P=T(),[a,v]=d.useState(""),[c,_]=$(y(t)),{alphaSortedActiveNonSystemObjectMetadataItems:u}=z(),{getIcon:p}=D(),k=e=>{v(e)},g=e=>{_(i=>({...i,objectPermissions:[...(i.objectPermissions??[]).filter(w=>w.objectMetadataId!==e),{objectMetadataId:e,canReadObjectRecords:null,canUpdateObjectRecords:null,canSoftDeleteObjectRecords:null,canDestroyObjectRecords:null}]})),P(x.RoleObjectLevel,{roleId:t,objectMetadataId:e})},m=d.useMemo(()=>{var e;return((e=c.objectPermissions)==null?void 0:e.filter(i=>M(i,c)).map(i=>i.objectMetadataId))??[]},[c]),S=d.useMemo(()=>u.filter(e=>e.labelPlural.toLowerCase().includes(a.toLowerCase())&&!m.includes(e.id)&&!V(e.nameSingular)),[u,a,m]),f=S.filter(e=>!e.isCustom),b=S.filter(e=>e.isCustom);return l(q,{children:[s(h,{children:s(G,{children:s(K,{instanceId:"role-permissions-object-search",value:a,onChange:k,placeholder:n._({id:"pFe0YS"}),fullWidth:!0,LeftIcon:I,sizeVariant:"lg"})})}),f.length>0&&l(h,{children:[s(R,{title:n._({id:"TJBHlP"}),description:n._({id:"XuuWVF"})}),s(C,{children:f.map(e=>{const i=p(e.icon);return s(O,{onClick:()=>g(e.id),children:s(j,{Icon:s(i,{size:r.icon.size.lg,stroke:r.icon.stroke.sm}),title:e.labelPlural})},e.id)})})]}),b.length>0&&l(h,{children:[s(R,{title:n._({id:"8Tg/JR"}),description:n._({id:"pPTmfc"})}),s(C,{children:b.map(e=>{const i=p(e.icon);return s(O,{onClick:()=>g(e.id),children:s(j,{Icon:s(i,{size:r.icon.size.lg,stroke:r.icon.stroke.sm}),title:e.labelPlural},e.id)},e.id)})})]})]})},ne=()=>{const{roleId:t}=B(),r=N(y(t??""));return t?l(W,{children:[s(E,{}),s(X,{title:n._({id:"XSdCGq"}),links:[{children:n._({id:"5dJK4M"}),href:"/settings/roles"},{children:r.label??"",href:`/settings/roles/${t}`},{children:n._({id:"mFtRj8"}),href:`/settings/roles/${t}/add-object-permission`}],children:s(A,{children:s(Q,{roleId:t})})})]}):s(J,{to:H(x.Roles)})};export{ne as SettingsRoleAddObjectLevel};
