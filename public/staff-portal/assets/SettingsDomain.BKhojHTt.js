import{a6 as F,p as ee,o as T,bB as oe,a as m,j as o,b1 as te,n as u,ae as M,aj as ae,R as h,bz as $,a0 as ne,c8 as se,e1 as ie,b6 as re,i as D,r as de,ad as V,a3 as N,H as O,dy as Q,a4 as j,d2 as le,bx as ce,l as q,e2 as me,e3 as ue,N as pe,a2 as _,bA as ge,e4 as he,be,bv as fe,a8 as Se,a9 as ye,Q as Ce,z as U,B as R,Z as v,by as _e,ai as I}from"./index.Dg3lKJeg.js";import{S as De}from"./SaveAndCancelButtons.DdB8J98L.js";import{S as Te}from"./SettingsPageContainer.CJeLyK8s.js";import{S as $e}from"./SubMenuTopBarContainer.BNGFwgBo.js";import{S as W}from"./Table.6yesK_WS.js";import{S as xe}from"./TableBody.DCdzfPFn.js";import{T as w,S as G}from"./TableRow.BM7bNp8J.js";import{S as k}from"./TableHeader.D43eMMOy.js";import"./IconDeviceFloppy.CaehffdS.js";import"./Breadcrumb.CQyf5Hn6.js";const Re=u(W)`
  border-bottom: 1px solid ${({theme:e})=>e.border.color.light};
`,z=u(G)`
  overflow: hidden;
  display: block;
  padding: 0 ${({theme:e})=>e.spacing(3)} 0 0;

  &:first-of-type {
    padding-left: 0;
  }

  &:last-of-type {
    padding-right: 0;
  }
`,A=u(M)`
  border: 1px solid ${({theme:e})=>e.border.color.medium};
  color: ${({theme:e})=>e.font.color.tertiary};
  font-weight: ${({theme:e})=>e.font.weight.regular};
  height: ${({theme:e})=>e.spacing(6)};
  overflow: hidden;
  user-select: text;
  width: 100%;
`,ve=({records:e})=>{const{enqueueSuccessSnackBar:t}=F(),g=ee(),{i18n:i,_:n}=T(),c=oe(s=>{navigator.clipboard.writeText(s),t({message:i._({id:"u+VWhB"}),options:{icon:o(te,{size:g.icon.size.md})}})},200);return m(Re,{children:[m(w,{gridAutoColumns:"35% 16% auto",children:[o(k,{children:"Name"}),o(k,{children:"Type"}),o(k,{children:"Value"})]}),o(xe,{children:e.filter(s=>s.status!=="success").map(s=>m(w,{gridAutoColumns:"30% 16% auto",children:[o(z,{children:o(A,{title:s.key,onClick:()=>c(s.key),type:"button"})}),o(z,{children:o(A,{title:s.type.toUpperCase(),onClick:()=>c(s.type.toUpperCase()),type:"button"})}),o(z,{children:o(A,{title:s.value,onClick:()=>c(s.value),type:"button"})})]},s.key))})]})},B=ae({key:"customDomainRecordsState",defaultValue:{isLoading:!1,customDomainRecords:null}}),ke=u(W)`
  background-color: ${({theme:e})=>e.background.transparent.lighter};
  border: 1px solid ${({theme:e})=>e.border.color.light};
  padding: 0 ${({theme:e})=>e.spacing(2)};
  border-radius: ${({theme:e})=>e.border.radius.sm};
`,ze=u(w)`
  display: flex;
  border-bottom: 1px solid ${({theme:e})=>e.border.color.medium};
  border-radius: 0;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  font-size: ${({theme:e})=>e.font.size.sm};
  &:last-child {
    border-bottom: none;
  }
`,Z=u(G)`
  padding: 0;
`,Ae=[{name:"CNAME",validationType:"redirection"},{name:"TXT Validation",validationType:"ownership"},{name:"SSL Certificate Generation",validationType:"ssl"}],Ee=()=>{const e=h($),{customDomainRecords:t}=h(B),g=(e==null?void 0:e.customDomain)===(t==null?void 0:t.customDomain)?{status:"success",color:"green"}:{status:"loading",color:"gray"},i=Ae.map(n=>{const d=t==null?void 0:t.records.find(({validationType:c})=>c===n.validationType);return{name:n.name,status:d?d.status:g.status,color:d&&d.status==="error"?"red":d&&d.status==="pending"?"yellow":g.color}});return o(ke,{children:i.map(n=>m(ze,{children:[o(Z,{children:n.name}),o(Z,{children:o(ne,{color:n.color,text:se(n.status)})})]},n.name))})},P=()=>{const[e]=ie(),t=re(B);return{checkCustomDomainRecords:()=>{t(i=>({...i,isLoading:!0})),e({onCompleted:i=>{t(n=>({...n,isLoading:!1,...D(i.checkCustomDomainValidRecords)?{customDomainRecords:i.checkCustomDomainValidRecords}:{}}))}})}}};/* @license Enterprise */const we=()=>{const{checkCustomDomainRecords:e}=P();return de.useEffect(()=>{e()},[]),o(V,{})};/* @license Enterprise */const Ve=u.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
`,Be=u(me)`
  & > :not(:first-of-type) > button {
    border-left: none;
  }
`,L=u(M)`
  align-self: flex-start;
`,Ue=u.div`
  margin-top: ${({theme:e})=>e.spacing(2)};

  & > :not(:first-of-type) {
    margin-top: ${({theme:e})=>e.spacing(4)};
  }
`,Ie=()=>{const{customDomainRecords:e,isLoading:t}=h(B),{checkCustomDomainRecords:g}=P(),i=h($),{i18n:n,_:d}=T(),{control:c,setValue:s,trigger:a}=N(),C=()=>{s("customDomain",""),a()};return m(q,{children:[o(O,{title:n._({id:"XQ681Q"}),description:n._({id:"qNbuWB"})}),o(we,{}),m(Ve,{children:[o(j,{name:"customDomain",control:c,render:({field:{onChange:b,value:x},fieldState:{error:l}})=>o(Q,{value:x,type:"text",onChange:b,placeholder:"crm.yourdomain.com",error:l==null?void 0:l.message,fullWidth:!0})}),m(Be,{children:[o(L,{isLoading:t,Icon:le,title:n._({id:"HpK/8d"}),variant:"primary",onClick:g,type:"button"}),o(L,{Icon:ce,variant:"primary",onClick:C})]})]}),(i==null?void 0:i.customDomain)&&m(Ue,{children:[o(Ee,{}),e&&e.records.some(b=>b.status!=="success")&&o(ve,{records:e.records})]})]})},Ze=u.div`
  align-items: center;
  display: flex;
`,Le=()=>{const e=h(ue),{i18n:t,_:g}=T(),i=h($),{control:n}=N();return m(q,{children:[o(O,{title:t._({id:"ku9TbG"}),description:t._({id:"tn41zE"})}),o(Ze,{children:o(j,{name:"subdomain",control:n,render:({field:{onChange:d,value:c},fieldState:{error:s}})=>o(V,{children:o(Q,{value:c,type:"text",onChange:d,error:s==null?void 0:s.message,disabled:!!(i!=null&&i.customDomain),rightAdornment:D(e.frontDomain)?`.${e.frontDomain}`:void 0,fullWidth:!0})})})})]})},E="subdomain-change-confirmation-modal",He=()=>{const e=pe(),{i18n:t,_:g}=T(),i=_.object({subdomain:_.string().min(3,{message:t._({id:"ZETwlU"})}).max(30,{message:t._({id:"OlC/tU"})}).regex(/^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/,{message:t._({id:"oTTQsc"})}),customDomain:_.string().regex(/^([a-zA-Z0-9][a-zA-Z0-9-]*\.)+[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,}$/,{message:t._({id:"P3qQyo"})}).regex(/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/,{message:t._({id:"u3hwhx"})}).max(256).optional().or(_.literal(""))}).required(),{enqueueSuccessSnackBar:n,enqueueErrorSnackBar:d}=F(),[c]=ge(),{redirectToWorkspaceDomain:s}=he(),[a,C]=be($),{openModal:b,closeModal:x}=fe(),l=Se({mode:"onSubmit",delayError:500,defaultValues:{subdomain:(a==null?void 0:a.subdomain)??"",customDomain:(a==null?void 0:a.customDomain)??""},resolver:ye(i)}),H=l.watch("subdomain"),K=l.watch("customDomain"),X=(r,f)=>{c({variables:{input:{customDomain:D(r)&&r.length>0?r:null}},onCompleted:()=>{C({...f,customDomain:r&&r.length>0?r:null}),n({message:t._({id:"1GTWIA"})})},onError:p=>{var S,y;if(p instanceof I&&((y=(S=p.graphQLErrors[0])==null?void 0:S.extensions)==null?void 0:y.code)==="CONFLICT")return l.control.setError("subdomain",{type:"manual",message:t._({id:"omhc+7"})});d({apolloError:p})}})},Y=(r,f)=>{c({variables:{input:{subdomain:r}},onError:p=>{var S,y;if(p instanceof I&&((y=(S=p.graphQLErrors[0])==null?void 0:S.extensions)==null?void 0:y.code)==="CONFLICT")return x(E),l.control.setError("subdomain",{type:"manual",message:t._({id:"omhc+7"})});d({apolloError:p})},onCompleted:async()=>{const p=new URL(window.location.href);p.hostname=new URL(f.workspaceUrls.subdomainUrl).hostname.replace(f.subdomain,r),C({...f,subdomain:r}),n({message:t._({id:"DTG2nE"})}),await s(p.toString())}})},J=async()=>{const r=l.getValues();if(H===(a==null?void 0:a.subdomain)&&K===(a==null?void 0:a.customDomain))return d({message:t._({id:"OTe3RI"})});if(!r||!a)return d({message:t._({id:"QdoUFL"})});if(D(r.subdomain)&&r.subdomain!==a.subdomain){b(E);return}if(r.customDomain!==a.customDomain)return X(r.customDomain,a)};return m(V,{children:[o("form",{onSubmit:l.handleSubmit(J),children:o(Ce,{...l,children:o($e,{title:t._({id:"EoKe5U"}),links:[{children:o(v,{id:"pmUArF"}),href:U(R.Workspace)},{children:o(v,{id:"Weq9zb"}),href:U(R.Workspace)},{children:o(v,{id:"EoKe5U"})}],actionButton:o(De,{onCancel:()=>e(R.Workspace),isSaveDisabled:l.formState.isSubmitting}),children:m(Te,{children:[o(Le,{}),o(Ie,{})]})})})}),o(_e,{modalId:E,title:t._({id:"EYSFEW"}),subtitle:t._({id:"Cl+hUj"}),onConfirmClick:()=>{const r=l.getValues();a&&Y(r.subdomain,a)}})]})};export{E as SUBDOMAIN_CHANGE_CONFIRMATION_MODAL_ID,He as SettingsDomain};
