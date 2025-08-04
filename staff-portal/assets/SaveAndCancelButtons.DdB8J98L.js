import{o,j as a,bq as r,h as c,ae as l,a as d,n as p}from"./index.Dg3lKJeg.js";import{I as u}from"./IconDeviceFloppy.CaehffdS.js";const m=({onCancel:t,disabled:n=!1})=>{const{i18n:e,_:i}=o();return a(r,{title:e._({id:"dEgA5A"}),accent:"tertiary",onClick:t,disabled:n})},y=({onSave:t,disabled:n,isLoading:e})=>a(l,{title:c._({id:"tfDRzk"}),variant:"primary",size:"small",accent:"blue",disabled:n,onClick:t,type:"submit",Icon:u,isLoading:e}),_=p.div`
  align-items: center;
  display: flex;
  gap: ${({theme:t})=>t.spacing(1)};
`,g=({onSave:t,isLoading:n,onCancel:e,isSaveDisabled:i,isCancelDisabled:s})=>d(_,{children:[a(m,{onCancel:e,disabled:s}),a(y,{onSave:t,disabled:i,isLoading:n})]});export{g as S};
