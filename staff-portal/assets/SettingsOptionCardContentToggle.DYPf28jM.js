import{j as e,n as o,p as u,r as h,a as n,ad as m,aG as C}from"./index.Dg3lKJeg.js";import{S as y,a as f,b as O,c as b,d as x}from"./SettingsOptionIconCustomizer.BYkiWDDL.js";const $=o.hr`
  border: none;
  border-top: 1px solid ${({theme:t})=>t.border.color.light};
  margin: 0px;
  margin-left: ${({theme:t})=>t.spacing(4)};
  margin-right: ${({theme:t})=>t.spacing(4)};
`,v=()=>e($,{}),T=o(x)`
  cursor: ${({disabled:t})=>t?"default":"pointer"};
  position: relative;
  pointer-events: ${({disabled:t})=>t?"none":"auto"};

  &:hover {
    background: ${({theme:t})=>t.background.transparent.lighter};
  }
`,j=o(C)`
  align-self: ${({toggleCentered:t})=>t?"center":"flex-start"};
  margin-left: auto;
`,I=o.span`
  cursor: pointer;
  inset: 0;
  position: absolute;
`,z=({Icon:t,title:i,description:l,divider:d,disabled:r=!1,advancedMode:g=!1,toggleCentered:c=!0,checked:p,onChange:S})=>{const s=u(),a=h.useId();return n(m,{children:[n(T,{disabled:r,children:[t&&e(f,{children:e(y,{Icon:t})}),n("div",{children:[e(O,{children:n("label",{htmlFor:a,children:[i,e(I,{})]})}),e(b,{children:l})]}),e(j,{id:a,value:p,onChange:S,disabled:r,toggleSize:"small",color:g?s.color.yellow:s.color.blue,toggleCentered:c})]}),d&&e(v,{})]})};export{z as S,v as a};
