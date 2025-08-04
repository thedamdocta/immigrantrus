import{a as r,j as i,P as d,b as c,I as h,n as t}from"./index.Dg3lKJeg.js";import{B as m}from"./Breadcrumb.CQyf5Hn6.js";const f=t.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,g=t.h3`
  color: ${({theme:n})=>n.font.color.primary};
  font-size: ${({theme:n})=>n.font.size.lg};
  font-weight: ${({theme:n})=>n.font.weight.semiBold};
  line-height: 1.2;
  margin: ${({theme:n})=>n.spacing(8,8,2)};
  min-height: ${({theme:n,reserveTitleSpace:e})=>e?n.spacing(5):"none"};
`,B=({children:n,title:e,reserveTitleSpace:o,actionButton:a,className:s,links:l})=>r(f,{className:s,children:[i(d,{title:i(m,{links:l}),children:a}),r(c,{children:[i(h,{}),(e||o)&&i(g,{reserveTitleSpace:o,children:e}),n]})]});export{B as S};
