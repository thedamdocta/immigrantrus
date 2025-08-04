import{c as I,p as K,a as d,j as t,f9 as B,n as r,J as G,aw as y,fa as O,Z as u,z as b,B as c,o as w,N as H,be as N,a8 as j,a9 as z,a2 as g,_ as M,a4 as f,b0 as v,fb as Q,ae as E,aC as D,dw as J,L as q,l as x,H as A,bn as W}from"./index.Dg3lKJeg.js";import{S as Y}from"./SettingsPageContainer.CJeLyK8s.js";import{f as U}from"./formatExpiration.BUfIxfgs.js";import{S as T,T as $}from"./TableRow.BM7bNp8J.js";import{S as V}from"./Table.6yesK_WS.js";import{S as Z}from"./TableBody.DCdzfPFn.js";import{S}from"./TableHeader.D43eMMOy.js";import{P as p,p as X}from"./playgroundApiKeyState.By2k6NBY.js";import{I as ee}from"./IconBrandGraphql.O6cMWFrf.js";import{S as te}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./NeverExpireDeltaInYears.BAM5Jy2K.js";import"./Breadcrumb.CQyf5Hn6.js";/**
 * @license @tabler/icons-react v3.31.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var ae=I("outline","brackets-angle","IconBracketsAngle",[["path",{d:"M8 4l-5 8l5 8",key:"svg-0"}],["path",{d:"M16 4l5 8l-5 8",key:"svg-1"}]]);/**
 * @license @tabler/icons-react v3.31.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var oe=I("outline","folder-root","IconFolderRoot",[["path",{d:"M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",key:"svg-0"}],["path",{d:"M12 15v4",key:"svg-1"}],["path",{d:"M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2",key:"svg-2"}]]);const ne=r($)`
  grid-template-columns: 312px auto 28px;
  @media (max-width: ${y}px) {
    width: 100%;
    grid-template-columns: 12fr 4fr;
  }
`,re=r(T)`
  color: ${({theme:e})=>e.font.color.primary};
  gap: ${({theme:e})=>e.spacing(2)};
`,ie=r(T)`
  justify-content: center;
  padding-right: ${({theme:e})=>e.spacing(1)};
  padding-left: 0;
`,se=r(G)`
  color: ${({theme:e})=>e.font.color.tertiary};
`,le=({apiKey:e,to:i})=>{const n=K(),m=U(e.expiresAt||null);return d(ne,{to:i,children:[t(re,{children:t(B,{text:e.name})}),t(T,{color:m==="Expired"?n.font.color.danger:n.font.color.tertiary,children:m}),t(ie,{children:t(se,{size:n.icon.size.md,stroke:n.icon.stroke.sm})})]})},de=r(Z)`
  border-bottom: 1px solid ${({theme:e})=>e.border.color.light};
  @media (max-width: ${y}px) {
    padding-top: ${({theme:e})=>e.spacing(3)};
    display: flex;
    justify-content: space-between;
    scroll-behavior: smooth;
  }
`,ce=r($)`
  grid-template-columns: 312px auto 28px;
  @media (max-width: ${y}px) {
    width: 95%;
    grid-template-columns: 20fr 2fr;
  }
`,pe=()=>{const{data:e}=O(),i=e==null?void 0:e.apiKeys;return d(V,{children:[d(ce,{children:[t(S,{children:t(u,{id:"6YtxFj"})}),t(S,{children:t(u,{id:"LxRNPw"})}),t(S,{})]}),!!(i!=null&&i.length)&&t(de,{children:i.map(n=>t(le,{apiKey:n,to:b(c.ApiKeyDetail,{apiKeyId:n.id})},n.id))})]})},me=[{value:p.CORE,label:{id:"SGsgDO"},Icon:oe},{value:p.METADATA,label:{id:"6GBt0m"},Icon:ae}];var s;(function(e){e.GRAPHQL="graphql",e.REST="rest"})(s||(s={}));const ge=g.object({apiKeyForPlayground:g.string(),schema:g.nativeEnum(p),playgroundType:g.nativeEnum(s)}),ue=r.form`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 0.5fr;
  align-items: end;
  gap: ${({theme:e})=>e.spacing(2)};
  margin-bottom: ${({theme:e})=>e.spacing(2)};
  width: 100%;
`,ye=()=>{const{i18n:e,_:i}=w(),n=H(),[m,R]=N(X),{control:h,handleSubmit:C,formState:{isSubmitting:k},setError:F}=j({mode:"onTouched",resolver:z(ge),defaultValues:{schema:p.CORE,playgroundType:s.REST,apiKeyForPlayground:m||""}}),L=async o=>{try{const a=await fetch(`${D}/rest/open-api/${o.schema}`,{headers:{Authorization:`Bearer ${o.apiKeyForPlayground}`}});if(!a.ok)throw new J(`HTTP error! status: ${a.status}`,"HTTP_ERROR");if(!(await a.json()).tags)throw new Error("Invalid API Key");return!0}catch{throw new Error(e._({id:"GNRDhm"}))}};return d(ue,{onSubmit:C(async o=>{try{await L(o),R(o.apiKeyForPlayground);const a=o.playgroundType===s.GRAPHQL?c.GraphQLPlayground:c.RestPlayground;n(a,{schema:o.schema.toLowerCase()})}catch(a){F("apiKeyForPlayground",{type:"manual",message:a instanceof Error?a.message:e._({id:"lxentK"})})}}),children:[t(f,{name:"apiKeyForPlayground",control:h,render:({field:{onChange:o,value:a},fieldState:{error:l}})=>t(M,{instanceId:"playground-api-key",label:e._({id:"yRnk5W"}),placeholder:"Enter your API key",value:a,onChange:_=>{o(_),R(_)},error:l==null?void 0:l.message,required:!0})}),t(f,{name:"schema",control:h,defaultValue:p.CORE,render:({field:{onChange:o,value:a}})=>t(v,{dropdownId:"schema",label:e._({id:"QJ8HBJ"}),options:me.map(l=>({...l,label:e._(l.label)})),value:a,onChange:o})}),t(f,{name:"playgroundType",control:h,defaultValue:s.REST,render:({field:{onChange:o,value:a}})=>t(v,{dropdownId:"apiPlaygroundType",label:e._({id:"OZtEcz"}),options:[{value:s.REST,label:e._({id:"WHiaOl"}),Icon:Q},{value:s.GRAPHQL,label:e._({id:"gBiL6J"}),Icon:ee}],value:a,onChange:o})}),t(E,{title:e._({id:"ZEP8tT"}),variant:"primary",accent:"blue",type:"submit",disabled:k})]})},he="/assets/cover-dark.vRx2d3Wl.png",fe="/assets/cover-light.DApvN4Qp.png",Se=r(q)`
  align-items: center;
  background-image: ${({theme:e})=>e.name==="light"?`url('${fe.toString()}')`:`url('${he.toString()}')`};
  background-size: cover;
  border-radius: ${({theme:e})=>e.border.radius.md};
  box-sizing: border-box;
  display: flex;
  height: 153px;
  justify-content: center;
  position: relative;
  margin-top: ${({theme:e})=>e.spacing(4)};
  margin-bottom: ${({theme:e})=>e.spacing(4)};
`,be=r.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${({theme:e})=>e.spacing(2)};
  @media (max-width: ${y}px) {
    padding-top: ${({theme:e})=>e.spacing(5)};
  }
`,P=r.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
  gap: ${({theme:e})=>e.spacing(2)};
`,Fe=()=>{const{i18n:e,_:i}=w();return t(te,{title:e._({id:"JR6nY7"}),links:[{children:t(u,{id:"pmUArF"}),href:b(c.Workspace)},{children:t(u,{id:"JR6nY7"})}],children:d(Y,{children:[t(P,{children:d(x,{children:[t(A,{title:e._({id:"0LrFTO"}),description:e._({id:"haaL9N"})}),t(Se,{}),t(ye,{})]})}),t(P,{children:d(x,{children:[t(A,{title:e._({id:"5h8ooz"}),description:e._({id:"Mue4oc"})}),t(pe,{}),t(be,{children:t(E,{Icon:W,title:e._({id:"uXGLuq"}),size:"small",variant:"secondary",to:b(c.NewApiKey)})})]})})]})})};export{Fe as SettingsApiKeys};
