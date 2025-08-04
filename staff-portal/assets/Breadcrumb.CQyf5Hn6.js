import{p as m,aA as w,d as u,j as n,a as s,aB as a,ad as h,n as r,av as g,u as x,r as y}from"./index.Dg3lKJeg.js";const S=r.nav`
  align-items: center;
  color: ${({theme:e})=>e.font.color.tertiary};
  display: grid;
  font-size: ${({theme:e})=>e.font.size.md};
  grid-auto-flow: column;
  grid-column-gap: ${({theme:e})=>e.spacing(1)};
  max-width: 100%;
  min-width: 0;
  height: ${({theme:e})=>e.spacing(8)};
`,$=r(g)`
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,p=r.span`
  color: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,v=({className:e,links:o})=>{const l=m(),{openSettingsMenu:i}=w(),c=()=>{i()},t=o[o.length-2],f=o.length===2,d=u.isNonEmptyString(t.children)?t.children:"";return n(S,{className:e,children:f?s(h,{children:[n(a,{size:l.icon.size.md}),n(p,{onClick:c,children:"Back to Settings"})]}):t!=null&&t.href?s(h,{children:[n(a,{size:l.icon.size.md}),s($,{title:d,to:t.href,children:["Back to ",t.children]})]}):n(p,{title:d,children:t==null?void 0:t.children})})},z=r.nav`
  align-items: center;
  color: ${({theme:e})=>e.font.color.tertiary};
  display: grid;
  font-size: ${({theme:e})=>e.font.size.md};
  grid-auto-flow: column;
  grid-column-gap: ${({theme:e})=>e.spacing(1)};
  max-width: 100%;
  min-width: 0;
  height: ${({theme:e})=>e.spacing(8)};
`,b=r(g)`
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,B=r.span`
  color: ${({theme:e})=>e.font.color.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,M=r.span`
  width: ${({theme:e})=>e.spacing(2)};
`,j=({className:e,links:o})=>x()&&o.length>0?n(v,{className:e,links:o}):n(z,{className:e,children:o.map((i,c)=>{const t=typeof i.children=="string"?i.children:"";return s(y.Fragment,{children:[i.href?n(b,{title:t,to:i.href,children:i.children}):n(B,{title:t,children:i.children}),c<o.length-1&&n(M,{children:"/"})]},c)})});export{j as B};
