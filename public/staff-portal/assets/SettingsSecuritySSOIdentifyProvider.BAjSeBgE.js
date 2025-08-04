import{p as U,a as d,j as t,n as u,eS as se,K as ce,a3 as B,a6 as T,o as J,l as b,H as w,_ as g,ae as v,b1 as y,aC as k,a4 as P,ad as Z,a2 as l,r as ee,eT as de,dL as le,eU as ue,eV as pe,i as R,eW as N,h as C,eX as j,eY as me,eZ as ge,b6 as ye,b9 as Se,N as fe,a8 as he,a9 as Ie,Q as Ce,z as F,B as L,Z as M,ah as ve,ai as be}from"./index.Dg3lKJeg.js";import{S as we}from"./SaveAndCancelButtons.DdB8J98L.js";import{S as Oe}from"./SettingsPageContainer.CJeLyK8s.js";import{S as xe}from"./SSOIdentitiesProvidersState.BmKplu8q.js";import{S as _e}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./IconDeviceFloppy.CaehffdS.js";import"./Breadcrumb.CQyf5Hn6.js";const De=u(ce)`
  display: flex;
  align-items: center;
  padding: ${({theme:e})=>e.spacing(2)};
  border: 1px solid ${({theme:e})=>e.border.color.medium};
  border-radius: ${({theme:e})=>e.border.radius.sm};
  flex-grow: 1;
  gap: ${({theme:e})=>e.spacing(2)};
  cursor: pointer;

  &:hover {
    background: ${({theme:e})=>e.background.transparent.lighter};
  }
`,Pe=u(se)`
  margin-left: auto;
  padding: ${({theme:e})=>e.spacing(1)};
`,$e=u.div`
  color: ${({theme:e})=>e.font.color.secondary};
  font-weight: ${({theme:e})=>e.font.weight.medium};
`,Le=u.div`
  color: ${({theme:e})=>e.font.color.tertiary};
  font-size: ${({theme:e})=>e.font.size.sm};
`,ke=({value:e,handleSelect:o,title:n,description:i,isSelected:c,Icon:a})=>{const s=U();return d(De,{tabIndex:0,onClick:()=>o(e),children:[a&&t(a,{size:s.icon.size.xl,color:s.color.gray50}),d("span",{children:[n&&t($e,{children:n}),i&&t(Le,{children:i})]}),t(Pe,{value:e,checked:c})]})},Ae=u.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing(4)};
`,Me=({options:e,value:o,onChange:n})=>t(Ae,{role:"radiogroup",children:e.map(i=>t(ke,{role:"radio",value:i.value,isSelected:o===i.value,handleSelect:n,title:i.title,description:i.description,Icon:i.Icon,ariaChecked:o===i.value},i.value))});/* @license Enterprise */const W=u.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing(2,4)};
  width: 100%;
`,X=u.div`
  display: flex;
  flex-direction: row;
`,V=u.div`
  flex: 1;
  margin-right: ${({theme:e})=>e.spacing(2)};
`,K=u.div`
  align-items: end;
  display: flex;
  margin-bottom: ${({theme:e})=>e.spacing(1)};
`,Ee=()=>{const{control:e}=B(),{enqueueSuccessSnackBar:o}=T(),n=U(),{i18n:i,_:c}=J(),a=window.location.origin,s=`${k}/auth/oidc/callback`;return d(Z,{children:[d(b,{children:[t(w,{title:i._({id:"XUe4cu"}),description:i._({id:"GVxbU6"})}),d(W,{children:[d(X,{children:[t(V,{children:t(g,{instanceId:"sso-oidc-authorized-uri",readOnly:!0,label:i._({id:"wTBNbL"}),value:a,fullWidth:!0})}),t(K,{children:t(v,{Icon:y,title:i._({id:"he3ygx"}),onClick:()=>{o({message:i._({id:"Ovw0c6"}),options:{icon:t(y,{size:n.icon.size.md}),duration:2e3}}),navigator.clipboard.writeText(a)},type:"button"})})]}),d(X,{children:[t(V,{children:t(g,{instanceId:"sso-oidc-redirection-uri",readOnly:!0,label:i._({id:"RZjynQ"}),value:s,fullWidth:!0})}),t(K,{children:t(v,{Icon:y,title:i._({id:"he3ygx"}),onClick:()=>{o({message:i._({id:"LfH+Ea"}),options:{icon:t(y,{size:n.icon.size.md}),duration:2e3}}),navigator.clipboard.writeText(s)},type:"button"})})]})]})]}),d(b,{children:[t(w,{title:i._({id:"06cbfQ"}),description:i._({id:"XJU8BD"})}),d(W,{children:[t(P,{name:"clientID",control:e,render:({field:{onChange:r,value:m}})=>t(g,{instanceId:"sso-oidc-client-id",autoComplete:"off",label:i._({id:"b9Y4up"}),value:m,onChange:r,fullWidth:!0,placeholder:"900960562328-36306ohbk8e3.apps.googleusercontent.com"})}),t(P,{name:"clientSecret",control:e,render:({field:{onChange:r,value:m}})=>t(g,{instanceId:"sso-oidc-client-secret",autoComplete:"off",type:"password",label:i._({id:"Bdj4LI"}),value:m,onChange:r,fullWidth:!0,placeholder:"****************************"})}),t(P,{name:"issuer",control:e,render:({field:{onChange:r,value:m}})=>t(g,{instanceId:"sso-oidc-issuer",autoComplete:"off",label:i._({id:"IhCN5p"}),value:m,onChange:r,fullWidth:!0,placeholder:"https://accounts.google.com"})})]})]})]})};/* @license Enterprise */const Ue=l.object({entityID:l.string().url(),ssoUrl:l.string().url(),certificate:l.string().min(1)}),te=["md","ns0","ns2","dsig","ds"],S=(e,o,n=[...te])=>{var i,c;if(n.length!==0)return((i=e.getElementsByTagName(`${n[0]}:${o}`))==null?void 0:i[0])??S(e,o,n.slice(1))??((c=e.getElementsByTagName(o))==null?void 0:c[0])},ie=(e,o,n=[...te])=>{const i=e.getElementsByTagName(`${n[0]}:${o}`);return i.length!==0?Array.from(i):n.length>0?ie(e,o,n.slice(1)):Array.from(e.getElementsByTagName(`${o}`))},Be=e=>{var o,n,i;try{const a=new DOMParser().parseFromString(e,"application/xml");if(a.getElementsByTagName("parsererror").length>0)throw new Error("Error parsing XML");const s=S(a,"EntityDescriptor");if(!s)throw new Error("No EntityDescriptor found");const r=S(a,"IDPSSODescriptor");if(!r)throw new Error("No IDPSSODescriptor found");const m=S(r,"KeyDescriptor");if(!m)throw new Error("No KeyDescriptor found");const $=S(m,"KeyInfo");if(!$)throw new Error("No KeyInfo found");const O=S($,"X509Data");if(!O)throw new Error("No X509Data found");const x=(n=(o=S(O,"X509Certificate"))==null?void 0:o.textContent)==null?void 0:n.trim();if(!x)throw new Error("No X509Certificate found");const A={ssoUrl:(i=ie(r,"SingleSignOnService").map(f=>({Binding:f.getAttribute("Binding"),Location:f.getAttribute("Location")})).find(f=>f.Binding==="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"))==null?void 0:i.Location,certificate:x,entityID:s==null?void 0:s.getAttribute("entityID")};return{success:!0,data:Ue.parse(A)}}catch(c){return{success:!1,error:c}}};/* @license Enterprise */const Te=u.div`
  align-items: center;
  display: flex;
  gap: ${({theme:e})=>e.spacing(2)};
`,ze=u.input`
  display: none;
`,Re=u.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing(2,4)};
  width: 100%;
`,E=u.div`
  display: flex;
  flex-direction: row;
`,q=u.div`
  flex: 1;
  margin-right: ${({theme:e})=>e.spacing(2)};
`,G=u.div`
  align-items: end;
  display: flex;
  margin-bottom: ${({theme:e})=>e.spacing(1)};
`,Ne=()=>{const{enqueueErrorSnackBar:e,enqueueSuccessSnackBar:o}=T(),n=U(),{setValue:i,getValues:c,watch:a,trigger:s}=B(),{i18n:r,_:m}=J(),$=async p=>{if(R(p.target.files)){const h=await p.target.files[0].text(),I=Be(h);if(p.target.value="",!I.success)return e({message:r._({id:"uzxr9u"}),options:{duration:2e3}});i("ssoURL",I.data.ssoUrl),i("certificate",I.data.certificate),i("issuer",I.data.entityID),s()}},O=`${k}/auth/saml/login/${c("id")}`,x=`${k}/auth/saml/callback/${c("id")}`,_=ee.useRef(null),A=()=>{var p,h;(h=(p=_==null?void 0:_.current)==null?void 0:p.click)==null||h.call(p)},f=a("ssoURL"),ne=a("certificate"),re=a("issuer"),oe=()=>[f,ne,re].every(p=>R(p)&&p.length>0),ae=async()=>{const p=await fetch(`${k}/auth/saml/metadata/${c("id")}`);if(!p.ok)return e({message:r._({id:"dN5YOb"}),options:{duration:2e3}});const h=await p.text(),I=new Blob([h],{type:"application/xml"}),z=URL.createObjectURL(I),D=document.createElement("a");D.href=z,D.download="metadata.xml",document.body.appendChild(D),D.click(),document.body.removeChild(D),URL.revokeObjectURL(z)};return d(Z,{children:[d(b,{children:[t(w,{title:r._({id:"LPN8Ma"}),description:r._({id:"akDOEO"})}),d(Te,{children:[t(ze,{ref:_,onChange:$,type:"file",accept:".xml"}),t(v,{Icon:de,onClick:A,title:r._({id:"2IXDgU"}),type:"button"}),oe()&&t(le,{size:n.icon.size.md,stroke:n.icon.stroke.lg,color:n.color.blue})]})]}),d(b,{children:[t(w,{title:r._({id:"LUc0oL"}),description:r._({id:"rGWgcm"})}),d(Re,{children:[t(E,{children:t(v,{Icon:ue,onClick:ae,title:r._({id:"WcWS//"}),type:"button"})}),t(pe,{text:"Or"}),d(E,{children:[t(q,{children:t(g,{instanceId:"sso-saml-acs-url",disabled:!0,label:"ACS Url",value:x,fullWidth:!0})}),t(G,{children:t(v,{Icon:y,title:"Copy",onClick:()=>{o({message:r._({id:"GGcxJO"}),options:{icon:t(y,{size:n.icon.size.md}),duration:2e3}}),navigator.clipboard.writeText(x)},type:"button"})})]}),d(E,{children:[t(q,{children:t(g,{instanceId:"sso-saml-entity-id",disabled:!0,label:"Entity ID",value:O,fullWidth:!0})}),t(G,{children:t(v,{Icon:y,title:r._({id:"he3ygx"}),onClick:()=>{o({message:r._({id:"8PrrNJ"}),options:{icon:t(y,{size:n.icon.size.md}),duration:2e3}}),navigator.clipboard.writeText(O)},type:"button"})})]})]})]})]})};/* @license Enterprise */const Q=u.div`
  display: grid;
  gap: ${({theme:e})=>e.spacing(2,4)};
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'input-1 input-1';

  & :first-of-type {
    grid-area: input-1;
  }
`,je=()=>{const{control:e,watch:o}=B(),n={OIDC:{option:{Icon:j,title:"OIDC",value:"OIDC",description:""},form:t(Ee,{})},SAML:{option:{Icon:j,title:"SAML",value:"SAML",description:""},form:t(Ne,{})}},i=o("type"),c=ee.useMemo(()=>{switch(i){case N.OIDC:return n.OIDC.form;case N.SAML:return n.SAML.form;default:return null}},[n.OIDC.form,n.SAML.form,i]);return d(Oe,{children:[d(b,{children:[t(w,{title:C._({id:"6YtxFj"}),description:C._({id:"e/dfFe"})}),t(Q,{children:t(P,{name:"name",control:e,render:({field:{onChange:a,value:s}})=>t(g,{instanceId:"sso-identity-provider-name",autoComplete:"off",label:C._({id:"6YtxFj"}),value:s,onChange:a,fullWidth:!0,placeholder:"Google OIDC"})})})]}),d(b,{children:[t(w,{title:C._({id:"+zy2Nq"}),description:C._({id:"Qz73jD"})}),t(Q,{children:t(P,{name:"type",control:e,render:({field:{onChange:a,value:s}})=>t(Me,{value:s,options:Object.values(n).map(r=>r.option),onChange:a})})})]}),c]})};/* @license Enterprise */const Fe=()=>{const[e]=me(),[o]=ge(),n=ye(xe);return{createSSOIdentityProvider:async c=>{if(c.type==="OIDC"){const{type:a,...s}=c;return await e({variables:{input:s},onCompleted:r=>{n(m=>[...m,r.createOIDCIdentityProvider])}})}else if(c.type==="SAML"){const{type:a,...s}=c;return await o({variables:{input:s},onCompleted:r=>{n(m=>[...m,r.createSAMLIdentityProvider])}})}else throw new Error("Invalid IdpType")}}};/* @license Enterprise */const Y={SAML:()=>({type:"SAML",ssoURL:"",name:"",id:Se(),certificate:"",issuer:""}),OIDC:()=>({type:"OIDC",name:"",clientID:"",clientSecret:"",issuer:""})};/* @license Enterprise */const We=l.object({type:l.literal("OIDC"),clientID:l.string().nonempty(),clientSecret:l.string().nonempty()}).required(),Xe=l.object({type:l.literal("SAML"),id:l.string().nonempty(),ssoURL:l.string().url().nonempty(),certificate:l.string().nonempty()}).required(),H=l.discriminatedUnion("type",[We,Xe]).and(l.object({name:l.string().nonempty(),issuer:l.string().url().nonempty()}).required());/* @license Enterprise */const Je=()=>{const e=fe(),{enqueueErrorSnackBar:o}=T(),{createSSOIdentityProvider:n}=Fe(),i=he({mode:"onSubmit",resolver:Ie(H),defaultValues:Object.values(Y).reduce((a,s)=>({...a,...s()}),{})}),c=async()=>{try{const a=i.getValues("type");await n(H.parse(ve(i.getValues(),Object.keys(Y[a]())))),e(L.Security)}catch(a){o({apolloError:a instanceof be?a:void 0})}};return t("form",{onSubmit:i.handleSubmit(c),children:t(Ce,{...i,children:t(_e,{title:C._({id:"OzWuT+"}),actionButton:t(we,{onCancel:()=>e(L.Security),isSaveDisabled:i.formState.isSubmitting}),links:[{children:t(M,{id:"pmUArF"}),href:F(L.Workspace)},{children:t(M,{id:"a3LDKx"}),href:F(L.Security)},{children:t(M,{id:"C7WtCv"})}],children:t(je,{})})})})};export{Je as SettingsSecuritySSOIdentifyProvider};
