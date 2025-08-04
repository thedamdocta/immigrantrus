import{eH as A,N as $,eP as B,T as E,b2 as k,p as O,a as f,j as t,dA as z,dB as H,h,i as C,dz as U,n as l,eJ as G,B as b,cC as Q,ae as Y,a3 as y,eQ as X,eR as q,r as T,b9 as I,w as K,bM as W,bf as J,H as Z,af as u,E as M,z as j,a4 as ee,ad as te,_ as ne,a2 as w,a5 as se,a7 as oe,a8 as re,a9 as ie,aa as le,Q as ae}from"./index.Dg3lKJeg.js";import{S as ce}from"./SettingsPageContainer.CJeLyK8s.js";import{S as N}from"./SettingsFieldTypeConfigs.DAFrDVaZ.js";import{S as ue}from"./SettingsCard.EuecTdsf.js";import{S as m}from"./index.DYjQm0RB.js";import{S as de}from"./SubMenuTopBarContainer.BNGFwgBo.js";const pe=l.div`
  align-items: center;
  color: ${({theme:e})=>e.font.color.tertiary};
  cursor: default;
  display: flex;
  font-size: ${({theme:e})=>e.font.size.md};
`,Se=l.div`
  position: relative;
  width: 100%;
`,he=l(Q)`
  color: ${({theme:e})=>e.font.color.primary};
  position: absolute;
  right: ${({theme:e})=>e.spacing(1.5)};
  top: 50%;
  transform: translateY(-50%);
`,D=l.div`
  cursor: ${({disabled:e})=>e?"not-allowed":"pointer"};
  width: 100%;
`,v=l(G)`
  background: ${({theme:e,selected:n})=>n?e.background.quaternary:"transparent"};
  opacity: ${({disabled:e})=>e?.5:1};
  pointer-events: ${({disabled:e})=>e?"none":"auto"};

  &:hover {
    background: ${({theme:e,disabled:n})=>n?"transparent":e.background.tertiary};
  }
`,fe=l.span`
  margin-left: ${({theme:e})=>e.spacing(2)};
`,_=l(Y)`
  color: ${({theme:e})=>e.font.color.primary};
  padding-right: ${({theme:e})=>e.spacing(6)};
`,ge=()=>{const e="settings-object-new-field-breadcrumb-dropdown",{closeDropdown:n}=A(),o=$(),s=B(),{objectNamePlural:a=""}=E(),[c]=k(),d=O(),r=c.get("fieldType"),p=s.pathname.includes("/configure"),g=F=>{F==="configure"&&C(r)?o(b.ObjectNewFieldConfigure,{objectNamePlural:a},{fieldType:r}):o(b.ObjectNewFieldSelect,{objectNamePlural:a},r?{fieldType:r}:void 0),n(e)};return f(pe,{children:["New Field ",t(fe,{children:"-"}),t(U,{dropdownPlacement:"bottom-start",dropdownId:e,clickableComponent:f(Se,{children:[t(he,{size:d.icon.size.md}),p?t(_,{variant:"tertiary",title:h._({id:"yXvRMf"})}):t(_,{variant:"tertiary",title:h._({id:"SLjiTq"})})]}),dropdownComponents:t(z,{children:f(H,{children:[t(D,{children:t(v,{text:h._({id:"SLjiTq"}),onClick:()=>g("select"),selected:!p})}),t(D,{disabled:!C(r),children:t(v,{text:h._({id:"yXvRMf"}),onClick:()=>g("configure"),selected:p,disabled:!C(r)})})]})})})]})},Ce=["Basic","Relation","Advanced"],be={Basic:"All the basic field types you need to start",Advanced:"More advanced fields for advanced projects",Relation:"Create a relation with another object"},ye=({fieldMetadataItem:e})=>{const n=(e==null?void 0:e.defaultValue)??!0,{resetField:o}=y();return{initialDefaultValue:n,resetDefaultValueField:()=>{o("defaultValue",{defaultValue:n})}}},Fe=e=>`'${e}'`,Te=({fieldMetadataItem:e})=>{var d,r,p;const n=((d=e==null?void 0:e.defaultValue)==null?void 0:d.amountMicros)??null,o=((r=e==null?void 0:e.defaultValue)==null?void 0:r.currencyCode)??Fe(X.USD),s={settings:{format:((p=e==null?void 0:e.settings)==null?void 0:p.format)??"short"},defaultValue:{amountMicros:n,currencyCode:o}},{resetField:a}=y(),c=()=>{a("defaultValue",{defaultValue:s.defaultValue}),a("settings",{defaultValue:s.settings})};return{initialAmountMicrosValue:n,initialCurrencyCodeValue:o,initialSettingsValue:s.settings,initialDefaultValue:s.defaultValue,resetDefaultValueField:c}},Ve=e=>{const n=/^\d/.test(e)?`OPT${e}`:e;return q(n,{trim:!0,separator:"_",allowedChars:"a-zA-Z0-9_"}).toUpperCase()},we={color:"green",id:I(),label:"Option 1",position:0,value:Ve("Option 1")},me=({fieldMetadataItem:e})=>{const n=(e==null?void 0:e.defaultValue)??null,o=T.useMemo(()=>{var c;return(c=e==null?void 0:e.options)!=null&&c.length?[...e.options].sort((d,r)=>d.position-r.position):[we]},[e==null?void 0:e.options]),{resetField:s}=y();return{initialDefaultValue:n,initialOptions:o,resetDefaultValueField:()=>s("defaultValue",{defaultValue:n})}},De=l.div`
  display: flex;
  flex-direction: column;
  gap: inherit;
  width: 100%;
`,ve=l.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
`,_e=l.div`
  display: flex;

  position: relative;
  width: calc(50% - ${({theme:e})=>e.spacing(1)});
`,Ee=l(ne)`
  width: 100%;
`,Oe=({excludedFieldTypes:e=[],fieldMetadataItem:n,objectNamePlural:o})=>{const s=O(),{control:a,setValue:c}=y(),[d,r]=T.useState(""),p=Object.entries(N).filter(([S,i])=>!e.includes(S)&&i.label.toLowerCase().includes(d.toLowerCase())),{resetDefaultValueField:g}=ye({fieldMetadataItem:n}),{resetDefaultValueField:F}=Te({fieldMetadataItem:n}),{resetDefaultValueField:L}=me({fieldMetadataItem:n}),R=S=>{switch(S){case u.BOOLEAN:g();break;case u.CURRENCY:F();break;case u.SELECT:case u.MULTI_SELECT:L();break}},x=K(W.IS_MORPH_RELATION_ENABLED);return f(te,{children:[" ",t(m,{children:t(Ee,{instanceId:"new-field-type-search",LeftIcon:J,placeholder:h._({id:"lnDfeK"}),value:d,onChange:r})}),t(ee,{name:"type",control:a,render:()=>t(De,{children:Ce.map(S=>f(m,{children:[t(Z,{title:S,description:be[S]}),t(ve,{children:p.filter(([,i])=>i.category===S).filter(([i])=>i!==u.MORPH_RELATION||x).map(([i,V])=>t(_e,{children:t(M,{to:j(b.ObjectNewFieldConfigure,{objectNamePlural:o},{fieldType:i}),fullWidth:!0,onClick:()=>{c("type",i),R(i)},children:t(ue,{Icon:t(V.Icon,{size:s.icon.size.xl,stroke:s.icon.stroke.sm}),title:V.label},i)})},i))})]},S))})})]})},P=w.object({type:w.enum(Object.keys(N))}),je=()=>{const e=se(),{objectNamePlural:n=""}=E(),{findActiveObjectMetadataItemByNamePlural:o}=oe(),s=o(n),a=re({resolver:ie(P),defaultValues:{type:u.TEXT}}),c=[u.NUMERIC,u.RICH_TEXT,u.RICH_TEXT_V2,u.ACTOR].filter(C);return T.useEffect(()=>{s||e(le.NotFound)},[s,e]),s?t(ae,{...a,children:t(de,{title:h._({id:"vb5TwV"}),links:[{children:h._({id:"pmUArF"}),href:"/settings/general"},{children:h._({id:"B3toQF"}),href:"/settings/objects"},{children:s.labelPlural,href:j(b.ObjectDetail,{objectNamePlural:n})},{children:t(ge,{})}],children:t(ce,{children:t(Oe,{objectNamePlural:n,excludedFieldTypes:c})})})}):null},$e=Object.freeze(Object.defineProperty({__proto__:null,SettingsObjectNewFieldSelect:je,settingsDataModelFieldTypeFormSchema:P},Symbol.toStringTag,{value:"Module"}));export{ge as S,Fe as a,Te as b,Ve as c,me as d,$e as e,P as s,ye as u};
