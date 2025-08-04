import{a as g,j as n,n as b,e5 as E,e6 as bi,e7 as ti,e8 as R,e9 as Si,ea as F,eb as _,h,H as B,ec as q,ed as pi,ee as yi,l as w,p as fi,i as y,ef as C,eg as p,o as ni,bv as mi,a6 as hi,eh as _i,ei as Ci,ej as Ii,be as Pi,bz as ei,ek as I,el as P,aL as X,em as vi,dt as Bi,cy as Z,ae as $,by as k,en as wi,R as $i,eo as Ei,z as Ti,B as Ri,Z as J}from"./index.Dg3lKJeg.js";import{I as Ni,a as Qi,b as Mi}from"./IconTag.MbeGpJTx.js";import{S as xi}from"./SettingsPageContainer.CJeLyK8s.js";import{S as Ui}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./Breadcrumb.CQyf5Hn6.js";const Li=b.div`
  display: flex;
  justify-content: space-between;
`,Ai=b.span`
  color: ${({theme:i})=>i.font.color.tertiary};
  font-size: ${({theme:i})=>i.font.size.xs};
  font-weight: ${({theme:i})=>i.font.weight.semiBold};
`,Ki=b.span`
  color: ${({theme:i,isPrimaryColor:s})=>s?i.font.color.primary:i.font.color.secondary};
  font-size: ${({theme:i})=>i.font.size.sm};
  font-weight: ${({theme:i})=>i.font.weight.medium};
`,v=({label:i,value:s,isValueInPrimaryColor:o=!1})=>g(Li,{children:[n(Ai,{children:i}),n(Ki,{isPrimaryColor:o,children:s})]}),zi=()=>{const i=E(),{data:s,loading:o}=bi(),e=s==null?void 0:s.getMeteredProductsUsage.find(d=>d.productKey===ti.WORKFLOW_NODE_EXECUTION);if(o===!0||!e)return{usageQuantity:0,freeUsageQuantity:0,includedFreeQuantity:1e4,paidUsageQuantity:0,unitPriceCents:0,totalCostCents:0};const a=i===R.Trialing?e.freeTrialQuantity:e.freeTierQuantity;return{usageQuantity:e.usageQuantity,freeUsageQuantity:e.usageQuantity>a?a:e.usageQuantity,includedFreeQuantity:a,paidUsageQuantity:e.usageQuantity>a?e.usageQuantity-a:0,unitPriceCents:e.unitPriceCents,totalCostCents:e.totalCostCents}},si=b.div`
  background-color: ${({theme:i})=>i.background.secondary};
  border: 1px solid ${({theme:i})=>i.border.color.medium};
  border-radius: ${({theme:i})=>i.border.radius.md};
  display: flex;
  flex-direction: column;
  gap: ${({theme:i})=>i.spacing(3)};
  padding: ${({theme:i})=>i.spacing(3)};
  width: 100%;
`,Oi=b.div`
  width: 100%;
  height: 1px;
  background-color: ${({theme:i})=>i.background.tertiary};
`,Vi=()=>{const s=E()===Si.Trialing,{freeUsageQuantity:o,includedFreeQuantity:e,paidUsageQuantity:a,unitPriceCents:d,totalCostCents:r}=zi(),u=o===e,c=o/e*100,t=u?F(o):_(o);return g(w,{children:[n(B,{title:h._({id:"1cOZuL"}),description:h._({id:"dshGKq"})}),g(si,{children:[n(v,{label:h._({id:"wjsFMQ"}),value:`${t}/${F(e)}`}),n(yi,{value:c,barColor:u?q.quaternary:pi.blue,backgroundColor:q.tertiary,withBorderRadius:!0}),n(Oi,{}),!s&&n(v,{label:h._({id:"uE7S0L"}),value:`${_(a)}`}),n(v,{label:h._({id:"iX2opZ"}),value:`$${_(d/100*1e3,2)}`}),!s&&n(v,{label:h._({id:"I99Miw"}),isValueInPrimaryColor:!0,value:`$${_(r/100,2)}`})]})]})},Di=b.div`
  align-items: center;
  gap: ${({theme:i})=>i.spacing(1)};
  color: ${({theme:i})=>i.font.color.primary};
  display: flex;
`,Gi=b.div`
  align-items: center;
  gap: ${({theme:i})=>i.spacing(1)};
  color: ${({theme:i})=>i.font.color.tertiary};
  display: flex;
  width: 120px;
`,Yi=b.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`,T=({Icon:i,label:s,value:o})=>{const e=fi();return g(Di,{children:[g(Gi,{children:[n(i,{size:e.icon.size.md}),n(Yi,{children:s})]}),o]})},Hi=i=>{var u,c,t,S;if(!y(i))return;const s=i.find(l=>l.planKey===C.ENTERPRISE),o=(u=s==null?void 0:s.baseProduct.prices)==null?void 0:u.find(l=>l.recurringInterval===p.Year),e=(c=s==null?void 0:s.baseProduct.prices)==null?void 0:c.find(l=>l.recurringInterval===p.Month),a=i.find(l=>l.planKey===C.PRO),d=(t=a==null?void 0:a.baseProduct.prices)==null?void 0:t.find(l=>l.recurringInterval===p.Year),r=(S=a==null?void 0:a.baseProduct.prices)==null?void 0:S.find(l=>l.recurringInterval===p.Month);return{[C.ENTERPRISE]:{[p.Year]:(o==null?void 0:o.unitAmount)/100/12,[p.Month]:(e==null?void 0:e.unitAmount)/100},[C.PRO]:{[p.Year]:(d==null?void 0:d.unitAmount)/100/12,[p.Month]:(r==null?void 0:r.unitAmount)/100}}},W="switch-billing-interval-modal",ii="switch-billing-plan-modal",ji=b.div`
  align-items: center;
  display: flex;
  gap: ${({theme:i})=>i.spacing(2)};
  margin-top: ${({theme:i})=>i.spacing(4)};
`,Fi=()=>{var U,L,A,K,z,O,V,D,G,Y,H;const{i18n:i,_:s}=ni(),{openModal:o}=mi(),{enqueueSuccessSnackBar:e,enqueueErrorSnackBar:a}=hi(),d=E(),{data:r}=_i(),[u]=Ci(),[c]=Ii(),[t,S]=Pi(ei),l=((U=t==null?void 0:t.currentBillingSubscription)==null?void 0:U.interval)===I.Month,N=((L=t==null?void 0:t.currentBillingSubscription)==null?void 0:L.interval)===I.Year,Q=((A=t==null?void 0:t.currentBillingSubscription)==null?void 0:A.metadata.plan)===P.PRO,ai=((K=t==null?void 0:t.currentBillingSubscription)==null?void 0:K.metadata.plan)===P.ENTERPRISE,M=d!==R.PastDue,oi=Q?n(X,{color:"sky",text:i._({id:"3fPjUY"})}):ai?n(X,{color:"purple",text:i._({id:"ucgZ0o"})}):void 0,li=l?i._({id:"+8Nek/"}):N?i._({id:"zkWmBh"}):void 0,ri=(V=(O=(z=t==null?void 0:t.currentBillingSubscription)==null?void 0:z.billingSubscriptionItems)==null?void 0:O.find(f=>{var j;return((j=f.billingProduct)==null?void 0:j.metadata.productKey)===ti.BASE_PRODUCT}))==null?void 0:V.quantity,ci=r==null?void 0:r.plans,m=Hi(ci),di=(G=m==null?void 0:m[(D=t==null?void 0:t.currentBillingSubscription)==null?void 0:D.metadata.plan])==null?void 0:G[I.Year],x=(H=m==null?void 0:m[P.ENTERPRISE])==null?void 0:H[(Y=t==null?void 0:t.currentBillingSubscription)==null?void 0:Y.interval],ui=async()=>{try{if(await u(),y(t==null?void 0:t.currentBillingSubscription)){const f={...t,currentBillingSubscription:{...t==null?void 0:t.currentBillingSubscription,interval:I.Year}};S(f)}e({message:i._({id:"A5YO8f"})})}catch{a({message:i._({id:"ENV7jU"})})}},gi=async()=>{try{if(await c(),y(t==null?void 0:t.currentBillingSubscription)){const f={...t,currentBillingSubscription:{...t==null?void 0:t.currentBillingSubscription,metadata:{...t==null?void 0:t.currentBillingSubscription.metadata,plan:P.ENTERPRISE}}};S(f)}e({message:i._({id:"KNMVB5"})})}catch{a({message:i._({id:"JKNROf"})})}};return g(w,{children:[n(B,{title:i._({id:"WVzGc2"}),description:i._({id:"NBHoKd"})}),g(si,{children:[n(T,{label:i._({id:"GdgCoi"}),Icon:Ni,value:oi}),n(T,{label:i._({id:"nJGwRf"}),Icon:vi,value:li}),n(T,{label:i._({id:"grt0Pu"}),Icon:Bi,value:ri})]}),g(ji,{children:[l&&n($,{Icon:Z,title:i._({id:"eCX1DT"}),variant:"secondary",onClick:()=>o(W),disabled:!M}),Q&&n($,{Icon:Z,title:i._({id:"GCMizN"}),variant:"secondary",onClick:()=>o(ii),disabled:!M})]}),n(k,{modalId:W,title:i._({id:"N8mUQE"}),subtitle:i._({id:"o4xIH4",values:{yearlyPrice:di}}),onConfirmClick:ui,confirmButtonText:i._({id:"7VpPHA"}),confirmButtonAccent:"blue"}),n(k,{modalId:ii,title:i._({id:"C8G9Mq"}),subtitle:N?i._({id:"zEM7Ne",values:{enterprisePrice:x}}):i._({id:"HM4D8s",values:{enterprisePrice:x}}),onConfirmClick:gi,confirmButtonText:i._({id:"7VpPHA"}),confirmButtonAccent:"blue"})]})},Wi=()=>{const{i18n:i,_:s}=ni(),{redirect:o}=wi(),e=$i(ei),a=e==null?void 0:e.billingSubscriptions,d=((a==null?void 0:a.length)??0)>0,r=E(),u=y(r)&&r!==R.Canceled,{data:c,loading:t}=Ei({variables:{returnUrlPath:"/settings/billing"},skip:!d}),S=t||!y(c)||!y(c.billingPortalSession.url),l=()=>{y(c)&&y(c.billingPortalSession.url)&&o(c.billingPortalSession.url)};return n(Ui,{title:i._({id:"R+w/Va"}),links:[{children:n(J,{id:"pmUArF"}),href:Ti(Ri.Workspace)},{children:n(J,{id:"R+w/Va"})}],children:g(xi,{children:[u&&n(Fi,{}),u&&n(Vi,{}),g(w,{children:[n(B,{title:i._({id:"nvgUPq"}),description:i._({id:"h2KoTu"})}),n($,{Icon:Qi,title:i._({id:"KANz0G"}),variant:"secondary",onClick:l,disabled:S})]}),u&&g(w,{children:[n(B,{title:i._({id:"N6gPiD"}),description:i._({id:"RhNbPE"})}),n($,{Icon:Mi,title:i._({id:"rRK/Lf"}),variant:"secondary",accent:"danger",onClick:l,disabled:S})]})]})})};export{Wi as SettingsBilling};
