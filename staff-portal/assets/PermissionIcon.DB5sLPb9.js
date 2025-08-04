import{h as n,ck as i,cl as l,bx as b,cm as I,cn as O,co as R,p as j,j as s,a as p,n as t}from"./index.Dg3lKJeg.js";import{I as S,a as _}from"./IconTrashOff.DiMVUIb1.js";const u={canReadObjectRecords:"canReadAllObjectRecords",canUpdateObjectRecords:"canUpdateAllObjectRecords",canSoftDeleteObjectRecords:"canSoftDeleteAllObjectRecords",canDestroyObjectRecords:"canDestroyAllObjectRecords"},P=e=>({canReadObjectRecords:n._({id:"i0zibG"}),canUpdateObjectRecords:n._({id:"Y8zko3"}),canSoftDeleteObjectRecords:n._({id:"HNlEFZ"}),canDestroyObjectRecords:n._({id:"+ow7t4"})})[e],f={canReadObjectRecords:{Icon:R,IconForbidden:O},canUpdateObjectRecords:{Icon:I,IconForbidden:_},canSoftDeleteObjectRecords:{Icon:b,IconForbidden:S},canDestroyObjectRecords:{Icon:l,IconForbidden:i}},E=t.div`
  align-items: center;
  background: ${({theme:e,isRevoked:c})=>c?e.adaptiveColors.orange1:e.adaptiveColors.blue1};
  border: 1px solid
    ${({theme:e,isRevoked:c})=>c?e.adaptiveColors.orange3:e.adaptiveColors.blue3};
  border-radius: ${({theme:e})=>e.border.radius.sm};
  display: flex;
  height: ${({theme:e})=>e.spacing(4)};
  justify-content: center;
  width: ${({theme:e})=>e.spacing(4)};
`,m=t.div`
  align-items: center;
  display: flex;
  color: ${({theme:e,isRevoked:c})=>c?e.color.orange:e.color.blue};
  justify-content: center;
`,g=({permission:e,state:c})=>{const a=j(),{Icon:r,IconForbidden:d}=f[e],o=c==="revoked";return s(E,{isRevoked:o,children:p(m,{isRevoked:o,children:[o&&s(d,{size:a.icon.size.sm}),!o&&s(r,{size:a.icon.size.sm})]})})};export{g as P,u as S,P as o};
