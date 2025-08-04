import{a3 as w,o as F,p as D,i as a,a as L,j as r,c7 as N,a4 as C,_ as $,c8 as E,$ as I,c9 as R,ad as m,ca as j,cb as M,cc as t,L as ll,cd as nl,n as x,ce as sl,cf as O,a2 as d,h as V,cg as H}from"./index.Dg3lKJeg.js";import{S as rl}from"./SettingsOptionCardContentToggle.DYPf28jM.js";import{D as il}from"./DatabaseIdentifierMaximumLength.CM85nVoY.js";const T=il,ul=x.div`
  display: flex;
  gap: ${({theme:s})=>s.spacing(2)};
  margin-bottom: ${({theme:s})=>s.spacing(2)};
  width: 100%;
`,Z=x.div`
  display: flex;
  flex-direction: column;
`,ol=x.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:s})=>s.spacing(4)};
  width: 100%;
  flex: 1;
`,el=x.div`
  padding-top: ${({theme:s})=>s.spacing(4)};
`,gl=x.div`
  display: flex;
  gap: ${({theme:s})=>s.spacing(2)};
  position: relative;
  width: 100%;
`,pl=x.span`
  color: ${({theme:s})=>s.font.color.light};
  font-size: ${({theme:s})=>s.font.size.xs};
  font-weight: ${({theme:s})=>s.font.weight.semiBold};
  margin-bottom: ${({theme:s})=>s.spacing(1)};
`,k="info-circle-id",Sl=({disableEdition:s=!1,onNewDirtyField:i,objectMetadataItem:l})=>{const{control:f,watch:p,setValue:_}=w(),{i18n:o,_:W}=F(),S=D(),h=p("isLabelSyncedWithName"),X=p("labelSingular"),q=p("labelPlural");p("nameSingular"),p("namePlural"),p("description"),p("icon");const v=!a(l)||l.isCustom?h?o._({id:"qk4i22"}):o._({id:"JE2tjr"}):o._({id:"msssZq"}),G=n=>{if(!a(n))return;const u=sl.plural(n);_("labelPlural",u,{shouldDirty:!0}),h&&A(u)},z=n=>{a(n)&&_("nameSingular",O(n),{shouldDirty:!0})},A=n=>{a(n)&&_("namePlural",O(n),{shouldDirty:!0})},J=`${l==null?void 0:l.id}-description`,K=`${l==null?void 0:l.id}-label-singular`,U=`${l==null?void 0:l.id}-label-plural`;return L(m,{children:[L(ul,{children:[L(Z,{children:[r(pl,{children:o._({id:"wwu18a"})}),r(C,{name:"icon",control:f,defaultValue:(l==null?void 0:l.icon)??"IconListNumbers",render:({field:{onChange:n,value:u}})=>r(N,{selectedIconKey:u,onChange:({iconKey:e})=>{n(e),i==null||i()}})})]}),r(C,{name:"labelSingular",control:f,defaultValue:(l==null?void 0:l.labelSingular)??"",render:({field:{onChange:n,value:u},formState:{errors:e}})=>{var c;return r($,{instanceId:K,noErrorHelper:!0,error:(c=e.labelSingular)==null?void 0:c.message,label:o._({id:"maCaRp"}),placeholder:"Listing",value:u,onChange:g=>{n(E(g)),G(E(g)),h===!0&&z(g)},onBlur:()=>i==null?void 0:i(),disabled:l&&!(l!=null&&l.isCustom)&&h,fullWidth:!0,maxLength:T})}},"object-labelSingular-text-input"),r(C,{name:"labelPlural",control:f,defaultValue:(l==null?void 0:l.labelPlural)??"",render:({field:{onChange:n,value:u},formState:{errors:e}})=>{var c;return r($,{instanceId:U,noErrorHelper:!0,error:(c=e.labelPlural)==null?void 0:c.message,label:o._({id:"BPig2P"}),placeholder:o._({id:"DL2sg0"}),value:u,onChange:g=>{n(E(g)),h===!0&&A(g)},onBlur:()=>i==null?void 0:i(),disabled:l&&!(l!=null&&l.isCustom)&&h,fullWidth:!0,maxLength:T})}},"object-labelPlural-text-input")]}),r(C,{name:"description",control:f,render:({field:{onChange:n,value:u}})=>r(I,{textAreaId:J,placeholder:o._({id:"Q9pNST"}),minRows:4,value:u??void 0,onChange:e=>n(e??null),onBlur:()=>i==null?void 0:i()})}),r(el,{children:r(gl,{children:L(ol,{children:[[{label:o._({id:"KclpRp"}),fieldName:"nameSingular",placeholder:"listing",defaultValue:(l==null?void 0:l.nameSingular)??"",disableEdition:s||h,tooltip:v},{label:o._({id:"lwCAhN"}),fieldName:"namePlural",placeholder:"listings",defaultValue:(l==null?void 0:l.namePlural)??"",disableEdition:s||h,tooltip:v}].map(({fieldName:n,label:u,placeholder:e,disableEdition:c,tooltip:g,defaultValue:Q})=>r(R,{dotPosition:"top",children:r(Z,{children:r(C,{name:n,control:f,defaultValue:Q,render:({field:{onChange:Y,value:y},formState:{errors:b}})=>{var B;return r(m,{children:r($,{instanceId:`${l==null?void 0:l.id}-${n}`,label:u,placeholder:e,value:y,onChange:Y,disabled:c,fullWidth:!0,maxLength:T,onBlur:()=>i==null?void 0:i(),error:(B=b[n])==null?void 0:B.message,noErrorHelper:!0,RightIcon:()=>g&&L(m,{children:[r(j,{id:k+n,size:S.icon.size.md,color:S.font.color.tertiary,style:{outline:"none"}}),r(M,{anchorSelect:`#${k}${n}`,content:g,offset:5,noArrow:!0,place:"bottom",positionStrategy:"fixed",delay:t.shortDelay})]})})})}})})},`object-${n}-text-input`)),(!l||(l==null?void 0:l.isCustom))&&r(R,{children:r(C,{name:"isLabelSyncedWithName",control:f,defaultValue:l==null?void 0:l.isLabelSyncedWithName,render:({field:{onChange:n,value:u}})=>r(ll,{rounded:!0,children:r(rl,{Icon:nl,title:o._({id:"WZ6bN9"}),description:o._({id:"WFtdWr"}),checked:u??!0,advancedMode:!0,onChange:e=>{n(e);const c=a(l)&&l.isCustom,g=!a(l);e===!0&&(c||g)&&(A(q),z(X)),i==null||i()}})})})})]})})})]})},P=d.string().min(1),cl=d.object({description:d.string().nullish(),icon:d.string().optional(),labelSingular:P,labelPlural:P,namePlural:P.and(H),nameSingular:P.and(H),isLabelSyncedWithName:d.boolean()}),al=cl.superRefine(({labelPlural:s,labelSingular:i,namePlural:l,nameSingular:f},p)=>{s.trim().toLowerCase()!==i.trim().toLowerCase()||["labelPlural","labelSingular"].forEach(S=>p.addIssue({code:d.ZodIssueCode.custom,message:V._({id:"djfBXF"}),path:[S]})),f.toLowerCase()!==l.toLowerCase()||["nameSingular","namePlural"].forEach(S=>p.addIssue({code:d.ZodIssueCode.custom,message:V._({id:"zvwLTy"}),path:[S]}))});export{Sl as S,al as s};
