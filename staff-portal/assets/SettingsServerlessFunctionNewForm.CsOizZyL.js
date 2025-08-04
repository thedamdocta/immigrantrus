import{a,j as n,H as o,_ as r,$ as c,l as d,n as l}from"./index.Dg3lKJeg.js";const p=l.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing(4)};
`,m=({formValues:e,onChange:t})=>{const i=`${e.name}-description`,s=`${e.name}-name`;return a(d,{children:[n(o,{title:"About",description:"Name and set your function"}),a(p,{children:[n(r,{instanceId:s,placeholder:"Name",fullWidth:!0,autoFocusOnMount:!0,value:e.name,onChange:t("name")}),n(c,{textAreaId:i,placeholder:"Description",minRows:4,value:e.description,onChange:t("description")})]})]})};export{m as S};
