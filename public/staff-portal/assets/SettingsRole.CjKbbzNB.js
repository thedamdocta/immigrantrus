import{M as pe,b6 as Le,be as j,gB as Ue,R as A,da as q,a as u,h as a,j as t,c$ as me,ad as I,n as m,by as Se,eJ as Be,i as C,gC as We,r as Q,gD as ze,aJ as He,o as Ge,eI as Ve,gE as Ke,gs as Je,dB as Qe,dA as qe,f9 as Z,N as X,bv as ue,eH as Xe,cw as Ye,bT as Re,gF as Ze,l as E,H as L,bf as et,dz as tt,ae as ne,bn as fe,cb as be,cc as he,_ as ye,B as $,ao as nt,p as Oe,z as ee,J as st,a7 as ot,de as Y,gG as le,gH as ce,b9 as Ae,gI as v,fp as te,dt as at,e0 as _e,eX as it,gJ as lt,gK as Ce,L as Ie,d1 as ct,gL as rt,gM as dt,gx as gt,gN as pt,c7 as mt,$ as St,gO as ut,bc as ve,b8 as Rt,gP as ft,gQ as bt,gR as ht,gS as yt,bw as Ot,a6 as At,dq as _t,c1 as Ct,bs as P}from"./index.Dg3lKJeg.js";import{S as It}from"./SaveAndCancelButtons.DdB8J98L.js";import{S as vt}from"./SettingsPageContainer.CJeLyK8s.js";import{W as Tt,R as Dt,O as jt}from"./workspaceMemberQueryFragment.BaSCE7Jb.js";import{a as Te,b as y,c as kt}from"./SettingsRolesQueryEffect.DrlzoG9A.js";import{S as Mt}from"./SettingsCard.EuecTdsf.js";import{S as T}from"./TableHeader.D43eMMOy.js";import{T as N,S as D}from"./TableRow.BM7bNp8J.js";import{s as xt}from"./settingsAllRolesSelector.Cs6X5zRZ.js";import{i as re,h as $t}from"./hasPermissionOverride.DGOjBu0b.js";import{o as Et,P as De,S as je}from"./PermissionIcon.DB5sLPb9.js";import{S as Nt}from"./Table.6yesK_WS.js";import{S as ke}from"./SettingsOptionCardContentToggle.DYPf28jM.js";import{I as wt}from"./IconCode.yCarJIAU.js";import{I as Pt}from"./IconHierarchy.AHdo6y-J.js";import{S as Ft}from"./SubMenuTopBarContainer.BNGFwgBo.js";const Lt=pe`
  fragment PermissionFlagFragment on PermissionFlag {
    id
    flag
    roleId
  }
`,F=pe`
  ${Tt}
  ${Dt}
  ${Lt}
  ${jt}
  query GetRoles {
    getRoles {
      ...RoleFragment
      workspaceMembers {
        ...WorkspaceMemberQueryFragment
      }
      permissionFlags {
        ...PermissionFlagFragment
      }
      objectPermissions {
        ...ObjectPermissionFragment
      }
    }
  }
`,Me=e=>{const o=Le(Te(e)),[n,i]=j(y(e)),[s]=Ue();return{addWorkspaceMemberToRoleAndUpdateState:async({workspaceMemberId:p})=>{const{data:R}=await s({variables:{workspaceMemberId:p,roleId:e}});if((R==null?void 0:R.updateWorkspaceMemberRole)!==void 0){const f=R.updateWorkspaceMemberRole,b=[...n.workspaceMembers,{id:f.id,name:f.name,colorScheme:f.colorScheme,userEmail:f.userEmail}],g={...n,workspaceMembers:b};o(g),i(g)}return R==null?void 0:R.updateWorkspaceMemberRole},updateWorkspaceMemberRoleDraftState:({workspaceMember:p})=>{i({...n,workspaceMembers:[...n.workspaceMembers,{id:p.id,name:p.name,colorScheme:p.colorScheme,userEmail:p.userEmail}]})},addWorkspaceMembersToRole:async({roleId:p,workspaceMemberIds:R})=>{await Promise.all(R.map(f=>s({variables:{roleId:p,workspaceMemberId:f}})))}}},Ut=m.div`
  margin-top: ${({theme:e})=>e.spacing(6)};
`,Bt=({selectedWorkspaceMember:e,onRoleClick:o})=>{var r;const i=A(q).find(d=>d.id===e.id),s=`${i==null?void 0:i.name.firstName} ${i==null?void 0:i.name.lastName}`;return u(I,{children:[a._({id:"WN9tFl",values:{workspaceMemberName:s}}),t(Ut,{children:t(Mt,{title:((r=e.role)==null?void 0:r.label)||"",Icon:t(me,{avatarUrl:i==null?void 0:i.avatarUrl,placeholderColorSeed:i==null?void 0:i.id,placeholder:s,size:"md",type:"rounded"}),onClick:()=>e.role&&o(e.role.id)})})]})},J="role-assignment-confirmation-modal",Wt=({selectedWorkspaceMember:e,onClose:o,onConfirm:n,onRoleClick:i})=>{const s=e.name,r=a._({id:"9ch9Mz",values:{workspaceMemberName:s}});return t(Se,{modalId:J,title:r,subtitle:t(Bt,{selectedWorkspaceMember:e,onRoleClick:i}),onClose:o,onConfirmClick:n,confirmButtonText:a._({id:"7VpPHA"}),confirmButtonAccent:"danger"})},zt=()=>u(N,{gridAutoColumns:"2fr 4fr",children:[t(T,{children:a._({id:"6YtxFj"})}),t(T,{children:a._({id:"O3oNi5"})})]}),Ht=({loading:e,searchFilter:o,filteredWorkspaceMembers:n,onSelect:i})=>{const s=A(q);if(e)return null;if(!n.length&&o.length>0)return t(Be,{disabled:!0,text:a._({id:"MA3x23"})});const r=n.map(d=>s.find(l=>l.id===d.recordId)).filter(C);return t(I,{children:r.map(d=>{const l=`${(d==null?void 0:d.name.firstName)??""} ${(d==null?void 0:d.name.lastName)??""}`;return t(We,{onClick:()=>i(d),avatar:{type:"rounded",size:"md",placeholder:l,placeholderColorSeed:d.id,avatarUrl:d.avatarUrl},text:l,contextualText:d.userEmail},d.id)})})},Gt=({excludedWorkspaceMemberIds:e,onSelect:o})=>{const[n,i]=Q.useState(""),{loading:s,searchRecords:r}=ze({objectNameSingular:He.WorkspaceMember,searchInput:n}),d=(r==null?void 0:r.filter(f=>!e.includes(f.recordId)))??[],l=f=>{i(f.target.value)},{i18n:p,_:R}=Ge();return u(qe,{widthInPixels:Ve.ExtraLarge,children:[t(Ke,{value:n,onChange:l,placeholder:p._({id:"A1taO8"})}),t(Je,{}),t(Qe,{hasMaxHeight:!0,children:t(Ht,{loading:s,searchFilter:n,filteredWorkspaceMembers:d,onSelect:o})})]})},Vt=m.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  margin-right: ${({theme:e})=>e.spacing(2)};
`,Kt=m.div`
  color: ${({theme:e})=>e.font.color.primary};
  flex: 1;
  min-width: 0;
`,Jt=m.div`
  align-items: center;
  display: flex;
  overflow: hidden;
  width: 100%;
`,de=m(D)`
  overflow: hidden;
`,Qt=({workspaceMember:e})=>{const n=A(q).find(i=>i.id===e.id);return u(N,{gridAutoColumns:"2fr 4fr",children:[t(de,{children:u(Jt,{children:[t(Vt,{children:t(me,{avatarUrl:n==null?void 0:n.avatarUrl,placeholderColorSeed:n==null?void 0:n.id,placeholder:(n==null?void 0:n.name.firstName)??"",type:"rounded",size:"md"})}),t(Kt,{children:t(Z,{text:`${e.name.firstName} ${e.name.lastName}`})})]})}),t(de,{children:t(Z,{text:e.userEmail})})]})},qt=m.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${({theme:e})=>e.spacing(2)};
  padding-bottom: ${({theme:e})=>e.spacing(2)};
`,Xt=m.div`
  padding-bottom: ${({theme:e})=>e.spacing(2)};
`,Yt=m(ye)`
  input {
    background: ${({theme:e})=>e.background.transparent.lighter};
    border: 1px solid ${({theme:e})=>e.border.color.medium};
  }
`,Zt=m.div`
  border-bottom: 1px solid ${({theme:e})=>e.border.color.light};
`,en=m.div`
  gap: ${({theme:e})=>e.spacing(.5)};
  padding-bottom: ${({theme:e})=>e.spacing(2)};
  padding-top: ${({theme:e})=>e.spacing(2)};
`,tn=m(D)`
  color: ${({theme:e})=>e.font.color.tertiary};
`,nn=({roleId:e,isCreateMode:o})=>{const n=A(y(e)),i=X(),{addWorkspaceMemberToRoleAndUpdateState:s,updateWorkspaceMemberRoleDraftState:r}=Me(e),{openModal:d,closeModal:l}=ue(),[p,R]=Q.useState(null),f="role-member-select",{closeDropdown:b}=Xe(),[g,k]=Q.useState(""),c=A(q),_=A(Ye),U=A(xt),w=new Map;U.forEach(S=>{S.workspaceMembers.forEach(M=>{w.set(M.id,{id:S.id,label:S.label})})});const B=g?n.workspaceMembers.filter(S=>{var oe,ae,ie;const M=g.toLowerCase(),we=((oe=S.name.firstName)==null?void 0:oe.toLowerCase())||"",Pe=((ae=S.name.lastName)==null?void 0:ae.toLowerCase())||"",Fe=((ie=S.userEmail)==null?void 0:ie.toLowerCase())||"";return we.includes(M)||Pe.includes(M)||Fe.includes(M)}):n.workspaceMembers,W=n.workspaceMembers.map(S=>S.id),z=c.filter(S=>S.id!==(_==null?void 0:_.id)).every(S=>W.includes(S.id)),O=()=>{R(null)},H=S=>{const M=w.get(S.id);R({id:S.id,name:`${S.name.firstName} ${S.name.lastName}`,role:M}),d(J),b(f)},G=Re(Ze,J),V=async()=>{if(!(!p||!G)){if(!o)await s({workspaceMemberId:p.id});else{const S=c.find(M=>M.id===p.id);if(!S)throw new Error("Workspace member not found");r({workspaceMember:{id:S.id,name:S.name,colorScheme:"",userEmail:""}})}O()}},K=S=>{i($.RoleDetail,{roleId:S}),O(),l(J)},h=S=>{k(S)};return u(I,{children:[u(E,{children:[t(L,{title:a._({id:"OItM/o"}),description:a._({id:"xPfDRx"})}),t(Xt,{children:t(Yt,{instanceId:"role-assignment-member-search",value:g,onChange:h,placeholder:a._({id:"x55IVv"}),fullWidth:!0,LeftIcon:et,sizeVariant:"lg"})}),u(Zt,{children:[t(zt,{}),t(en,{children:B.length>0?B.map(S=>t(Qt,{workspaceMember:S},S.id)):t(tn,{children:g?a._({id:"/nLvVj"}):a._({id:"Y4qK8/"})})})]}),t(qt,{children:t(tt,{dropdownId:"role-member-select",dropdownOffset:{x:0,y:4},clickableComponent:u(I,{children:[t("div",{id:"assign-member",children:t(ne,{Icon:fe,title:a._({id:"2y2quh"}),variant:"secondary",size:"small",disabled:z})}),t(be,{anchorSelect:"#assign-member",content:a._({id:"MssRHl"}),delay:he.noDelay,hidden:!z})]}),dropdownComponents:t(Gt,{excludedWorkspaceMemberIds:[...W,_==null?void 0:_.id],onSelect:H})})})]}),p&&t(Wt,{selectedWorkspaceMember:p,onClose:O,onConfirm:V,onRoleClick:K})]})},sn=()=>u(N,{gridAutoColumns:"180px 1fr 1fr",children:[t(T,{children:a._({id:"W0i24j"})}),t(T,{children:a._({id:"9cDpsw"})}),t(T,{})]}),on=m.div`
  display: flex;
`,an=({objectPermissions:e,objectPermissionKey:o,roleId:n,objectLabel:i})=>{const s=A(y(n)),r=s.label,d=je,l=e[o];if(!(b=>{const g=d[b];return C(l)&&!!s[g]!=!!l})(o))return null;const R=Et(o),f=`object-level-permission-override-${n}-${o}`;return u(I,{children:[t(on,{id:f,children:t(De,{permission:o,state:l===!1?"revoked":"granted"})}),t(be,{anchorSelect:`#${f}`,content:l===!1?a._({id:"D0C09b",values:{roleLabel:r,humanReadableAction:R,objectLabel:i}}):a._({id:"OeIgEg",values:{roleLabel:r,humanReadableAction:R,objectLabel:i}}),delay:he.shortDelay,noArrow:!0,place:"bottom",positionStrategy:"fixed"})]})},ln=m.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing(1)};
`,cn=({objectPermissions:e,roleId:o,objectLabel:n})=>t(ln,{children:Object.keys(je).map(s=>t(an,{objectPermissions:e,objectPermissionKey:s,roleId:o,objectLabel:n},s))}),rn=m(D)`
  color: ${({theme:e})=>e.font.color.primary};
  gap: ${({theme:e})=>e.spacing(1)};
`,dn=m.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`,gn=({objectPermission:e,objectMetadataItem:o,roleId:n})=>{const{getIcon:i}=nt(),s=Oe();if(!o)throw new Error("Object metadata item not found");const r=i(o.icon),d=o.labelPlural;return u(N,{to:ee($.RoleObjectLevel,{roleId:n,objectMetadataId:e.objectMetadataId}),gridAutoColumns:"180px 1fr 1fr",children:[u(rn,{children:[!!r&&t(r,{style:{minWidth:s.icon.size.md},size:s.icon.size.md,stroke:s.icon.stroke.sm}),t(dn,{title:d,children:t(Z,{text:d})})]}),t(D,{children:t(cn,{objectPermissions:e,roleId:n,objectLabel:d})}),t(D,{align:"right",children:t(st,{size:s.icon.size.md,color:s.font.color.tertiary})})]})},pn=m(E)`
  border-top: 1px solid ${({theme:e})=>e.border.color.light};
  display: flex;
  justify-content: flex-end;
  padding-top: ${({theme:e})=>e.spacing(2)};
  padding-bottom: ${({theme:e})=>e.spacing(2)};
`,mn=m.div`
  padding-bottom: ${({theme:e})=>e.spacing(2)};
  padding-top: ${({theme:e})=>e.spacing(2)};
`,Sn=m(D)`
  color: ${({theme:e})=>e.font.color.tertiary};
`,un=({roleId:e,isEditable:o})=>{var f;const n=A(y(e)),i=X(),{alphaSortedActiveNonSystemObjectMetadataItems:s}=ot(),r=s.filter(b=>!re(b.nameSingular)),d=r.reduce((b,g)=>(b[g.id]=g,b),{}),l=(f=n.objectPermissions)==null?void 0:f.filter(b=>{var g;return $t(b,n)&&!re((g=d[b.objectMetadataId])==null?void 0:g.nameSingular)}),p=(l==null?void 0:l.length)===r.length,R=()=>{i($.RoleAddObjectLevel,{roleId:e})};return u(E,{children:[t(L,{title:a._({id:"YJgmMZ"}),description:a._({id:"xnXGwA"})}),u(Nt,{children:[t(sn,{}),t(mn,{children:C(l)&&(l==null?void 0:l.length)>0?l==null?void 0:l.map(b=>t(gn,{objectPermission:b,objectMetadataItem:d[b.objectMetadataId],roleId:e},b.objectMetadataId)):t(Sn,{children:a._({id:"CfOZmU"})})})]}),t(pn,{children:t(ne,{Icon:fe,title:a._({id:"O8tK4v"}),variant:"secondary",size:"small",disabled:!o||p,onClick:R})})]})},Rn=m(T)`
  flex: 1;
`,fn=m(T)`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding-right: ${({theme:e})=>e.spacing(1)};
`,bn=({roleId:e,objectPermissionsConfig:o,isEditable:n})=>{const[i,s]=j(y(e)),r=o.every(l=>l.value),d=o.some(l=>l.value);return u(N,{children:[t(Rn,{children:a._({id:"6YtxFj"})}),t(fn,{"aria-label":a._({id:"7L01XJ"}),children:t(Y,{checked:r,indeterminate:d&&!r,disabled:!n,"aria-label":a._({id:"XArpJK"}),onChange:()=>{const l=!r;s({...i,canReadAllObjectRecords:l,canUpdateAllObjectRecords:l,canSoftDeleteAllObjectRecords:l,canDestroyAllObjectRecords:l})}})})]})},hn=m(D)`
  align-items: center;
  display: flex;
  flex: 1;
  gap: ${({theme:e})=>e.spacing(1)};
  padding-left: ${({theme:e})=>e.spacing(2)};
`,yn=m.div`
  align-items: center;
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
`,On=m.span`
  color: ${({theme:e})=>e.font.color.primary};
`,An=m.div`
  align-items: center;
  color: ${({theme:e})=>e.font.color.tertiary};
  display: flex;
  gap: ${({theme:e})=>e.spacing(1)};
`,_n=m(D)`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding-right: ${({theme:e})=>e.spacing(1)};
`,Cn=m(N)`
  align-items: center;
  display: flex;
  cursor: ${({isDisabled:e})=>e?"default":"pointer"};
`,In=({permission:e,isEditable:o})=>{const n=e.revokedBy,i=e.grantedBy,s=n!=null&&n>0,r=e.label,d=le("object",n),l=le("object",i),p=!o;return u(Cn,{onClick:()=>{p||e.setValue(!e.value)},isDisabled:p,children:[u(hn,{children:[u(yn,{children:[t(De,{permission:e.key,state:s?"revoked":"granted"}),t(On,{children:r})]}),t(An,{children:s&&n>0?u(I,{children:[" · ",a._({id:"Wz7mbi",values:{revokedBy:n,pluralizedRevokedObject:d}})]}):i&&i>0?u(I,{children:[" · ",a._({id:"MM43i1",values:{grantedBy:i,pluralizedGrantedObject:l}})]}):null})]}),t(_n,{onClick:f=>f.stopPropagation(),children:t(Y,{checked:e.value??!1,onChange:()=>e.setValue(!e.value),disabled:p,accent:s?ce.Orange:ce.Blue})})]})},vn=m.div`
  border-bottom: 1px solid ${({theme:e})=>e.border.color.light};
`,Tn=m.div`
  padding-bottom: ${({theme:e})=>e.spacing(2)};
  padding-top: ${({theme:e})=>e.spacing(2)};
`,Dn=({roleId:e,isEditable:o})=>{var d,l,p,R,f,b,g,k;const[n,i]=j(y(e)),s=n.objectPermissions,r=[{key:"canReadObjectRecords",label:a._({id:"irbH/8"}),grantedBy:((d=s==null?void 0:s.filter(c=>c.canReadObjectRecords===!0&&n.canReadAllObjectRecords===!1))==null?void 0:d.length)??0,revokedBy:((l=s==null?void 0:s.filter(c=>c.canReadObjectRecords===!1&&n.canReadAllObjectRecords===!0))==null?void 0:l.length)??0,value:n.canReadAllObjectRecords,setValue:c=>{i({...n,canReadAllObjectRecords:c,...c===!1?{canUpdateAllObjectRecords:c,canSoftDeleteAllObjectRecords:c,canDestroyAllObjectRecords:c}:{}})}},{key:"canUpdateObjectRecords",label:a._({id:"6n2zpV"}),grantedBy:((p=s==null?void 0:s.filter(c=>c.canUpdateObjectRecords===!0&&n.canUpdateAllObjectRecords===!1))==null?void 0:p.length)??0,revokedBy:((R=s==null?void 0:s.filter(c=>c.canUpdateObjectRecords===!1&&n.canUpdateAllObjectRecords===!0))==null?void 0:R.length)??0,value:n.canUpdateAllObjectRecords,setValue:c=>{i({...n,canUpdateAllObjectRecords:c,...c===!0?{canReadAllObjectRecords:c}:{}})}},{key:"canSoftDeleteObjectRecords",label:a._({id:"mcXHCJ"}),grantedBy:((f=s==null?void 0:s.filter(c=>c.canSoftDeleteObjectRecords===!0&&n.canSoftDeleteAllObjectRecords===!1))==null?void 0:f.length)??0,revokedBy:((b=s==null?void 0:s.filter(c=>c.canSoftDeleteObjectRecords===!1&&n.canSoftDeleteAllObjectRecords===!0))==null?void 0:b.length)??0,value:n.canSoftDeleteAllObjectRecords,setValue:c=>{i({...n,canSoftDeleteAllObjectRecords:c,...c===!0?{canReadAllObjectRecords:c}:{}})}},{key:"canDestroyObjectRecords",label:a._({id:"L68qSB"}),grantedBy:((g=s==null?void 0:s.filter(c=>c.canDestroyObjectRecords===!0&&n.canDestroyAllObjectRecords===!1))==null?void 0:g.length)??0,revokedBy:((k=s==null?void 0:s.filter(c=>c.canDestroyObjectRecords===!1&&n.canDestroyAllObjectRecords===!0))==null?void 0:k.length)??0,value:n.canDestroyAllObjectRecords,setValue:c=>{i({...n,canDestroyAllObjectRecords:c,...c===!0?{canReadAllObjectRecords:c}:{}})}}];return u(E,{children:[t(L,{title:a._({id:"zIk4M6"}),description:a._({id:"9MxZtA"})}),u(vn,{children:[t(bn,{roleId:e,objectPermissionsConfig:r,isEditable:o}),t(Tn,{children:r.map(c=>t(In,{permission:c,isEditable:o},c.key))})]})]})},jn=m(T)`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding-right: ${({theme:e})=>e.spacing(1)};
`,xe=({roleId:e,settingsPermissionsConfig:o,isEditable:n})=>{const[i,s]=j(y(e)),r=o.every(l=>{var p;return(p=i.permissionFlags)==null?void 0:p.some(R=>R.flag===l.key)}),d=o.some(l=>{var p;return(p=i.permissionFlags)==null?void 0:p.some(R=>R.flag===l.key)});return u(N,{gridAutoColumns:"3fr 4fr 24px",children:[t(T,{children:a._({id:"6YtxFj"})}),t(T,{children:a._({id:"Nu4oKW"})}),t(jn,{"aria-label":a._({id:"7L01XJ"}),children:t(Y,{checked:r,indeterminate:d&&!r,disabled:!n,"aria-label":a._({id:"/kWolQ"}),onChange:()=>{s({...i,permissionFlags:!r?o.map(p=>({id:Ae(),flag:p.key,roleId:e})):[]})}})})]})},kn=m(N)`
  cursor: ${({isDisabled:e})=>e?"default":"pointer"};
`,$e=m.span`
  color: ${({theme:e})=>e.font.color.primary};
`,Mn=m($e)`
  color: ${({theme:e})=>e.font.color.secondary};
`,ge=m(D)`
  align-items: center;
  display: flex;
  flex: 1;
  gap: ${({theme:e})=>e.spacing(2)};
`,xn=m(D)`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding-right: ${({theme:e})=>e.spacing(1)};
`,$n=m.div`
  display: flex;
  align-items: center;
  justify-content: center;
`,Ee=({roleId:e,permission:o,isEditable:n})=>{var k;const i=Oe(),[s,r]=j(y(e)),d=((k=s.permissionFlags)==null?void 0:k.some(c=>c.flag===o.key))??!1,l=!o.isToolPermission&&s.canUpdateAllSettings===!0,p=o.isToolPermission&&s.canAccessAllTools===!0,R=!!(d||l||p),f=!!(!n||l||p),b=c=>{const _=s.permissionFlags??[];r(c===!0?{...s,permissionFlags:[..._,{id:Ae(),flag:o.key,roleId:e}]}:{...s,permissionFlags:_.filter(U=>U.flag!==o.key)})};return u(kn,{gridAutoColumns:"3fr 4fr 24px",onClick:()=>{f||b(!R)},isDisabled:f,children:[u(ge,{children:[t($n,{children:t(o.Icon,{size:i.icon.size.md,color:i.font.color.primary,stroke:i.icon.stroke.sm})}),t($e,{children:o.name})]}),t(ge,{children:t(Mn,{children:o.description})}),t(xn,{onClick:c=>c.stopPropagation(),children:t(Y,{checked:R,disabled:f,onChange:c=>b(c.target.checked)})})]},o.key)},En=m.div`
  border-bottom: 1px solid ${({theme:e})=>e.border.color.light};
`,Nn=m.div`
  padding-bottom: ${({theme:e})=>e.spacing(2)};
  padding-top: ${({theme:e})=>e.spacing(2)};
`,wn=m(Ie)`
  margin-bottom: ${({theme:e})=>e.spacing(4)};
`,Pn=({roleId:e,isEditable:o})=>{const[n,i]=j(y(e)),s=[{key:v.API_KEYS_AND_WEBHOOKS,name:a._({id:"vByqA1"}),description:a._({id:"n0FHLv"}),Icon:wt},{key:v.WORKSPACE,name:a._({id:"pmUArF"}),description:a._({id:"6KA8xy"}),Icon:te},{key:v.WORKSPACE_MEMBERS,name:a._({id:"Sxm8rQ"}),description:a._({id:"M067Bn"}),Icon:at},{key:v.ROLES,name:a._({id:"5dJK4M"}),description:a._({id:"Ntu10D"}),Icon:_e},{key:v.DATA_MODEL,name:a._({id:"4BuYDo"}),description:a._({id:"6vZ75d"}),Icon:Pt},{key:v.SECURITY,name:a._({id:"a3LDKx"}),description:a._({id:"eGGH1l"}),Icon:it},{key:v.WORKFLOWS,name:a._({id:"woYYQq"}),description:a._({id:"fEqDWx"}),Icon:lt}];return u(E,{children:[t(L,{title:a._({id:"Tz0i8g"}),description:a._({id:"p8fNBm"})}),t(wn,{rounded:!0,children:t(ke,{Icon:te,title:a._({id:"uXW4pg"}),description:a._({id:"JE9zuL"}),checked:n.canUpdateAllSettings,disabled:!o,onChange:()=>{i({...n,canUpdateAllSettings:!n.canUpdateAllSettings})}})}),t(Ce,{isExpanded:!n.canUpdateAllSettings,dimension:"height",animationDurations:{opacity:.2,size:.4},mode:"scroll-height",containAnimation:!1,children:u(En,{children:[t(xe,{roleId:e,settingsPermissionsConfig:s,isEditable:o}),t(Nn,{children:s.map(r=>t(Ee,{roleId:e,permission:r,isEditable:o},r.key))})]})})]})},Fn=m.div`
  border-bottom: 1px solid ${({theme:e})=>e.border.color.light};
`,Ln=m.div`
  padding-bottom: ${({theme:e})=>e.spacing(2)};
  padding-top: ${({theme:e})=>e.spacing(2)};
`,Un=m(Ie)`
  margin-bottom: ${({theme:e})=>e.spacing(4)};
`,Bn=({roleId:e,isEditable:o})=>{const[n,i]=j(y(e)),s=[{key:v.SEND_EMAIL_TOOL,name:a._({id:"i/TzEU"}),description:a._({id:"qf7N9I"}),Icon:ct,isToolPermission:!0},{key:v.IMPORT_CSV,name:a._({id:"2CeOI3"}),description:a._({id:"gCnKdT"}),Icon:rt,isToolPermission:!0},{key:v.EXPORT_CSV,name:a._({id:"2KAI4N"}),description:a._({id:"+XmkDf"}),Icon:dt,isToolPermission:!0}];return u(E,{children:[t(L,{title:a._({id:"7L01XJ"}),description:a._({id:"mQKK3r"})}),t(Un,{rounded:!0,children:t(ke,{Icon:gt,title:a._({id:"Hn61nE"}),description:a._({id:"fcUyLo"}),checked:n.canAccessAllTools,disabled:!o,onChange:()=>{i({...n,canAccessAllTools:!n.canAccessAllTools})}})}),t(Ce,{isExpanded:!n.canAccessAllTools,dimension:"height",animationDurations:{opacity:.2,size:.4},mode:"scroll-height",containAnimation:!1,children:u(Fn,{children:[t(xe,{roleId:e,settingsPermissionsConfig:s,isEditable:o}),t(Ln,{children:s.map(r=>t(Ee,{roleId:e,permission:r,isEditable:o},r.key))})]})})]})},Wn=m.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing(8)};
`,zn=({roleId:e,isEditable:o})=>u(Wn,{children:[t(Dn,{roleId:e,isEditable:o}),t(un,{roleId:e,isEditable:o}),t(Pn,{roleId:e,isEditable:o}),t(Bn,{roleId:e,isEditable:o})]}),Ne="role-settings-delete-role-confirmation-modal",Hn=({roleId:e})=>{const n=A(y(e)).label;return t(I,{children:a._({id:"FbJ7Si",values:{roleName:n}})})},Gn=({roleId:e})=>{const[o]=pt(),n=X(),i=async()=>{await o({variables:{roleId:e}}),n($.Roles)};return t(Se,{modalId:Ne,title:a._({id:"v41A6S"}),subtitle:t(Hn,{roleId:e}),onConfirmClick:i,confirmButtonText:a._({id:"7VpPHA"}),confirmButtonAccent:"danger"})},Vn=m.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
  width: 100%;
  margin-bottom: ${({theme:e})=>e.spacing(2)};
`,Kn=m.div`
  display: flex;
  flex-direction: column;
`,Jn=({roleId:e,isEditable:o,isCreateMode:n})=>{const[i,s]=j(y(e)),{openModal:r}=ue(),d=`${e}-description`,l=`${e}-name`;return u(I,{children:[u(E,{children:[u(Vn,{children:[t(Kn,{children:t(mt,{selectedIconKey:i.icon??"IconUser",dropdownId:"role-settings-icon-picker",onChange:({iconKey:p})=>{s({...i,icon:p})},disabled:!o})}),t(ye,{instanceId:l,value:i.label,fullWidth:!0,onChange:p=>{s({...i,label:p})},placeholder:a._({id:"iSfzXo"}),disabled:!o})]}),t(St,{textAreaId:d,minRows:4,placeholder:a._({id:"Q9pNST"}),value:i.description||"",onChange:p=>{s({...i,description:p})},disabled:!o})]}),!n&&u(I,{children:[u(E,{children:[t(L,{title:a._({id:"Zz6Cxn"}),description:a._({id:"c0vHQI"})}),t(ne,{title:a._({id:"efjzvW"}),size:"small",variant:"secondary",accent:"danger",onClick:()=>{r(Ne)},disabled:!o})]}),t(Gn,{roleId:e})]})]})},Qn=m.div`
  color: ${({theme:e})=>e.font.color.primary};
  font-weight: ${({theme:e})=>e.font.weight.semiBold};
  font-size: ${({theme:e})=>e.font.size.lg};
  width: fit-content;
  max-width: 420px;
  & > input:disabled {
    color: ${({theme:e})=>e.font.color.primary};
  }
`,qn=({roleId:e})=>{const[o,n]=j(y(e)),i=s=>{n({...o,label:s})};return t(Qn,{children:t(ut,{instanceId:"role-label-input",disabled:!o.isEditable,sizeVariant:"md",value:o.label,onChange:i,placeholder:a._({id:"iSfzXo"})})})},x={COMPONENT_INSTANCE_ID:"settings-role-detail-tabs",TABS_IDS:{PERMISSIONS:"permissions",ASSIGNMENT:"assignment",SETTINGS:"settings"}},Xn=(e,o)=>{if(!o)return Object.fromEntries(Object.entries(e).filter(([,s])=>s!==void 0));const n={},i=new Set([...Object.keys(e),...Object.keys(o)]);for(const s of i){const r=e[s],d=o[s];ve(r,d)||(n[s]=r)}return n},Yn=["label","description","icon","canUpdateAllSettings","canAccessAllTools","canReadAllObjectRecords","canUpdateAllObjectRecords","canSoftDeleteAllObjectRecords","canDestroyAllObjectRecords"],us=({roleId:e,isCreateMode:o})=>{const n=Re(Rt,x.COMPONENT_INSTANCE_ID+"-"+e),i=X(),[s]=ft(),[r]=bt(),[d]=ht(),[l]=yt(),[p,R]=Q.useState(!1),{addWorkspaceMembersToRole:f}=Me(e),b=A(kt),[g,k]=j(y(e)),c=A(Te(e)),{loadCurrentUser:_}=Ot(),{enqueueErrorSnackBar:U}=At();if(!C(b))return t(I,{});const w=g.isEditable,B=[{id:x.TABS_IDS.PERMISSIONS,title:a._({id:"9cDpsw"}),Icon:_e},{id:x.TABS_IDS.ASSIGNMENT,title:a._({id:"0dtKl9"}),Icon:_t},{id:x.TABS_IDS.SETTINGS,title:a._({id:"Tz0i8g"}),Icon:te}],W=!ve(g,c),se=()=>{if(o){i($.Roles);return}C(c)&&k(c)},z=async()=>{var H,G,V,K;R(!0);const O=Xn(g,c);if(C(O.label)&&O.label===""){U({message:a._({id:"gF4nBH"})});return}try{if(o){const{data:h}=await s({variables:{createRoleInput:{id:e,label:g.label,description:g.description,icon:g.icon,canUpdateAllSettings:g.canUpdateAllSettings,canAccessAllTools:g.canAccessAllTools,canReadAllObjectRecords:g.canReadAllObjectRecords,canUpdateAllObjectRecords:g.canUpdateAllObjectRecords,canSoftDeleteAllObjectRecords:g.canSoftDeleteAllObjectRecords,canDestroyAllObjectRecords:g.canDestroyAllObjectRecords}},refetchQueries:[P(F)??""]});if(!h)return;C(O.permissionFlags)&&await d({variables:{upsertPermissionFlagsInput:{roleId:h.createOneRole.id,permissionFlagKeys:((H=g.permissionFlags)==null?void 0:H.map(S=>S.flag))??[]}},refetchQueries:[P(F)??""]}),C(O.objectPermissions)&&await l({variables:{upsertObjectPermissionsInput:{roleId:h.createOneRole.id,objectPermissions:((G=g.objectPermissions)==null?void 0:G.map(S=>({objectMetadataId:S.objectMetadataId,canReadObjectRecords:S.canReadObjectRecords,canUpdateObjectRecords:S.canUpdateObjectRecords,canSoftDeleteObjectRecords:S.canSoftDeleteObjectRecords,canDestroyObjectRecords:S.canDestroyObjectRecords})))??[]}},refetchQueries:[P(F)??""]}),C(O.workspaceMembers)&&await f({roleId:h.createOneRole.id,workspaceMemberIds:g.workspaceMembers.map(S=>S.id)}),i($.RoleDetail,{roleId:h.createOneRole.id})}else C(O.permissionFlags)&&await d({variables:{upsertPermissionFlagsInput:{roleId:e,permissionFlagKeys:((V=g.permissionFlags)==null?void 0:V.map(h=>h.flag))??[]}},refetchQueries:[P(F)??""]}),Yn.some(h=>h in O)&&await r({variables:{updateRoleInput:{id:e,update:{label:g.label,description:g.description,icon:g.icon,canUpdateAllSettings:g.canUpdateAllSettings,canAccessAllTools:g.canAccessAllTools,canReadAllObjectRecords:g.canReadAllObjectRecords,canUpdateAllObjectRecords:g.canUpdateAllObjectRecords,canSoftDeleteAllObjectRecords:g.canSoftDeleteAllObjectRecords,canDestroyAllObjectRecords:g.canDestroyAllObjectRecords}}},refetchQueries:[P(F)??""]}),C(O.objectPermissions)&&await l({variables:{upsertObjectPermissionsInput:{roleId:e,objectPermissions:((K=g.objectPermissions)==null?void 0:K.map(h=>({objectMetadataId:h.objectMetadataId,canReadObjectRecords:h.canReadObjectRecords,canUpdateObjectRecords:h.canUpdateObjectRecords,canSoftDeleteObjectRecords:h.canSoftDeleteObjectRecords,canDestroyObjectRecords:h.canDestroyObjectRecords})))??[]}},refetchQueries:[P(F)??""]});await _()}finally{R(!1)}};return t(Ft,{title:t(qn,{roleId:e}),links:[{children:"Workspace",href:ee($.Workspace)},{children:"Roles",href:ee($.Roles)},{children:g.label}],actionButton:w&&W&&t(It,{onSave:z,onCancel:se,isLoading:p}),children:u(vt,{children:[t(Ct,{tabs:B,className:"tab-list",componentInstanceId:x.COMPONENT_INSTANCE_ID+"-"+e}),n===x.TABS_IDS.ASSIGNMENT&&t(nn,{roleId:e,isCreateMode:o}),n===x.TABS_IDS.PERMISSIONS&&t(zn,{roleId:e,isEditable:w}),n===x.TABS_IDS.SETTINGS&&t(Jn,{roleId:e,isEditable:w,isCreateMode:o})]})})};export{x as S,us as a};
