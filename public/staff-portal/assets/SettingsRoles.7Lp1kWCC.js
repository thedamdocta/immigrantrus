import{bA as T,be as W,bz as L,ao as v,a as l,j as e,h as c,H as I,b0 as j,L as N,l as R,i as S,Z as f,p as U,R as m,da as D,z as C,db as H,Y as w,c$ as P,cb as B,cc as E,J as F,B as y,n as d,N as J,dc as Y,ae as M,bn as K,o as Q,dd as V,ad as Z}from"./index.Dg3lKJeg.js";import{S as G}from"./SettingsPageContainer.CJeLyK8s.js";import{S as O}from"./SettingsOptionCardContentSelect.DFB7abf9.js";import{I as x}from"./IconUserPin.CriyMkl7.js";import{S as $}from"./Table.6yesK_WS.js";import{S as h}from"./TableHeader.D43eMMOy.js";import{T as _,S as g}from"./TableRow.BM7bNp8J.js";import{s as z}from"./settingsAllRolesSelector.Cs6X5zRZ.js";import{c as q,S as X}from"./SettingsRolesQueryEffect.DrlzoG9A.js";import{S as ee}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./SettingsOptionIconCustomizer.BYkiWDDL.js";import"./Breadcrumb.CQyf5Hn6.js";const te=({roles:t})=>{const[o]=T(),[n,s]=W(L),a=n==null?void 0:n.defaultRole,u=(r,k)=>{o({variables:{input:{defaultRoleId:S(r)?r:null}},onCompleted:A=>{const b=A.updateWorkspace.defaultRole;s({...k,defaultRole:S(b)?b:null})}})},{getIcon:i}=v();if(!n||!a)return null;const p=t.map(r=>({label:r.label,value:r.id,Icon:i(r.icon)??x}));return p.length===0?null:l(R,{children:[e(I,{title:c._({id:"0zpgxV"}),description:c._({id:"Eis4ey"})}),e(N,{rounded:!0,children:e(O,{Icon:x,title:"Default Role",description:c._({id:"YZwx1e"}),children:e(j,{selectSizeVariant:"small",withSearchInput:!0,dropdownId:"default-role-select",options:p,value:(a==null?void 0:a.id)??"",onChange:r=>u(r,n)})})})]})},ne=()=>e($,{children:l(_,{gridAutoColumns:"332px 3fr 2fr 1fr",children:[e(h,{children:e(f,{id:"6YtxFj"})}),e(h,{align:"right",children:e(f,{id:"lxQ+5m"})}),e(h,{})]})}),ie=d.div`
  color: ${({theme:t})=>t.font.color.secondary};
  font-size: ${({theme:t})=>t.font.size.sm};
`,oe=d.div`
  color: ${({theme:t})=>t.font.color.primary};
  display: flex;
  gap: ${({theme:t})=>t.spacing(1)};
`,se=d.div`
  display: flex;
  justify-content: flex-end;

  > * {
    margin-left: -5px;

    &:first-of-type {
      margin-left: 0;
    }
  }
`,le=d.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`,ae=d(_)`
  &:hover {
    background: ${({theme:t})=>t.background.transparent.light};
    cursor: pointer;
  }
`,re=({role:t})=>{const o=U(),{getIcon:n}=v(),s=n(t.icon??"IconUser"),a=m(D),u=t.workspaceMembers.map(i=>a.find(p=>p.id===i.id)).filter(S);return l(ae,{gridAutoColumns:"332px 3fr 2fr 1fr",to:C(y.RoleDetail,{roleId:t.id}),children:[e(g,{children:l(oe,{children:[e(s,{size:o.icon.size.md,stroke:o.icon.stroke.sm}),t.label,!t.isEditable&&e(le,{children:e(H,{color:o.font.color.light,stroke:o.icon.stroke.sm,size:o.icon.size.sm})})]})}),e(g,{align:"right",children:e(se,{children:u.slice(0,5).map(i=>l(w.Fragment,{children:[e("div",{id:`avatar-${i.id}`,children:e(P,{avatarUrl:i.avatarUrl,placeholderColorSeed:i.id,placeholder:i.name.firstName??"",type:"rounded",size:"md"})}),e(B,{anchorSelect:`#avatar-${i.id}`,content:`${i.name.firstName} ${i.name.lastName}`,noArrow:!0,place:"top",positionStrategy:"fixed",delay:E.shortDelay})]},i.id))})}),e(g,{align:"left",children:e(ie,{children:t.workspaceMembers.length})}),e(g,{align:"right",color:o.font.color.tertiary,children:e(F,{size:o.icon.size.md})})]},t.id)},de=d(R)`
  border-top: 1px solid ${({theme:t})=>t.border.color.light};
  display: flex;
  justify-content: flex-end;
  padding-top: ${({theme:t})=>t.spacing(2)};
  padding-bottom: ${({theme:t})=>t.spacing(2)};
`,ce=d.div`
  padding-bottom: ${({theme:t})=>t.spacing(2)};
  padding-top: ${({theme:t})=>t.spacing(2)};
`,ge=d(g)`
  color: ${({theme:t})=>t.font.color.tertiary};
`,pe=()=>{const t=J(),n=[...m(z)].sort((s,a)=>Y(s.label,a.label));return l(R,{children:[e(I,{title:c._({id:"Hm90t3"}),description:c._({id:"17M/rH"})}),l($,{children:[e(ne,{}),e(ce,{children:n.length===0?e(ge,{children:c._({id:"9mcJ/7"})}):n.map(s=>e(re,{role:s},s.id))})]}),e(de,{children:e(M,{Icon:K,title:c._({id:"RoyYUE"}),variant:"secondary",size:"small",onClick:()=>t(y.RoleCreate)})})]})},fe=()=>{const{i18n:t,_:o}=Q(),n=m(z);return m(q)&&!n?null:e(ee,{title:e(V,{title:t._({id:"5dJK4M"})}),links:[{children:e(f,{id:"pmUArF"}),href:C(y.Workspace)},{children:e(f,{id:"5dJK4M"})}],children:l(G,{children:[e(pe,{}),e(te,{roles:n})]})})},_e=()=>l(Z,{children:[e(X,{}),e(fe,{})]});export{_e as SettingsRoles};
