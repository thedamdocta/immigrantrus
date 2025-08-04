import{R as v,du as M,o as A,dv as $,a as b,j as a,ad as T,n as p,dw as q,dx as S,dy as k,b0 as x,dz as G,dA as L,dB as J,dC as W,dD as Y,$ as X,M as Q,a6 as K,dE as Z,dF as ee,dG as ne,dH as te,i as P,a2 as y,a8 as ae,a9 as ie,T as re,r as se,bv as oe,dI as le,dJ as de,dK as ce,z as w,ae as D,cm as ue,dL as fe,df as ye,B as I,by as ge,dd as he,dM as be}from"./index.Dg3lKJeg.js";import{S as me}from"./SettingsPageContainer.CJeLyK8s.js";import{S as pe}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./Breadcrumb.CQyf5Hn6.js";const h=p.div`
  color: ${({theme:e,color:n})=>n||e.font.color.tertiary};
  font-size: ${({theme:e})=>e.font.size.sm};
  line-height: 1.5;
`,Se=({variable:e,hasValueChanged:n})=>{const l=v(M),{i18n:i,_:r}=A(),d=e.source===$.DATABASE,s=e.source===$.ENVIRONMENT;return l?l&&e.isEnvOnly?a(h,{children:i._({id:"C/wr0z"})}):l&&!e.isEnvOnly&&n?a(h,{children:d?i._({id:"b8wwse"}):i._({id:"MMGDfe"})}):l&&!e.isEnvOnly&&!n?d?b(T,{children:[a(h,{children:i._({id:"SLIRqz"})}),a(h,{children:i._({id:"wu0RfR"})})]}):a(h,{children:s?i._({id:"6YzXhC"}):i._({id:"8Drj7i"})}):a(h,{children:i._({id:"iAubP2"})}):b(h,{children:[i._({id:"GEMJqo"})," ",s?i._({id:"UZHvVi"}):i._({id:"vUr1/5"})]})},Ce=({label:e,value:n,onChange:l,type:i,options:r,disabled:d,placeholder:s})=>{const f=r&&Array.isArray(r)?r.map(t=>({value:String(t),label:String(t)})):[],g=[{value:"true",label:"true"},{value:"false",label:"false"}],o=t=>Array.isArray(n)?n.includes(t):!1,m=t=>{if(!Array.isArray(n))return;let c=[...n];o(t)?c=c.filter(C=>C!==t):c.push(t),l(c)},u=`${e}-json-array`;switch(i){case S.BOOLEAN:return a(x,{label:e,value:String(n??""),onChange:t=>l(t==="true"),disabled:d,options:g,dropdownId:"config-variable-boolean-select",fullWidth:!0});case S.NUMBER:return a(k,{label:e,value:n!=null?String(n):"",onChange:t=>{const c=Number(t);l(isNaN(c)?t:c)},disabled:d,placeholder:s,type:"number",fullWidth:!0});case S.ARRAY:return a(T,{children:r&&Array.isArray(r)?a(G,{dropdownId:"config-variable-array-dropdown",dropdownPlacement:"bottom-start",dropdownOffset:{y:8},clickableComponent:a(Y,{selectedOption:{value:"",label:Array.isArray(n)&&n.length>0?n.join(", "):"Select options"},isDisabled:d,hasRightElement:!1,selectSizeVariant:"default"}),dropdownComponents:a(L,{children:a(J,{children:f.map(t=>a(W,{text:t.label,selected:o(t.value),className:"config-variable-array-menu-item-multi-select",onSelectChange:()=>m(t.value)},t.value))})})}):a(X,{textAreaId:u,label:e,value:Array.isArray(n)?JSON.stringify(n):String(n??""),onChange:t=>{try{const c=JSON.parse(t);l(Array.isArray(c)?c:n)}catch{l(t)}},disabled:d,placeholder:s||"Enter JSON array"})});case S.ENUM:return a(x,{label:e,value:String(n??""),onChange:t=>l(t),disabled:d,options:f,dropdownId:"config-variable-enum-select",fullWidth:!0});case S.STRING:return a(k,{label:e,value:typeof n=="string"?n:n!=null?JSON.stringify(n):"",onChange:t=>l(t),disabled:d,placeholder:s||"Enter value",fullWidth:!0});default:throw new q(`Unsupported type: ${i}`,"UNSUPPORTED_TYPE")}},_e=p.div`
  width: 100%;
`,Ae=({variable:e,value:n,onChange:l,disabled:i})=>{const{i18n:r,_:d}=A(),s=v(M);return a(_e,{children:s&&!e.isEnvOnly?a(Ce,{label:r._({id:"wMHvYH"}),value:n,onChange:l,type:e.type,options:e.options,disabled:i,placeholder:i?"Undefined":r._({id:"oiVP/+"})}):a(k,{value:String(n),disabled:!0,label:r._({id:"wMHvYH"}),fullWidth:!0})})},O=Q`
  query GetDatabaseConfigVariable($key: String!) {
    getDatabaseConfigVariable(key: $key) {
      name
      description
      value
      isSensitive
      isEnvOnly
      type
      options
      source
    }
  }
`,Ve=e=>{const{i18n:n,_:l}=A(),{enqueueSuccessSnackBar:i,enqueueErrorSnackBar:r}=K(),{refetch:d}=Z(),[s]=ee(),[f]=ne(),[g]=te(),o=async(u,t)=>{try{if(u===null||typeof u=="string"&&u===""||Array.isArray(u)&&u.length===0){await m();return}t?await s({variables:{key:e,value:u},refetchQueries:[{query:O,variables:{key:e}}]}):await f({variables:{key:e,value:u},refetchQueries:[{query:O,variables:{key:e}}]}),await d(),i({message:n._({id:"2ushgC"})})}catch{r({message:n._({id:"Dzh4a2"})})}},m=async u=>{P(u)&&u.preventDefault();try{await g({variables:{key:e},refetchQueries:[{query:O,variables:{key:e}}]}),await d(),i({message:n._({id:"rawKOG"})})}catch{r({message:n._({id:"A/P7PX"})})}};return{handleUpdateVariable:o,handleDeleteVariable:m}},Ee=e=>{const n=y.object({value:y.union([y.string(),y.number(),y.boolean(),y.array(y.string()),y.null()])}),{handleSubmit:l,setValue:i,formState:{isSubmitting:r},watch:d}=ae({resolver:ie(n),values:{value:(e==null?void 0:e.value)??null}}),s=d("value"),f=s!==(e==null?void 0:e.value),g=!!(e&&!e.isEnvOnly&&f&&(typeof s=="string"&&s.trim()!==""||typeof s=="boolean"||typeof s=="number"||Array.isArray(s)&&s.length>0));return{handleSubmit:l,setValue:i,isSubmitting:r,watch:d,currentValue:s,hasValueChanged:f,isValueValid:g}},we=p(be)`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing(4)};
  width: 100%;
`,De=p(he)`
  margin-top: ${({theme:e})=>e.spacing(2)};
`,Ie=p.div`
  display: flex;
  align-items: flex-end;
  gap: ${({theme:e})=>e.spacing(2)};
`,Oe=p.div`
  display: flex;
  & > :not(:first-of-type) > button {
    border-left: none;
  }
`,B="reset-variable-modal",Re=()=>{const{variableName:e}=re(),{i18n:n,_:l}=A(),[i,r]=se.useState(!1),{openModal:d}=oe(),s=v(M),{data:f,loading:g}=le({variables:{key:e??""},fetchPolicy:"network-only"}),o=f==null?void 0:f.getDatabaseConfigVariable,{handleUpdateVariable:m,handleDeleteVariable:u}=Ve((o==null?void 0:o.name)??""),{handleSubmit:t,setValue:c,isSubmitting:C,watch:N,hasValueChanged:_,isValueValid:z}=Ee(o);if(g===!0||P(o)===!1)return a(de,{});const R=o.isEnvOnly,V=o.source===ce.DATABASE,U=async E=>{await m(E.value,V),r(!1)},j=()=>{r(!0)},F=()=>{if(V&&_){c("value",o.value),r(!1);return}if(V&&!_){d(B);return}c("value",o.value),r(!1)},H=()=>{u(),r(!1)};return b(T,{children:[a(pe,{links:[{children:n._({id:"/IX/7x"}),href:w(I.AdminPanel)},{children:n._({id:"g1in8j"}),href:w(I.AdminPanel)},{children:n._({id:"Vj43Y/"}),href:w(I.AdminPanel,void 0,void 0,"config-variables")},{children:o.name}],children:b(me,{children:[a(De,{title:o.name,description:o.description}),b(we,{onSubmit:t(U),children:[b(Ie,{children:[a(Ae,{variable:o,value:N("value"),onChange:E=>c("value",E),disabled:R||!i}),i?b(Oe,{children:[a(D,{Icon:fe,variant:"secondary",position:"left",type:"submit",disabled:C||!z||!_}),a(D,{Icon:ye,variant:"secondary",position:"right",onClick:F,type:"button",disabled:C})]}):a(D,{Icon:ue,variant:"primary",onClick:j,type:"button",disabled:R||!s})]}),a(Se,{variable:o,hasValueChanged:_})]})]})}),a(ge,{modalId:B,title:n._({id:"6rzsES"}),subtitle:n._({id:"4YifBe"}),onConfirmClick:H,confirmButtonText:n._({id:"OfhWJH"}),confirmButtonAccent:"danger"})]})};export{Re as SettingsAdminConfigVariableDetails};
