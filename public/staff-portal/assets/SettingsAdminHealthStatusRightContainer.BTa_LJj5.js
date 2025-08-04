import{p,j as t,a as r,n as a,L as S,b5 as n,a0 as o,ad as b}from"./index.Dg3lKJeg.js";import{S as y}from"./Table.6yesK_WS.js";import{S as u}from"./TableBody.DCdzfPFn.js";import{S as s,T}from"./TableRow.BM7bNp8J.js";const x=a(S)`
  background-color: ${({theme:e})=>e.background.secondary};
  border: 1px solid ${({theme:e})=>e.border.color.medium};
`,$=a(T)`
  height: ${({theme:e})=>e.spacing(6)};
`,A=a(s)`
  color: ${({theme:e})=>e.font.color.tertiary};
  height: ${({theme:e})=>e.spacing(6)};
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
  justify-content: ${({align:e})=>e==="right"?"flex-end":e==="center"?"center":"flex-start"};
`,C=a(s)`
  color: ${({theme:e})=>e.font.color.primary};
  height: ${({theme:e})=>e.spacing(6)};
  justify-content: ${({align:e})=>e==="left"?"flex-start":e==="center"?"center":"flex-end"};
`,I=({items:e,rounded:c=!1,gridAutoColumns:i,labelAlign:d="left",valueAlign:h="left",className:g})=>{const m=p();return t(x,{rounded:c,className:g,children:t(y,{children:t(u,{children:e.map((l,f)=>r($,{gridAutoColumns:i,children:[r(A,{align:d,children:[l.Icon&&t(l.Icon,{size:m.icon.size.md}),t("span",{children:l.label})]}),t(C,{align:h,children:l.value})]},f+l.label))})})})},L=({status:e})=>r(b,{children:[e===n.OPERATIONAL&&t(o,{color:"green",text:"Operational",weight:"medium"}),e===n.OUTAGE&&t(o,{color:"red",text:"Outage",weight:"medium"})]});export{I as S,L as a};
