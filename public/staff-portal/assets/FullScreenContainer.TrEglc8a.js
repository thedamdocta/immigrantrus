import{f as t,a as c,j as n,n as e,P as d,g as l}from"./index.Dg3lKJeg.js";import{B as r}from"./Breadcrumb.CQyf5Hn6.js";const g=e.div`
  background: ${({theme:a})=>a.background.noisy};
  display: flex;
  flex-direction: column;
  width: 100%;
`,p=e.div`
  height: calc(
    100% - ${l}px - ${({theme:a})=>a.spacing(2*2+5)}
  );
  padding: ${({theme:a})=>`0 ${a.spacing(3)} ${a.spacing(3)} ${a.spacing(3)}`};
`,u=e(d)`
  padding-left: ${({theme:a})=>a.spacing(3)};
`,x=({children:a,links:s,exitFullScreen:i})=>{const o=t();return c(g,{children:[n(u,{title:n(r,{links:s}),hasClosePageButton:!o,onClosePage:i}),n(p,{children:a})]})};export{x as F};
