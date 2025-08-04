import{a2 as e,a3 as d,j as n,a4 as u,_ as b,n as g}from"./index.Dg3lKJeg.js";const I=e.object({dbname:e.string().min(1),host:e.string().min(1),port:e.preprocess(a=>parseInt(a),e.number().positive()),user:e.string().min(1),password:e.string().min(1),schema:e.string().min(1),label:e.string().min(1)}),S=e.object({api_key:e.string().min(1),label:e.string().min(1)}),h=g.div`
  display: grid;
  gap: ${({theme:a})=>a.spacing(2,4)};
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'input-1 input-1'
    'input-2 input-3'
    'input-4 input-5';

  & :first-of-type {
    grid-area: input-1;
  }
`,f=a=>{switch(a){case"postgresql":return[{name:"dbname",label:"Database Name",placeholder:"default"},{name:"host",label:"Host",placeholder:"host"},{name:"port",label:"Port",placeholder:"5432"},{name:"user",label:"User",placeholder:"user"},{name:"password",label:"Password",type:"password",placeholder:"••••••"},{name:"schema",label:"Schema",placeholder:"public"},{name:"label",label:"Label",placeholder:"My database"}];case"stripe":return[{name:"api_key",label:"API Key",placeholder:"API key"},{name:"label",label:"Label",placeholder:"My database"}];default:return null}},w=({databaseKey:a,disabled:s})=>{const{control:l}=d(),r=f(a);return r?n(h,{children:r.map(({name:t,label:o,type:i,placeholder:p})=>n(u,{name:t,control:l,render:({field:{onChange:m,value:c}})=>n(b,{instanceId:`${a}-${t}`,autoComplete:"new-password",label:o,value:c,onChange:m,fullWidth:!0,type:i,disabled:s,placeholder:p})},t))}):null};export{w as S,S as a,I as s};
