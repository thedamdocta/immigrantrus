import{p,j as o,a as r,G as h,n,J as f,K as y,L as u}from"./index.Dg3lKJeg.js";const x=n(u)`
  color: ${({disabled:t,theme:e})=>t?e.font.color.extraLight:e.font.color.tertiary};
  cursor: ${({disabled:t,onClick:e})=>t?"not-allowed":e?"pointer":"default"};
  width: 100%;
`,$=n(y)`
  display: flex;
  flex-direction: column;
  gap: ${({theme:t})=>t.spacing(2)};
  padding: ${({theme:t})=>t.spacing(2,2)};

  &:hover {
    background-color: ${({theme:t})=>t.background.quaternary};
    cursor: pointer;
  }
`,m=n.div`
  align-items: center;
  display: flex;
  gap: ${({theme:t})=>t.spacing(2)};
`,S=n.div`
  color: ${({disabled:t,theme:e})=>t?"inherit":e.font.color.secondary};
  display: flex;
  flex: 1 0 auto;
  font-weight: ${({theme:t})=>t.font.weight.medium};
  gap: ${({theme:t})=>t.spacing(2)};
  justify-content: flex-start;
`,v=n(f)`
  color: ${({theme:t})=>t.font.color.light};
`,C=n.div`
  padding-bottom: ${({theme:t})=>t.spacing(2)};
  padding-left: ${({theme:t})=>t.spacing(7)};
`,w=n.div`
  align-items: center;
  display: flex;
  height: 24px;
  justify-content: center;
  width: 24px;
`,k=({description:t,soon:e,disabled:i=e,Icon:a,onClick:l,title:s,className:d,Status:c})=>{const g=p();return o(x,{disabled:i,onClick:i?void 0:l,className:d,rounded:!0,children:r($,{children:[r(m,{children:[o(w,{children:a}),r(S,{disabled:i,children:[s,e&&o(h,{label:"Soon"})]}),c&&c,o(v,{size:g.icon.size.sm})]}),t&&o(C,{children:t})]})})};export{k as S};
