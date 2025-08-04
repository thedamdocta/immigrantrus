import{bI as y,a as s,j as t,av as p,i as r,ad as m,a0 as f,bn as g,ae as l,bJ as h,b1 as k,bK as x,n as o,G as b,bL as S,H as u,l as $,o as I,z as v,B as C,Z as a}from"./index.Dg3lKJeg.js";import{S as w}from"./SettingsPageContainer.CJeLyK8s.js";import{u as z}from"./useSettingsIntegrationCategories.BCNgJ2AL.js";import{S as _}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./Breadcrumb.CQyf5Hn6.js";const A=o.div`
  align-items: center;
  background: ${({theme:e})=>e.background.secondary};
  border: 1px solid ${({theme:e})=>e.border.color.medium};
  border-radius: ${({theme:e})=>e.border.radius.md};
  font-size: ${({theme:e})=>e.font.size.md};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing(3)};
  text-decoration: none;
  color: ${({theme:e})=>e.font.color.primary};

  ${({to:e})=>r(e)&&S`
      cursor: pointer;
    `}
`,T=o.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: ${({theme:e})=>e.spacing(3)};
`,j=o.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: ${({theme:e})=>e.spacing(2)};
  color: ${({theme:e})=>e.border.color.strong};
`,L=o(b)`
  padding: ${({theme:e})=>e.spacing(1)} ${({theme:e})=>e.spacing(2)};
`,d=o.img`
  height: 24px;
  width: 24px;
`,P=({integration:e})=>{const{copyToClipboard:n}=y();return s(A,{to:e.type==="Active"?e.link:void 0,as:e.type==="Active"?p:"div",children:[s(T,{children:[s(j,{children:[t(d,{src:e.from.image,alt:e.from.key}),r(e.to)&&s(m,{children:[t("div",{children:"→"}),t(d,{src:e.to.image,alt:e.to.key})]})]}),e.text]}),e.type==="Soon"?t(L,{label:"Soon"}):e.type==="Active"?t(f,{color:"green",text:"Active"}):e.type==="Add"?t(l,{to:e.link,Icon:g,title:"Add",size:"small"}):e.type==="Use"?t(l,{to:e.link,target:"_blank",Icon:h,title:"Use",size:"small"}):e.type==="Copy"?t(l,{onClick:()=>{r(e.content)&&n(e.content)},Icon:k,title:e.linkText,size:"small"}):t(l,{to:e.link,target:"_blank",Icon:x,title:e.linkText,size:"small"})]})},U=o.div`
  align-items: start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,B=o(p)`
  align-items: start;
  display: flex;
  flex-direction: row;
  font-size: ${({theme:e})=>e.font.size.md};
  gap: ${({theme:e})=>e.spacing(1)};
  cursor: pointer;
  text-decoration: none;
  color: ${({theme:e})=>e.font.color.primary};
`,H=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing(4)};
`,F=({integrationGroup:e})=>s($,{children:[s(U,{children:[t(u,{title:e.title}),e.hyperlink&&s(B,{target:"_blank",to:e.hyperlink??"",children:[t("div",{children:e.hyperlinkText}),t("div",{children:"→"})]})]}),t(H,{children:e.integrations.map(n=>{var i;return t(P,{integration:n},[e.key,n.from.key,(i=n.to)==null?void 0:i.key].join("-"))})})]}),W=()=>{const{i18n:e,_:n}=I(),i=z();return t(_,{title:e._({id:"nbfdhU"}),links:[{children:t(a,{id:"pmUArF"}),href:v(C.Workspace)},{children:t(a,{id:"nbfdhU"})}],children:t(w,{children:i.map(c=>t(F,{integrationGroup:c},c.key))})})};export{W as SettingsIntegrations};
