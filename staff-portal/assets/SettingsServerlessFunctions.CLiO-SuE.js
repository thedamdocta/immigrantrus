import{p as h,a as r,j as e,n as o,J as y,cD as g,cE as F,cF as b,cG as T,cH as f,ae as d,z as i,bn as m,B as l,cI as v,br as C,bO as w,ad as x,l as I,E as N}from"./index.Dg3lKJeg.js";import{S as R}from"./SettingsPageContainer.CJeLyK8s.js";import{S,T as u}from"./TableRow.BM7bNp8J.js";import{F as E}from"./findManyServerlessFunctions.KaQuerem.js";import{S as $}from"./Table.6yesK_WS.js";import{S as k}from"./TableBody.DCdzfPFn.js";import{S as c}from"./TableHeader.D43eMMOy.js";import{S as A}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./serverlessFunctionFragment.D9YCFdm_.js";import"./Breadcrumb.CQyf5Hn6.js";const B=o(u)`
  grid-template-columns: 312px 132px 68px;
`,a=o(S)`
  color: ${({theme:t})=>t.font.color.primary};
  gap: ${({theme:t})=>t.spacing(2)};
`,M=o(S)`
  justify-content: center;
  padding-right: ${({theme:t})=>t.spacing(1)};
`,j=o(y)`
  color: ${({theme:t})=>t.font.color.tertiary};
`,z=({serverlessFunction:t,to:n})=>{const s=h();return r(B,{to:n,children:[e(a,{children:t.name}),e(a,{children:t.runtime}),e(M,{children:e(j,{size:s.icon.size.md,stroke:s.icon.stroke.sm})})]})},P=o.div`
  height: 60vh;
`,_=()=>e(P,{children:r(v,{...g,children:[e(F,{type:"emptyFunctions"}),r(b,{children:[e(T,{children:"Add your first Function"}),e(f,{children:"Add your first Function to get started"})]}),e(d,{Icon:m,title:"New function",to:i(l.NewServerlessFunction)})]})}),D=()=>{const t=C(),{data:n,loading:s,error:p}=w(E,{client:t??void 0});return{serverlessFunctions:(n==null?void 0:n.findManyServerlessFunctions)||[],loading:s,error:p}},G=o(u)`
  grid-template-columns: 312px 132px 68px;
`,H=o(k)`
  border-bottom: 1px solid ${({theme:t})=>t.border.color.light};
`,J=()=>{const{serverlessFunctions:t}=D();return e(x,{children:t.length?e(R,{children:r($,{children:[r(G,{children:[e(c,{children:"Name"}),e(c,{children:"Runtime"}),e(c,{})]}),e(H,{children:t.map(n=>e(z,{serverlessFunction:n,to:i(l.ServerlessFunctions,{id:n.id})},n.id))})]})}):e(_,{})})},X=()=>e(A,{title:"Functions",actionButton:e(N,{to:i(l.NewServerlessFunction),children:e(d,{Icon:m,title:"New Function",accent:"blue",size:"small"})}),links:[{children:"Workspace",href:i(l.Workspace)},{children:"Functions"}],children:e(I,{children:e(J,{})})});export{X as SettingsServerlessFunctions};
