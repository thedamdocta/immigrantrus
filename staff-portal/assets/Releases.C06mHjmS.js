import{o as g,r as s,j as r,z as f,S as h,a as d,Y as x,B as y,Z as p,n as i}from"./index.Dg3lKJeg.js";import{S as u}from"./SettingsPageContainer.CJeLyK8s.js";import{S}from"./SubMenuTopBarContainer.BNGFwgBo.js";import{unified as $}from"./index.CjrT3HcA.js";import w from"./index.D55_0Pbk.js";import _ from"./index.FLUkLUsW.js";import{r as R}from"./index.D13MPiJ5.js";import{v as j}from"./index.Wb4bzIyB.js";import"./Breadcrumb.CQyf5Hn6.js";import"./index.CWtGfzcb.js";import"./index.dom.C3-224fz.js";import"./index.DdCAsX36.js";import"./index.ByI_odx6.js";import"./index.Dq2i-IQA.js";import"./index.BY3x9OSE.js";import"./index.C2o2j-tx.js";import"./index.c2V3InAJ.js";import"./index.D22iV9cu.js";import"./index.D4Wp6AEg.js";import"./index.BVeNH5zi.js";const k=i.div`
  img {
    margin: ${({theme:t})=>t.spacing(6)} 0px 0px;
    max-width: 100%;
  }

  p img {
    margin: 0px;
  }

  h3 {
    color: ${({theme:t})=>t.font.color.primary};
    margin: ${({theme:t})=>t.spacing(6)} 0px 0px;
  }
  code {
    background: ${({theme:t})=>t.background.tertiary};
    padding: 4px;
    border-radius: 4px;
  }
  p {
    color: ${({theme:t})=>t.font.color.secondary};
    font-family: Inter, sans-serif;
    font-size: ${({theme:t})=>t.font.size.md};
    line-height: 19.5px;
    font-weight: ${({theme:t})=>t.font.weight.regular};
    margin: ${({theme:t})=>t.spacing(6)} 0px 0px;
    text-align: justify;
  }

  li {
    color: ${({theme:t})=>t.font.color.secondary};
  }

  li strong {
    color: ${({theme:t})=>t.font.color.primary};
  }
`,z=i.h2`
  color: ${({theme:t})=>t.font.color.primary};
  font-weight: ${({theme:t})=>t.font.weight.medium};
  line-height: 18px;
  font-size: ${({theme:t})=>t.font.size.md};
  margin: 0;
  margin-top: ${({theme:t})=>t.spacing(10)};

  &:first-of-type {
    margin-top: 0;
  }
`,I=i.span`
  font-weight: ${({theme:t})=>t.font.weight.regular};
  font-size: 12px;
  line-height: 18px;
  color: ${({theme:t})=>t.font.color.tertiary};
`,K=()=>{const{i18n:t,_:b}=g(),[m,c]=s.useState([]);return s.useEffect(()=>{fetch("https://twenty.com/api/releases").then(async e=>{const n=await e.json();for(const a of n)a.html=String(await $().use([w,_,R]).use(()=>l=>{j(l,o=>{(o.tagName==="h1"||o.tagName==="h2")&&(o.tagName="h3")})}).process(a.content));c(n)})},[]),r(S,{title:t._({id:"5icoS1"}),links:[{children:r(p,{id:"/IX/7x"}),href:f(y.Workspace)},{children:r(p,{id:"5icoS1"})}],children:r(u,{children:r(h,{componentInstanceId:"scroll-wrapper-releases",children:r(k,{children:m.map(e=>d(x.Fragment,{children:[r(z,{children:e.release}),r(I,{children:e.date}),r("div",{dangerouslySetInnerHTML:{__html:e.html}})]},e.slug))})})})})};export{K as Releases};
