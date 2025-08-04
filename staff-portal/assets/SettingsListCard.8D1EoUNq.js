import{n as a,L as f,p as $,a as c,j as e,J as v,i as z,K as k,ax as C,av as L,bn as j,bN as P}from"./index.Dg3lKJeg.js";const w=a(f)`
  background-color: ${({theme:n})=>n.background.secondary};
  height: 40px;
`,B=a(k,{shouldForwardProp:n=>n!=="to"&&C(n)})`
  align-items: center;
  cursor: ${({onClick:n,to:r})=>n||r?"pointer":"default"};
  display: flex;
  font-size: ${({theme:n})=>n.font.size.sm};
  font-weight: ${({theme:n})=>n.font.weight.medium};
  gap: ${({theme:n})=>n.spacing(2)};
  padding: ${({theme:n})=>n.spacing(2)};
  padding-left: ${({theme:n})=>n.spacing(3)};
  min-height: ${({theme:n})=>n.spacing(6)};

  &:hover {
    ${({to:n,theme:r})=>n&&`background: ${r.background.transparent.light};`}
  }
`,F=a.div`
  align-items: center;
  display: flex;
  gap: ${({theme:n})=>n.spacing(1)};
`,J=a.div`
  flex: 1 0 auto;
  display: flex;
  gap: ${({theme:n})=>n.spacing(1)};
`,K=a.span`
  color: ${({theme:n})=>n.font.color.light};
  font-weight: ${({theme:n})=>n.font.weight.regular};
  padding-left: ${({theme:n})=>n.spacing(1)};
`,N=a(L)`
  color: ${({theme:n})=>n.font.color.secondary};
  text-decoration: none;
`,T=({label:n,description:r,divider:s,LeftIcon:l,LeftIconColor:p,onClick:i,rightComponent:h,to:o})=>{const d=$(),g=c(B,{onClick:i,divider:s,to:!!o,children:[!!l&&e(l,{size:d.icon.size.md,color:p??"currentColor"}),c(J,{children:[n,!!r&&e(K,{children:r})]}),c(F,{children:[h,!!o&&e(v,{size:d.icon.size.md,color:d.font.color.tertiary})]})]});return z(o)?e(N,{to:o,children:g}):g},V=a(P)`
  align-items: center;
  display: flex;
  padding: ${({theme:n})=>n.spacing(1)};
`,q=a.button`
  align-items: center;
  background: ${({theme:n})=>n.background.primary};
  border: none;
  border-radius: ${({theme:n})=>n.border.radius.sm};
  color: ${({theme:n})=>n.font.color.secondary};
  gap: ${({theme:n})=>n.spacing(2)};
  padding: 0 ${({theme:n})=>n.spacing(1)};
  padding-left: ${({theme:n})=>n.spacing(2)};
  cursor: pointer;
  display: flex;
  flex: 1 0 0;
  height: ${({theme:n})=>n.spacing(8)};
  width: 100%;

  &:hover {
    background: ${({theme:n})=>n.background.transparent.light};
  }
`,E=({items:n,getItemLabel:r,getItemDescription:s,hasFooter:l,isLoading:p,onRowClick:i,RowIcon:h,RowIconFn:o,RowIconColor:d,RowRightComponent:g,onFooterButtonClick:y,footerButtonLabel:b,to:u,rounded:x})=>{const S=$();return p===!0?e(w,{}):c(f,{rounded:x,children:[n.map((t,m)=>e(T,{LeftIcon:o?o(t):h,LeftIconColor:d,label:r(t),description:s==null?void 0:s(t),rightComponent:e(g,{item:t}),divider:m<n.length-1,onClick:i?()=>i==null?void 0:i(t):void 0,to:u==null?void 0:u(t)},t.id)),l&&e(V,{divider:!!n.length,children:c(q,{onClick:y,children:[e(j,{size:S.icon.size.md}),b]})})]})};export{E as S};
