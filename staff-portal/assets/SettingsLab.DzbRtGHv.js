import{r as b,be as P,bz as p,R as h,bP as S,bQ as y,i as g,j as s,a as C,ad as L,L as f,n as F,z as k,h as m,B as x}from"./index.Dg3lKJeg.js";import{S as w}from"./SettingsPageContainer.CJeLyK8s.js";import{S as E}from"./SettingsOptionCardContentToggle.DYPf28jM.js";import{S as _}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./SettingsOptionIconCustomizer.BYkiWDDL.js";import"./Breadcrumb.CQyf5Hn6.js";const v=()=>{const[t,n]=b.useState(null),[r,o]=P(p),l=h(S),[d]=y({onCompleted:e=>{var a;if(g(r)){const i=e.updateLabPublicFeatureFlag;o({...r,featureFlags:[...((a=r.featureFlags)==null?void 0:a.filter(c=>c.key!==i.key))??[],{...i}]})}},onError:e=>{n(e.message)}}),u=async(e,a)=>g(r)?(n(null),!!(await d({variables:{input:{publicFeatureFlag:e,value:a}}})).data):(n("No workspace selected"),!1);return{labPublicFeatureFlags:l.map(e=>{var a,i;return{...e,value:((i=(a=r==null?void 0:r.featureFlags)==null?void 0:a.find(c=>c.key===e.key))==null?void 0:i.value)??!1}}),handleLabPublicFeatureFlagUpdate:u,error:t}},I=F.div`
  display: grid;
  gap: ${({theme:t})=>t.spacing(4)};
  grid-template-columns: 1fr;
`,j=F.img`
  border-bottom: 1px solid ${({theme:t})=>t.border.color.medium};
  height: 120px;
  width: 100%;
  object-fit: cover;
  display: flex;
`,z=()=>{const t=h(p),{labPublicFeatureFlags:n,handleLabPublicFeatureFlagUpdate:r}=v(),[o,l]=b.useState({}),d=async(e,a)=>{await r(e,a)},u=e=>{l(a=>({...a,[e]:!0}))};return(t==null?void 0:t.id)&&s(I,{children:[...n].sort((e,a)=>e.metadata.imagePath!==""&&a.metadata.imagePath===""?-1:e.metadata.imagePath===""&&a.metadata.imagePath!==""?1:0).map(e=>C(f,{rounded:!0,children:[e.metadata.imagePath&&!o[e.key]?s(j,{src:e.metadata.imagePath,alt:e.metadata.label,onError:()=>u(e.key)}):s(L,{}),s(E,{title:e.metadata.label,description:e.metadata.description,checked:e.value,onChange:a=>d(e.key,a),toggleCentered:!1})]},e.key))})},D=()=>s(_,{title:m._({id:"zrpwCd"}),links:[{children:m._({id:"/IX/7x"}),href:k(x.Lab)},{children:m._({id:"zrpwCd"})}],children:s(w,{children:s(z,{})})});export{D as SettingsLab};
