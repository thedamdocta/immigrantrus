import{a3 as E,j as t,$ as Pe,h as L,a4 as C,he as Y,p as ye,o as x,i as H,hf as ie,a as b,c7 as Fe,_ as z,hg as Ie,ad as O,ca as Ue,cb as je,cc as ke,hh as ze,L as be,cd as Be,c9 as Q,n as p,cf as We,Z as q,K as Z,a2 as i,g5 as Ce,hi as De,b0 as $,h3 as _e,hj as Ye,dL as B,df as Ee,hk as He,hl as Ge,hm as Xe,hn as qe,ho as Ke,hp as V,hq as Qe,gK as Ze,hr as Je,d$ as Me,d0 as re,bn as we,hs as en,ht as nn,hu as le,co as tn,hv as on,a7 as J,r as se,hw as fe,d_ as P,ao as rn,u as Te,af as s,hx as ln,b9 as sn,hy as an,eH as ae,dA as ce,dB as de,hz as cn,hA as dn,dz as ue,eJ as X,bx as un,eK as pn,hB as gn,hC as hn,d9 as mn,R as Sn,g8 as yn,ga as K,hD as Fn,hE as bn,hF as pe,gb as Cn,hG as Dn,bN as _n,bq as En,ag as wn}from"./index.Dg3lKJeg.js";import{S as fn,a as Tn}from"./SettingsOptionCardContentToggle.DYPf28jM.js";import{D as M}from"./DatabaseIdentifierMaximumLength.CM85nVoY.js";import{S as On}from"./SettingsFieldTypeConfigs.DAFrDVaZ.js";import{S as I}from"./SettingsOptionCardContentSelect.DFB7abf9.js";import{a as R,u as Oe,b as Ne,c as W,d as Le,s as Nn}from"./SettingsObjectNewFieldSelect.DyonPEDi.js";import{I as Ve,a as Ln,b as Vn,c as $n,d as An,e as vn}from"./IconTextWrap.Ct51CuzD.js";import{c as A,d as Rn,e as xn,a as Pn,R as ee,s as In,m as Un}from"./SettingsDataModelFieldPreviewCard.C61YjwJF.js";import{S as jn,a as kn,b as zn,c as Bn,d as Wn}from"./SettingsOptionIconCustomizer.BYkiWDDL.js";const Yn=M,Hn=()=>Y([]).pick({description:!0}),Wo=({disabled:e,fieldMetadataItem:n})=>{const{control:o}=E(),u=`${n==null?void 0:n.id}-description`;return t(C,{name:"description",control:o,defaultValue:n==null?void 0:n.description,render:({field:{onChange:a,value:c}})=>t(Pe,{textAreaId:u,placeholder:L._({id:"Q9pNST"}),minRows:4,value:c??void 0,onChange:a,disabled:e})})},Gn=(e=[])=>Y(e).pick({icon:!0,label:!0}).merge(Y().pick({name:!0,isLabelSyncedWithName:!0}).partial()),ge=p.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
  margin-bottom: ${({theme:e})=>e.spacing(1)};
  width: 100%;
`,Xn=p.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing(4)};
  width: 100%;
  flex: 1;
`,qn=p.div`
  padding-top: ${({theme:e})=>e.spacing(4)};
`,Kn=p.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
  position: relative;
  width: 100%;
`,Yo=({isCreationMode:e=!1,fieldMetadataItem:n,maxLength:o})=>{const{control:u,setValue:a,watch:c,formState:{errors:m},trigger:r}=E(),d=ye(),l=c("label"),{i18n:g,_:F}=x(),w=`${n==null?void 0:n.id}-label`,T=`${n==null?void 0:n.id}-name`,_=c("isLabelSyncedWithName")??(H(n)?n.isLabelSyncedWithName:!0),h=_?g._({id:"qk4i22"}):g._({id:"JE2tjr"}),y=N=>{H(N)&&a("name",We(N),{shouldDirty:!0})},S=(n==null?void 0:n.type)===ie.RELATION||(n==null?void 0:n.type)===ie.MORPH_RELATION,D=(n==null?void 0:n.isCustom)===!0&&!S,f=!e&&D,U=_===!1&&D,G=e||!e&&((n==null?void 0:n.isCustom)===!1||D);return b(O,{children:[b(ge,{children:[t(C,{name:"icon",control:u,defaultValue:(n==null?void 0:n.icon)??"IconUsers",render:({field:{onChange:N,value:j}})=>t(Fe,{selectedIconKey:j??"IconUsers",onChange:({iconKey:k})=>N(k),variant:"primary"})}),t(C,{name:"label",control:u,defaultValue:n==null?void 0:n.label,render:({field:{onChange:N,value:j}})=>{var k;return t(z,{instanceId:w,placeholder:g._({id:"gqv5ZL"}),value:j,disabled:!G,onChange:oe=>{N(oe),r("label"),(e||_===!0&&(n==null?void 0:n.isCustom)===!0)&&y(oe)},error:Ie((k=m.label)==null?void 0:k.message),maxLength:o,fullWidth:!0})}})]}),f&&t(Q,{hideDot:!0,children:t(qn,{children:t(Kn,{children:b(Xn,{children:[t(ge,{children:t(C,{name:"name",control:u,defaultValue:n==null?void 0:n.name,render:({field:{onChange:N,value:j}})=>t(O,{children:t(z,{instanceId:T,label:g._({id:"kAtj+q"}),placeholder:g._({id:"eXoH4Q"}),value:j,onChange:N,disabled:!U,fullWidth:!0,maxLength:M,RightIcon:()=>h&&b(O,{children:[t(Ue,{id:"info-circle-id-name",size:d.icon.size.md,color:d.font.color.tertiary,style:{outline:"none"}}),t(je,{anchorSelect:"#info-circle-id-name",content:h,offset:5,noArrow:!0,place:"bottom",positionStrategy:"fixed",delay:ke.shortDelay})]})})})})}),t(C,{name:"isLabelSyncedWithName",control:u,defaultValue:(n==null?void 0:n.isLabelSyncedWithName)??!0,render:({field:{onChange:N,value:j}})=>t(ze,{hideDot:!1,dotPosition:"centered",children:t(be,{rounded:!0,children:t(fn,{Icon:Be,title:g._({id:"AtzMpB"}),description:g._({id:"gWk8gY"}),checked:j??!0,advancedMode:!0,onChange:k=>{if(N(k),!!H(n)&&k!==!1&&n.isCustom===!0&&!S){y(l);return}}})})})})]})})})})]})},Qn=p.h3`
  color: ${({theme:e})=>e.font.color.extraLight};
  font-size: ${({theme:e})=>e.font.size.sm};
  font-weight: ${({theme:e})=>e.font.weight.medium};
  margin: 0;
  margin-bottom: ${({theme:e})=>e.spacing(4)};
`,Zn=p(Z)`
  background-color: ${({theme:e})=>e.background.transparent.lighter};
`,Jn=p(Z)`
  padding: 0;
`,v=({className:e,preview:n,form:o})=>b(be,{className:e,fullWidth:!0,rounded:!0,children:[b(Zn,{divider:!!o,children:[t(Qn,{children:t(q,{id:"rdUucN"})}),n]}),!!o&&t(Jn,{children:o})]}),Mn=i.object({defaultValue:Ye}),et=({disabled:e,fieldMetadataItem:n})=>{const{i18n:o,_:u}=x(),{control:a}=E(),c=[{label:"No country",value:"",Icon:Ce},...De().sort((r,d)=>r.countryName.localeCompare(d.countryName)).map(({countryName:r,Flag:d})=>({label:r,value:r,Icon:l=>d({width:l.size,height:l.size})}))];return t(C,{name:"defaultValue",defaultValue:{...{addressStreet1:"''",addressStreet2:null,addressCity:null,addressState:null,addressPostcode:null,addressCountry:null,addressLat:null,addressLng:null},...n==null?void 0:n.defaultValue},control:a,render:({field:{onChange:r,value:d}})=>{const l=(d==null?void 0:d.addressCountry)||"";return t(I,{Icon:Ve,title:o._({id:"mC21D6"}),description:o._({id:"PmXLtL"}),children:t($,{dropdownWidth:220,disabled:e,dropdownId:"selectDefaultCountry",value:_e(l),onChange:g=>r({...d,addressCountry:R(g)}),options:c,selectSizeVariant:"small",withSearchInput:!0})})}})},nt=p(A)`
  flex: 1 1 100%;
`,tt=({disabled:e,fieldMetadataItem:n,objectMetadataItem:o})=>t(v,{preview:t(nt,{fieldMetadataItem:n,objectMetadataItem:o}),form:t(et,{disabled:e,fieldMetadataItem:n})}),ot=[{value:!0,label:{id:"c+xCSz"},Icon:B},{value:!1,label:{id:"ocUvR+"},Icon:Ee}],it=i.object({defaultValue:i.boolean()}),rt=({fieldMetadataItem:e})=>{const{i18n:n,_:o}=x(),{control:u}=E(),{initialDefaultValue:a}=Oe({fieldMetadataItem:e});return t(C,{name:"defaultValue",control:u,defaultValue:a,render:({field:{onChange:c,value:m}})=>t(I,{Icon:B,title:n._({id:"aQ8swY"}),description:n._({id:"pofGCP"}),children:t($,{value:m,onChange:c,dropdownId:"object-field-default-value-select-boolean",dropdownWidth:120,needIconCheck:!1,options:ot.map(r=>({...r,label:n._(r.label)})),selectSizeVariant:"small"})})})},lt=p(A)`
  display: grid;
  flex: 1 1 100%;
`,st=({fieldMetadataItem:e,objectMetadataItem:n})=>{const{initialDefaultValue:o}=Oe({fieldMetadataItem:e}),{watch:u}=E();return t(v,{preview:t(lt,{fieldMetadataItem:{...e,defaultValue:u("defaultValue",o)},objectMetadataItem:n}),form:t(rt,{fieldMetadataItem:e})})},at=[{label:{id:"yAT3be"},value:0},{label:{id:"I3hko2"},value:2},{label:{id:"BDDkm3"},value:5},{label:{id:"ZyIk6Y"},value:10},{label:{id:"623MHa"},value:99}],ct=i.object({displayedMaxRows:i.number().nullable()}),dt=i.object({settings:ct}),ut=({disabled:e,fieldMetadataItem:n})=>{var c;const{i18n:o,_:u}=x(),{control:a}=E();return t(C,{name:"settings",defaultValue:{displayedMaxRows:((c=n==null?void 0:n.settings)==null?void 0:c.displayedMaxRows)||0},control:a,render:({field:{onChange:m,value:r}})=>{const d=(r==null?void 0:r.displayedMaxRows)??0;return t(O,{children:t(I,{Icon:Ln,title:o._({id:"5iSD9O"}),description:o._({id:"GoHpxA"}),children:t($,{dropdownId:"text-wrap",value:d,onChange:l=>m({displayedMaxRows:l}),disabled:e,options:at.map(l=>({...l,label:o._(l.label)})),selectSizeVariant:"small"})})})}})},pt=p(A)`
  flex: 1 1 100%;
`,gt=({disabled:e,fieldMetadataItem:n,objectMetadataItem:o})=>{const{watch:u}=E();return t(v,{preview:t(pt,{fieldMetadataItem:{...n,settings:u("settings")},objectMetadataItem:o}),form:t(ut,{disabled:e,fieldMetadataItem:n})})},ht=i.object({format:i.enum(He)}),mt=i.object({defaultValue:Rn,settings:ht}),St=({disabled:e,fieldMetadataItem:n})=>{const{i18n:o,_:u}=x(),{initialAmountMicrosValue:a,initialCurrencyCodeValue:c,initialSettingsValue:m}=Ne({fieldMetadataItem:n}),{control:r}=E();return b(O,{children:[t(C,{name:"defaultValue.amountMicros",control:r,defaultValue:a,render:()=>t(O,{})}),t(C,{name:"defaultValue.currencyCode",control:r,defaultValue:c,render:({field:{onChange:d,value:l}})=>t(I,{Icon:Ge,title:o._({id:"aQ8swY"}),description:o._({id:"YcrXB2"}),children:t($,{dropdownWidth:220,value:l,onChange:d,disabled:e,dropdownId:"object-field-default-value-select-currency",options:Xe.map(({value:g,...F})=>({...F,value:R(g)})),selectSizeVariant:"small",withSearchInput:!0})})}),t(C,{name:"settings.format",control:r,defaultValue:m.format,render:({field:{onChange:d,value:l}})=>t(I,{Icon:qe,title:o._({id:"kI1qVD"}),description:o._({id:"2ZFG9X"}),children:t($,{dropdownWidth:140,value:l,onChange:d,disabled:e,dropdownId:"object-field-format-select",options:[{label:"Short",value:"short"},{label:"Full",value:"full"}],selectSizeVariant:"small",withSearchInput:!1})})})]})},yt=p(A)`
  display: grid;
  flex: 1 1 100%;
`,Ft=({disabled:e,fieldMetadataItem:n,objectMetadataItem:o})=>{const{initialDefaultValue:u,initialSettingsValue:a}=Ne({fieldMetadataItem:n}),{watch:c}=E();return t(v,{preview:t(yt,{fieldMetadataItem:{...n,defaultValue:c("defaultValue",u),settings:c("settings",a)},objectMetadataItem:o}),form:t(St,{disabled:e,fieldMetadataItem:n})})},bt=e=>{try{return Ke(new Date,e),!0}catch{return!1}},Ct=e=>e===V.CUSTOM,$e=({fieldMetadataItem:e})=>{var c,m;const n=((c=e==null?void 0:e.settings)==null?void 0:c.displayFormat)??V.USER_SETTINGS,o=((m=e==null?void 0:e.settings)==null?void 0:m.customUnicodeDateFormat)??"",{resetField:u}=E();return{initialDisplayFormat:n,initialCustomUnicodeDateFormat:o,resetDefaultValueField:()=>u("settings",{defaultValue:{displayFormat:n,customUnicodeDateFormat:o}})}},Dt=e=>{switch(e){case V.CUSTOM:return L._({id:"8Tg/JR"});case V.RELATIVE:return L._({id:"HR+PwH"});case V.USER_SETTINGS:return L._({id:"ovBPCi"});default:return""}},_t=e=>e===V.CUSTOM?t(q,{id:"9/30HU",components:{0:t("a",{href:"https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table",target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"underline",color:"inherit"}})}}):t(q,{id:"hIJigY"}),Et=i.discriminatedUnion("displayFormat",[i.object({displayFormat:i.enum([V.RELATIVE,V.USER_SETTINGS])}),i.object({displayFormat:i.literal(V.CUSTOM),customUnicodeDateFormat:i.string().refine(bt)})]),Ae=i.object({settings:Et.optional()}),wt=p(z)`
  padding: ${({theme:e})=>e.spacing(4)};
  padding-top: 0;
`,ft=({disabled:e,fieldMetadataItem:n})=>{const{i18n:o,_:u}=x(),{control:a,watch:c}=E(),{initialDisplayFormat:m,initialCustomUnicodeDateFormat:r}=$e({fieldMetadataItem:n}),d=c("settings.displayFormat"),l=d||m,g=Ct(l),F=_t(l);return b(O,{children:[t(C,{name:"settings.displayFormat",control:a,defaultValue:m,render:({field:{onChange:w,value:T}})=>t(I,{Icon:Vn,title:o._({id:"e/xgrw"}),disabled:e,description:F,children:t($,{disabled:e,selectSizeVariant:"small",dropdownWidth:120,dropdownId:"selectFieldDateDisplayFormat",value:T,onChange:w,options:Object.keys(V).map(_=>({label:Dt(_),value:_}))})})}),t(Ze,{isExpanded:g,dimension:"height",animationDurations:Qe,mode:"scroll-height",containAnimation:!1,children:t(C,{name:"settings.customUnicodeDateFormat",control:a,defaultValue:r,render:({field:{onChange:w,value:T}})=>t(wt,{instanceId:"custom-date-format-input",placeholder:o._({id:"abDZwc"}),value:T,onChange:_=>w(_),disabled:!1,fullWidth:!0})})})]})},Tt=p(A)`
  display: grid;
  flex: 1 1 100%;
`,Ot=({disabled:e,fieldMetadataItem:n,objectMetadataItem:o})=>{const{initialDisplayFormat:u,initialCustomUnicodeDateFormat:a}=$e({fieldMetadataItem:n}),{watch:c}=E();return t(v,{preview:t(Tt,{fieldMetadataItem:{...n,settings:{displayFormat:c("settings.displayFormat",u),customUnicodeDateFormat:c("settings.customUnicodeDateFormat",a)}},objectMetadataItem:o}),form:t(ft,{disabled:e,fieldMetadataItem:n})})},Nt=i.object({decimals:i.number().nullable(),type:i.enum(Je).nullable()}),Lt=p.div`
  align-items: center;
  display: flex;
  gap: ${({theme:e})=>e.spacing(1)};
  margin-left: auto;
  width: ${({theme:e})=>e.spacing(30)};
`,Vt=p(z)`
  width: ${({theme:e})=>e.spacing(16)};
  input {
    width: ${({theme:e})=>e.spacing(16)};
    height: ${({theme:e})=>e.spacing(6)};
    text-align: center;
    font-weight: ${({theme:e})=>e.font.weight.medium};
  }
`,$t=({value:e,onChange:n,minValue:o=0,maxValue:u=100,disabled:a=!1})=>{const c=()=>{e<u&&n(e+1)},m=()=>{e>o&&n(e-1)},r=d=>{const l=en(d);if(l===null){n(o);return}if(!(l<o)){if(l>u){n(u);return}n(l)}};return b(Lt,{children:[t(re,{size:"small",Icon:Me,variant:"secondary",onClick:m,disabled:a}),t(Vt,{instanceId:"settings-counter-input",name:"counter",fullWidth:!0,value:e.toString(),onChange:r,disabled:a}),t(re,{size:"small",Icon:we,variant:"secondary",onClick:c,disabled:a})]})},At=({Icon:e,title:n,description:o,disabled:u=!1,value:a,onChange:c,minValue:m,maxValue:r})=>b(Wn,{disabled:u,children:[e&&t(kn,{children:t(jn,{Icon:e})}),b("div",{children:[t(zn,{children:n}),o&&t(Bn,{children:o})]}),t($t,{value:a,onChange:c,minValue:m,maxValue:r,disabled:u})]}),vt=[{Icon:nn,label:{id:"HptUxX"},value:"number"},{Icon:$n,label:{id:"RRXpo1"},value:"shortNumber"},{Icon:An,label:{id:"/roQKz"},value:"percentage"}],Rt=i.object({settings:Nt}),xt=({disabled:e,fieldMetadataItem:n})=>{var c,m;const{i18n:o,_:u}=x(),{control:a}=E();return t(C,{name:"settings",defaultValue:{decimals:((c=n==null?void 0:n.settings)==null?void 0:c.decimals)??le,type:((m=n==null?void 0:n.settings)==null?void 0:m.type)??"number"},control:a,render:({field:{onChange:r,value:d}})=>{const l=(d==null?void 0:d.decimals)??0,g=(d==null?void 0:d.type)??"number";return b(O,{children:[t(I,{Icon:tn,title:o._({id:"qg5nhQ"}),description:o._({id:"8Vg8H7"}),children:t($,{selectSizeVariant:"small",dropdownId:"number-type",dropdownWidth:120,value:g,onChange:F=>r({type:F,decimals:F==="shortNumber"?le:l}),disabled:e,needIconCheck:!1,options:vt.map(F=>({...F,label:o._(F.label)}))})}),t(Tn,{}),g!=="shortNumber"&&t(At,{Icon:vn,title:o._({id:"0fRFSb"}),description:`E.g. ${(g==="percentage"?99:1e3).toFixed(l)}${g==="percentage"?"%":""} for ${l} decimal${l>1?"s":""}`,value:l,onChange:F=>r({type:g,decimals:F}),disabled:e,minValue:0,maxValue:100})]})}})},Pt=p(A)`
  display: grid;
  flex: 1 1 100%;
`,It=({disabled:e,fieldMetadataItem:n,objectMetadataItem:o})=>{const{watch:u}=E();return t(v,{preview:t(Pt,{fieldMetadataItem:{icon:u("icon"),label:u("label")||"New Field",settings:u("settings")||null,type:n.type},objectMetadataItem:o}),form:t(xt,{disabled:e,fieldMetadataItem:n})})},Ut=i.object({defaultValue:on}),jt=({disabled:e,fieldMetadataItem:n})=>{const{i18n:o,_:u}=x(),{control:a}=E(),c=[{label:o._({id:"4BSfjK"}),value:"",Icon:Ce},...De().sort((d,l)=>d.countryName.localeCompare(l.countryName)).map(d=>({label:`${d.countryName} (+${d.callingCode})`,value:d.countryCode,Icon:l=>d.Flag({width:l.size,height:l.size})}))],m={primaryPhoneNumber:"''",primaryPhoneCountryCode:"''",primaryPhoneCallingCode:"''",additionalPhones:null},r=n==null?void 0:n.defaultValue;return t(C,{name:"defaultValue",defaultValue:{...m,...r},control:a,render:({field:{onChange:d,value:l}})=>t(I,{Icon:Ve,title:o._({id:"4zuPQL"}),description:o._({id:"1xQkU9"}),children:t($,{dropdownId:"selectDefaultCountryCode",value:_e(l==null?void 0:l.primaryPhoneCountryCode),onChange:g=>d({...l,primaryPhoneCountryCode:R(g),primaryPhoneCallingCode:R(xn(g))}),disabled:e,options:c,selectSizeVariant:"small",withSearchInput:!0})})})},kt=p(A)`
  flex: 1 1 100%;
`,zt=({disabled:e,fieldMetadataItem:n,objectMetadataItem:o})=>t(v,{preview:t(kt,{fieldMetadataItem:n,objectMetadataItem:o}),form:t(jt,{disabled:e,fieldMetadataItem:n})}),ve=({fieldMetadataItem:e,objectMetadataItem:n})=>{const{activeObjectMetadataItems:o}=J(),u=Pn(),{relationFieldMetadataItem:a,relationObjectMetadataItem:c,relationType:m}=se.useMemo(()=>e?u({fieldMetadataItem:e}):null,[e,u])??{},r=se.useMemo(()=>{const l=o.filter(fe),g=c??n??l[0];if(!H(g))throw new Error("Relation Form initialization error: invariant violated – no valid object available for relation (this should never happen).");return g},[n,o,c]),d=m??P.ONE_TO_MANY;return{disableFieldEdition:a&&!a.isCustom,disableRelationEdition:!!a,initialRelationFieldMetadataItem:a??{icon:r.icon??"IconUsers",label:[P.MANY_TO_ONE].includes(d)?r.labelPlural:r.labelSingular},initialRelationObjectMetadataItem:r,initialRelationType:d}},Bt=i.object({relation:i.object({field:Y().pick({icon:!0,label:!0}).merge(Y().pick({name:!0,isLabelSyncedWithName:!0}).partial()),objectMetadataId:i.string().uuid(),type:i.enum(Object.keys(ee))})}),Wt=p.div`
  padding: ${({theme:e})=>e.spacing(4)};
`,Yt=p.div`
  display: grid;
  gap: ${({theme:e})=>e.spacing(4)};
  grid-template-columns: ${({isMobile:e})=>e?"1fr":"1fr 1fr"};
  margin-bottom: ${({theme:e})=>e.spacing(4)};
`,Ht=p.span`
  color: ${({theme:e})=>e.font.color.light};
  display: block;
  font-size: ${({theme:e})=>e.font.size.xs};
  font-weight: ${({theme:e})=>e.font.weight.semiBold};
  margin-bottom: ${({theme:e})=>e.spacing(1)};
`,Gt=p.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
  width: 100%;
`,Xt=Object.entries(ee).map(([e,{label:n,Icon:o}])=>({label:n,value:e,Icon:o})),qt=({fieldMetadataItem:e,objectMetadataItem:n})=>{const{i18n:o,_:u}=x(),{control:a,watch:c}=E(),{getIcon:m}=rn(),{activeObjectMetadataItems:r,findObjectMetadataItemById:d}=J(),{disableFieldEdition:l,disableRelationEdition:g,initialRelationFieldMetadataItem:F,initialRelationObjectMetadataItem:w,initialRelationType:T}=ve({fieldMetadataItem:e,objectMetadataItem:n}),_=d(c("relation.objectMetadataId",w==null?void 0:w.id)),h=c("relation.type",T),y=Te();return b(Wt,{children:[b(Yt,{isMobile:y,children:[t(C,{name:"relation.type",control:a,defaultValue:T,render:({field:{onChange:S,value:D}})=>t($,{label:o._({id:"UiAJoB"}),dropdownId:"relation-type-select",fullWidth:!0,disabled:g,value:D,options:Xt,onChange:S})}),t(C,{name:"relation.objectMetadataId",control:a,defaultValue:w.id,render:({field:{onChange:S,value:D}})=>t($,{label:o._({id:"Zrauom"}),dropdownId:"object-destination-select",fullWidth:!0,disabled:g,value:D,options:r.filter(fe).map(f=>({label:f.labelPlural,value:f.id,Icon:m(f.icon)})),onChange:S})})]}),b(Ht,{children:["Field on"," ",h===P.MANY_TO_ONE?_==null?void 0:_.labelSingular:_==null?void 0:_.labelPlural]}),b(Gt,{children:[t(C,{name:"relation.field.icon",control:a,defaultValue:F.icon,render:({field:{onChange:S,value:D}})=>t(Fe,{disabled:l,dropdownId:"field-destination-icon-picker",selectedIconKey:D??void 0,onChange:({iconKey:f})=>S(f),variant:"primary"})}),t(C,{name:"relation.field.label",control:a,defaultValue:F.label,render:({field:{onChange:S,value:D}})=>t(z,{instanceId:"relation-field-label",disabled:l,placeholder:o._({id:"nrXDdR"}),value:D,onChange:S,fullWidth:!0,maxLength:Yn})})]})]})},he=p(A)`
  flex: 1 1 100%;
`,Kt=p.div`
  display: flex;
  gap: 6px;
  flex-direction: ${({isMobile:e})=>e?"column":"row"};
`,Qt=p.img`
  transform: ${({flip:e,isMobile:n})=>{let o="";return n&&(o+="rotate(90deg) "),e===!0&&(o+="scaleX(-1)"),o.trim()}};
  margin: auto;
  width: 54px;
`,Zt=({fieldMetadataItem:e,objectMetadataItem:n})=>{const{watch:o}=E(),{findObjectMetadataItemById:u}=J(),a=Te(),{initialRelationObjectMetadataItem:c,initialRelationType:m,initialRelationFieldMetadataItem:r}=ve({fieldMetadataItem:e,objectMetadataItem:n}),d=o("relation.objectMetadataId",c==null?void 0:c.id),l=u(d);if(!l)return null;const g=o("relation.type",m),F=ee[g],w=g===P.MANY_TO_ONE?P.ONE_TO_MANY:P.MANY_TO_ONE;return t(v,{preview:b(Kt,{isMobile:a,children:[t(he,{fieldMetadataItem:{...e,relation:{type:g}},shrink:!0,objectMetadataItem:n,relationObjectMetadataItem:l,pluralizeLabel:o("relation.type")===P.MANY_TO_ONE}),t(Qt,{src:F.imageSrc,flip:F.isImageFlipped,alt:F.label,isMobile:a}),t(he,{fieldMetadataItem:{...r,icon:o("relation.field.icon",r.icon),label:o("relation.field.label",r.label)||"Field name",type:s.RELATION,relation:{type:w}},shrink:!0,objectMetadataItem:l,relationObjectMetadataItem:n,pluralizeLabel:o("relation.type")!==P.MANY_TO_ONE})]}),form:t(qt,{fieldMetadataItem:e,objectMetadataItem:n})})},Jt=i.object({color:ln,id:i.string(),label:i.string().trim().min(1),position:i.number(),value:i.string()}).refine(e=>{try{return W(e.label),!0}catch{return!1}},{message:"Label is not transliterable"}),Re=i.array(Jt).min(1).refine(e=>{const n=e.map(({id:o})=>o);return new Set(n).size===e.length},{message:"Options must have unique ids"}).refine(e=>{const n=e.map(({value:o})=>o);return new Set(n).size===e.length},{message:"Options must have unique values"}).refine(e=>[...e].sort().every((n,o)=>n.position===o),{message:"Options positions must be sequential"}),xe=(e,n=1)=>{const o=`Option ${e.length+n}`;return e.some(a=>a.label===o)?xe(e,n+1):o},Mt=e=>{var o;const n=xe(e);return{color:an((o=e[e.length-1])==null?void 0:o.color),id:sn(),label:n,position:e.length,value:W(n)}},eo=(e,n)=>n.type===s.SELECT?R(e)===n.defaultValue:n.type===s.MULTI_SELECT&&Array.isArray(n.defaultValue)?n.defaultValue.includes(R(e)):!1,me=M,no=p.div`
  align-items: center;
  display: flex;
  height: ${({theme:e})=>e.spacing(6)};
  padding: ${({theme:e})=>e.spacing(1.5)} 0;
`,to=p(hn)`
  cursor: pointer;
  margin-top: ${({theme:e})=>e.spacing(1)};
  margin-bottom: ${({theme:e})=>e.spacing(1)};

  margin-right: ${({theme:e})=>e.spacing(3.5)};
  margin-left: ${({theme:e})=>e.spacing(3.5)};
`,Se=p(z)`
  flex-grow: 1;
  width: 100%;
  & input {
    height: ${({theme:e})=>e.spacing(6)};
  }
`,oo=p(gn)`
  margin-right: ${({theme:e})=>e.spacing(.75)};
`,io=p(mn)`
  margin-left: ${({theme:e})=>e.spacing(2)};
`,ro=({className:e,isDefault:n,onChange:o,onRemove:u,onSetAsDefault:a,onRemoveAsDefault:c,onInputEnter:m,option:r,isNewRow:d})=>{const l=ye(),g=`select-color-dropdown-${r.id}`,F=`select-actions-dropdown-${r.id}`,{closeDropdown:w}=ae(),{closeDropdown:T}=ae(),_=()=>{m==null||m()};return b(no,{className:e,children:[t(oo,{style:{minWidth:l.icon.size.md},size:l.icon.size.md,stroke:l.icon.stroke.sm,color:l.font.color.extraLight}),t(Q,{animationDimension:"width",hideDot:!0,children:t(Se,{instanceId:`select-option-value-${r.id}`,value:r.value,onChange:h=>o({...r,value:W(h)}),RightIcon:n?B:void 0,maxLength:me})}),t(ue,{dropdownId:g,dropdownPlacement:"bottom-start",clickableComponent:t(to,{colorName:r.color}),dropdownComponents:t(ce,{children:t(de,{children:cn.map(h=>t(dn,{onClick:()=>{o({...r,color:h}),w(g)},color:h,selected:h===r.color},h))})})}),t(Se,{instanceId:`select-option-label-${r.id}`,value:r.label,onChange:h=>{const y=r.value!==W(r.label);o({...r,label:h,value:y?r.value:W(h)})},RightIcon:n?B:void 0,maxLength:me,onInputEnter:_,autoFocusOnMount:d,autoSelectOnMount:d}),t(ue,{dropdownId:F,dropdownPlacement:"right-start",clickableComponent:t(io,{accent:"tertiary",Icon:pn}),dropdownComponents:t(ce,{children:b(de,{children:[n?t(X,{LeftIcon:Ee,text:L._({id:"Q2u5E9"}),onClick:()=>{c==null||c(),T(F)}}):t(X,{LeftIcon:B,text:L._({id:"PPcets"}),onClick:()=>{a==null||a(),T(F)}}),!!u&&!n&&t(X,{accent:"danger",LeftIcon:un,text:L._({id:"00Lxnh"}),onClick:()=>{u(),T(F)}})]})})})]})},ne=i.object({defaultValue:In(),options:Re}),te=i.object({defaultValue:Un(),options:Re});i.union([ne,te]);const lo=p(Z)`
  padding-bottom: ${({theme:e})=>e.spacing(3.5)};
`,so=p.div`
  color: ${({theme:e})=>e.font.color.light};
  font-size: ${({theme:e})=>e.font.size.xs};
  font-weight: ${({theme:e})=>e.font.weight.semiBold};
  margin-bottom: ${({theme:e})=>e.spacing(1.5)};
  margin-top: ${({theme:e})=>e.spacing(1)};
  width: 100%;
  margin-left: ${({theme:e,isAdvancedModeEnabled:n})=>e.spacing(n?10:0)};
`,ao=p.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
  width: 100%;
`,co=p.span`
  color: ${({theme:e})=>e.font.color.light};
  font-size: ${({theme:e})=>e.font.size.xs};
  font-weight: ${({theme:e})=>e.font.weight.semiBold};
  margin-bottom: ${({theme:e})=>e.spacing(1.5)};
  margin-top: ${({theme:e})=>e.spacing(1)};
  width: 100%;
  white-space: nowrap;
`,uo=p.div`
  display: flex;
`,po=p.div`
  border-right: 1px solid ${K.yellow};
  display: flex;

  margin-bottom: ${({theme:e})=>e.spacing(1.5)};
  margin-top: ${({theme:e})=>e.spacing(1)};
`,go=p(Cn)`
  margin-right: ${({theme:e})=>e.spacing(.5)};
`,ho=p(_n)`
  background-color: ${({theme:e})=>e.background.secondary};
  padding: ${({theme:e})=>e.spacing(1)};
`,mo=p(En)`
  justify-content: center;
  width: 100%;
`,So=({fieldMetadataItem:e})=>{const{initialDefaultValue:n,initialOptions:o}=Le({fieldMetadataItem:e}),u=Sn(yn),{control:a,setValue:c,watch:m,getValues:r}=E(),d=(h,y,S)=>{if(!y.destination)return;const D=Dn(h,{fromIndex:y.source.index,toIndex:y.destination.index}).map((f,U)=>({...f,position:U}));S(D)},l=h=>eo(h,{type:e.type,defaultValue:m("defaultValue")}),g=h=>{if(l(h))return;if(e.type===s.SELECT){c("defaultValue",R(h),{shouldDirty:!0});return}const y=r("defaultValue");e.type===s.MULTI_SELECT&&(Array.isArray(y)||y===null)&&c("defaultValue",[...y??[],R(h)],{shouldDirty:!0})},F=h=>{if(!l(h))return;if(e.type===s.SELECT){c("defaultValue",null,{shouldDirty:!0});return}const y=r("defaultValue");if(e.type===s.MULTI_SELECT&&(Array.isArray(y)||y===null)){const S=y==null?void 0:y.filter(D=>D!==R(h));c("defaultValue",S!=null&&S.length?S:null,{shouldDirty:!0})}},w=()=>{const h=r("options");return[...h,Mt(h)]},T=()=>{const h=w();c("options",h,{shouldDirty:!0})},_=()=>{const h=w();c("options",h,{shouldDirty:!0})};return b(O,{children:[t(C,{name:"defaultValue",control:a,defaultValue:n,render:()=>t(O,{})}),t(C,{name:"options",control:a,defaultValue:o,render:({field:{onChange:h,value:y}})=>b(O,{children:[b(lo,{children:[b(uo,{children:[t(Q,{animationDimension:"width",hideDot:!0,children:b(ao,{children:[t(po,{children:t(go,{size:12,color:K.yellow,fill:K.yellow})}),t(co,{children:L._({id:"Z3Brb2"})})]})}),t(so,{isAdvancedModeEnabled:u,children:L._({id:"0zpgxV"})})]}),t(Fn,{onDragEnd:S=>d(y,S,h),draggableItems:t(O,{children:y.map((S,D)=>t(bn,{isInsideScrollableContainer:!0,draggableId:S.id,index:D,isDragDisabled:y.length===1,itemComponent:t(ro,{option:S,isNewRow:D===y.length-1,onChange:f=>{const U=pe(y,D,1,f);h(U),f.value!==S.value&&l(S.value)&&(F(S.value),g(f.value))},onRemove:()=>{const f=pe(y,D,1).map((U,G)=>({...U,position:G}));h(f)},isDefault:l(S.value),onSetAsDefault:()=>g(S.value),onRemoveAsDefault:()=>F(S.value),onInputEnter:_},S.id)},S.id))})})]}),t(ho,{children:t(mo,{title:L._({id:"Dl5lVI"}),Icon:we,onClick:T})})]})})]})};i.union([ne,te]);const yo=p(A)`
  display: grid;
  flex: 1 1 100%;
`,Fo=({fieldMetadataItem:e,objectMetadataItem:n})=>{const{initialOptions:o,initialDefaultValue:u}=Le({fieldMetadataItem:e}),{watch:a}=E();return t(v,{preview:t(yo,{fieldMetadataItem:{...e,defaultValue:a("defaultValue",u),options:a("options",o)},objectMetadataItem:n}),form:t(So,{fieldMetadataItem:e})})},bo=i.object({type:i.literal(s.BOOLEAN)}).merge(it),Co=i.object({type:i.literal(s.CURRENCY)}).merge(mt),Do=i.object({type:i.literal(s.DATE)}).merge(Ae),_o=i.object({type:i.literal(s.DATE_TIME)}).merge(Ae),Eo=i.object({type:i.literal(s.RELATION)}).merge(Bt),wo=i.object({type:i.literal(s.SELECT)}).merge(ne),fo=i.object({type:i.literal(s.MULTI_SELECT)}).merge(te),To=i.object({type:i.literal(s.NUMBER)}).merge(Rt),Oo=i.object({type:i.literal(s.TEXT)}).merge(dt),No=i.object({type:i.literal(s.ADDRESS)}).merge(Mn),Lo=i.object({type:i.literal(s.PHONES)}).merge(Ut),Vo=i.object({type:i.enum(Object.keys(wn(On,[s.BOOLEAN,s.CURRENCY,s.RELATION,s.SELECT,s.MULTI_SELECT,s.DATE,s.DATE_TIME,s.NUMBER,s.ADDRESS,s.PHONES,s.TEXT])))}),$o=i.discriminatedUnion("type",[bo,Co,Do,_o,Eo,wo,fo,To,Oo,No,Lo,Vo]),Ao=p(A)`
  flex: 1 1 100%;
`,vo=[s.ARRAY,s.ADDRESS,s.BOOLEAN,s.CURRENCY,s.DATE,s.DATE_TIME,s.EMAILS,s.FULL_NAME,s.LINKS,s.MULTI_SELECT,s.NUMBER,s.PHONES,s.RATING,s.RAW_JSON,s.RELATION,s.SELECT,s.TEXT],Ho=({fieldMetadataItem:e,objectMetadataItem:n})=>vo.includes(e.type)?e.type===s.BOOLEAN?t(st,{fieldMetadataItem:e,objectMetadataItem:n}):e.type===s.CURRENCY?t(Ft,{fieldMetadataItem:e,objectMetadataItem:n}):e.type===s.DATE||e.type===s.DATE_TIME?t(Ot,{fieldMetadataItem:e,objectMetadataItem:n}):e.type===s.RELATION?t(Zt,{fieldMetadataItem:e,objectMetadataItem:n}):e.type===s.NUMBER?t(It,{fieldMetadataItem:e,objectMetadataItem:n}):e.type===s.TEXT?t(gt,{fieldMetadataItem:e,objectMetadataItem:n}):e.type===s.ADDRESS?t(tt,{fieldMetadataItem:e,objectMetadataItem:n}):e.type===s.PHONES?t(zt,{fieldMetadataItem:e,objectMetadataItem:n}):e.type===s.SELECT||e.type===s.MULTI_SELECT?t(Fo,{fieldMetadataItem:e,objectMetadataItem:n}):t(v,{preview:t(Ao,{fieldMetadataItem:e,objectMetadataItem:n})}):null,Go=e=>i.object({}).merge(Gn(e)).merge(Hn()).merge(Nn).and($o);export{Yn as F,Yo as S,Ho as a,Wo as b,Go as s};
