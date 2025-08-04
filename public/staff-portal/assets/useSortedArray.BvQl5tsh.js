import{U as F}from"./mutations.DtsxS3kK.js";import{bp as N,bo as x,X as k,be as B,a as h,j as a,cy as S,cz as f,r as T,p as D,cA as I,cB as O,cC as C,ad as w,n as b,R as z,i as A}from"./index.Dg3lKJeg.js";import{S as j}from"./TableHeader.D43eMMOy.js";import{S as $}from"./TableBody.DCdzfPFn.js";const J=()=>{const[e,{loading:o}]=N(F),{refreshObjectMetadataItems:l}=x("network-only");return{updateOneObjectMetadataItem:async({idToUpdate:d,updatePayload:s})=>{const t=await e({variables:{idToUpdate:d,updatePayload:s}});return await l(),t},loading:o}},g=k({key:"sortedFieldByTableFamilyState",defaultValue:null}),P=({tableId:e,fieldName:o,label:l,align:r="left",initialSort:d,Icon:s})=>{const[t,u]=B(g({tableId:e})),i=t??d,m=(i==null?void 0:i.fieldName)===o,n=m?i.orderBy:null,c=n==="AscNullsLast"||n==="AscNullsFirst",p=c||(n==="DescNullsLast"||n==="DescNullsFirst");return h(j,{align:r,onClick:()=>{u({fieldName:o,orderBy:m?i.orderBy==="AscNullsLast"?"DescNullsLast":"AscNullsLast":"DescNullsLast"})},children:[p&&r==="right"?c?a(S,{size:"14"}):a(f,{size:"14"}):null,s&&a(s,{size:14}),l,p&&r==="left"?c?a(S,{size:"14"}):a(f,{size:"14"}):null]})},E=b.div`
  align-items: center;
  background-color: ${({theme:e})=>e.background.transparent.lighter};
  border-bottom: 1px solid ${({theme:e})=>e.border.color.light};
  cursor: pointer;
  display: flex;
  height: ${({theme:e})=>e.spacing(6)};
  justify-content: space-between;
  padding: 0 ${({theme:e})=>e.spacing(2)};
  text-align: left;
`,L=b.div`
  max-height: ${({isExpanded:e})=>e?"fit-content":0};
  opacity: ${({isExpanded:e})=>e?1:0};
  overflow: hidden;
  transition:
    max-height ${({theme:e})=>e.animation.duration.normal}s,
    opacity ${({theme:e})=>e.animation.duration.normal}s;
`,_=b($)`
  border-bottom: 1px solid ${({theme:e})=>e.border.color.light};
`,V=({children:e,isInitiallyExpanded:o=!0,title:l})=>{const[r,d]=T.useState(o),s=D();return h(w,{children:[h(E,{isExpanded:r,onClick:()=>d(u=>!u),children:[a(I,{children:l}),r?a(O,{size:s.icon.size.md,stroke:s.icon.stroke.sm}):a(C,{size:s.icon.size.md,stroke:s.icon.stroke.sm})]}),a(L,{isExpanded:r,children:a(_,{children:e})})]})},X=(e,o)=>{const l=z(g({tableId:o.tableId})),r=o.initialSort;return T.useMemo(()=>{var m;const s=A(l)?l:r;if(!A(s))return e;const t=s.fieldName,u=(m=o.fields.find(n=>n.fieldName===t))==null?void 0:m.fieldType,i=s.orderBy;return[...e].sort((n,c)=>{var y,p;return u==="string"?i==="AscNullsLast"||i==="AscNullsFirst"?(y=n[t])==null?void 0:y.localeCompare(c[t]):(p=c[t])==null?void 0:p.localeCompare(n[t]):u==="number"?i==="AscNullsLast"||i==="AscNullsFirst"?n[t]-c[t]:c[t]-n[t]:0})},[e,o,r,l])};export{P as S,V as T,X as a,J as u};
