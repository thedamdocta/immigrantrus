import{p as h,a as r,j as t,bk as m,bl as g,n as i,J as y,bm as S,z as l,B as s,u as b,o as f,H as u,ae as x,bn as T,l as k,Z as a,aw as v}from"./index.Dg3lKJeg.js";import{S as w}from"./SettingsPageContainer.CJeLyK8s.js";import{S as c,T as p}from"./TableRow.BM7bNp8J.js";import{S as $}from"./Table.6yesK_WS.js";import{S as C}from"./TableBody.DCdzfPFn.js";import{S as d}from"./TableHeader.D43eMMOy.js";import{S as _}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./Breadcrumb.CQyf5Hn6.js";const U=i(p)`
  grid-template-columns: 1fr 28px;
`,R=i(c)`
  justify-content: center;
  padding-right: ${({theme:e})=>e.spacing(1)};
  padding-left: 0;
`,W=i(c)`
  color: ${({theme:e})=>e.font.color.primary};
  overflow-x: scroll;
  white-space: nowrap;
`,j=i(y)`
  color: ${({theme:e})=>e.font.color.tertiary};
`,B=({webhook:e,to:o})=>{const n=h();return r(U,{to:o,children:[t(W,{children:g(e.targetUrl)?m(e.targetUrl):e.targetUrl}),t(R,{children:t(j,{size:n.icon.size.md,stroke:n.icon.stroke.sm})})]})},I=i(C)`
  border-bottom: 1px solid ${({theme:e})=>e.border.color.light};
  max-height: 260px;
  overflow-y: auto;
`,J=i(p)`
  grid-template-columns: 444px 68px;
`,P=()=>{const{data:e}=S(),o=e==null?void 0:e.webhooks;return r($,{children:[r(J,{children:[t(d,{children:"URL"}),t(d,{})]}),!!(o!=null&&o.length)&&t(I,{children:o.map(n=>t(B,{webhook:n,to:l(s.WebhookDetail,{webhookId:n.id})},n.id))})]})},z=i.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${({theme:e})=>e.spacing(2)};
  @media (max-width: ${v}px) {
    padding-top: ${({theme:e})=>e.spacing(5)};
  }
`,H=i.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: ${({theme:e})=>e.spacing(2)};
`,V=()=>{const e=b(),{i18n:o,_:n}=f();return t(_,{title:o._({id:"v1kQyJ"}),links:[{children:t(a,{id:"pmUArF"}),href:l(s.Workspace)},{children:t(a,{id:"v1kQyJ"})}],children:t(w,{children:t(H,{isMobile:e,children:r(k,{children:[t(u,{title:o._({id:"v1kQyJ"}),description:o._({id:"JLxMta"})}),t(P,{}),t(z,{children:t(x,{Icon:T,title:o._({id:"dkAPxi"}),size:"small",variant:"secondary",to:l(s.NewWebhook)})})]})})})})};export{V as SettingsWebhooks};
