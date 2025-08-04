import{R as C,bz as q,o as b,bv as H,a6 as T,bw as U,d4 as K,bu as V,N as R,T as j,cM as D,a as p,j as e,H as F,ae as W,ad as v,by as G,i as A,B as f,d5 as _,b6 as Q,bp as B,r as z,M as N,a8 as J,a3 as Y,d6 as X,a4 as Z,n as a,bL as tt,p as et,z as E,l as k,Z as g,U as ot,d7 as it,b1 as $,Q as nt,d8 as rt}from"./index.Dg3lKJeg.js";import{S as at}from"./SaveAndCancelButtons.DdB8J98L.js";import{S as st}from"./SettingsPageContainer.CJeLyK8s.js";import{S as ct}from"./SubMenuTopBarContainer.BNGFwgBo.js";import"./IconDeviceFloppy.CaehffdS.js";import"./Breadcrumb.CQyf5Hn6.js";const dt=()=>{const t=C(q);return{isEnforced:(t==null?void 0:t.isTwoFactorAuthenticationEnforced)??!1}},x="delete-two-factor-authentication-modal",lt=()=>{const{i18n:t,_:u}=b(),{openModal:s}=H(),{enqueueErrorSnackBar:d,enqueueSuccessSnackBar:n}=T(),{signOut:o,loadCurrentUser:r}=U(),[i]=K(),c=C(V),h=c==null?void 0:c.email,m=R(),l=j().twoFactorAuthenticationStrategy,{currentUserWorkspaceTwoFactorAuthenticationMethods:y}=D(),{isEnforced:S}=dt(),P=async()=>{var w;if(!A(l)||!A((w=y[l])==null?void 0:w.twoFactorAuthenticationMethodId))return d({message:t._({id:"ggS/0k"}),options:{dedupeKey:"2fa-dedupe-key"}}),m(f.ProfilePage);await i({variables:{twoFactorAuthenticationMethodId:y[l].twoFactorAuthenticationMethodId}}),n({message:t._({id:"hziCGA"}),options:{dedupeKey:"2fa-dedupe-key"}}),S===!0?await o():(m(f.ProfilePage),await r())};return p(v,{children:[e(F,{title:t._({id:"jPvFKE"}),description:t._({id:"wIAG+H"})}),e(W,{accent:"danger",onClick:()=>s(x),variant:"secondary",title:t._({id:"1BEcEg"})}),e(G,{confirmationValue:h,confirmationPlaceholder:h??"",modalId:x,title:t._({id:"cNBo/E"}),subtitle:S?p(v,{children:["This will permanently delete your two factor authentication method.",e("br",{}),"Since 2FA is mandatory in your workspace, you will be logged out after deletion and will be asked to configure it again upon login."," ",e("br",{}),"Please type in your email to confirm."]}):p(v,{children:["This action cannot be undone. This will permanently reset your two factor authentication method. ",e("br",{})," Please type in your email to confirm."]}),onConfirmClick:P,confirmButtonText:t._({id:"1BEcEg"})})]})},ut=N`
  mutation initiateOTPProvisioningForAuthenticatedUser {
    initiateOTPProvisioningForAuthenticatedUser {
      uri
    }
  }
`,ht=()=>{const{enqueueErrorSnackBar:t}=T(),u=C(_),s=Q(_),{i18n:d,_:n}=b(),[o]=B(ut);return z.useEffect(()=>{if(A(u))return;(async()=>{var i;try{const c=await o();if(!((i=c.data)!=null&&i.initiateOTPProvisioningForAuthenticatedUser.uri))throw new Error("No URI returned from OTP provisioning");s(c.data.initiateOTPProvisioningForAuthenticatedUser.uri)}catch{t({message:d._({id:"MUIppF"}),options:{dedupeKey:"two-factor-authentication-provisioning-initiation-failed"}})}})()},[]),e(v,{})},mt=N`
  mutation verifyTwoFactorAuthenticationMethodForAuthenticatedUser(
    $otp: String!
  ) {
    verifyTwoFactorAuthenticationMethodForAuthenticatedUser(otp: $otp) {
      success
    }
  }
`,pt=a.div`
  display: flex;

  margin-bottom: ${({theme:t})=>t.spacing(8)};

  &:has(:disabled) {
    opacity: 0.3;
  }
`,I=a.div`
  display: flex;
`,gt=a.div`
  position: relative;
  width: 2.5rem;
  height: 3.5rem;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  border-top: 1px solid ${({theme:t})=>t.border.color.medium};
  border-bottom: 1px solid ${({theme:t})=>t.border.color.medium};
  border-right: 1px solid ${({theme:t})=>t.border.color.medium};

  &:first-of-type {
    border-left: 1px solid ${({theme:t})=>t.border.color.medium};
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
  }

  &:last-of-type {
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  }

  .group:hover &,
  .group:focus-within & {
    border-color: ${({theme:t})=>t.border.color.medium};
  }

  outline: 0;
  outline-color: ${({theme:t})=>t.border.color.medium};

  ${({isActive:t,theme:u})=>t&&tt`
      outline-width: 1px;
      outline-style: solid;
      outline-color: ${u.border.color.strong};
    `}
`,ft=a.div`
  .group:has(input[data-input-otp-placeholder-shown]) & {
    opacity: 0.2;
  }
`,yt=a.div`
  align-items: center;
  animation: caret-blink 1s steps(2, start) infinite;
  display: flex;
  inset: 0;
  justify-content: center;
  pointer-events: none;
  position: absolute;

  @keyframes caret-blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`,St=a.div`
  width: 1px;
  height: 2rem;
  background-color: ${({theme:t})=>t.font.color.primary};
`,vt=a.div`
  display: flex;
  width: 2.5rem;
  justify-content: center;
  align-items: center;
`,Ct=a.div`
  background-color: ${({theme:t})=>t.font.color.tertiary};
  border-radius: 9999px;
  height: 0.25rem;
  width: 0.75rem;
`,bt=()=>e(yt,{children:e(St,{})}),Tt=()=>e(vt,{children:e(Ct,{})}),M=t=>p(gt,{isActive:t.isActive,children:[e(ft,{children:t.char??t.placeholderChar}),t.hasFakeCaret&&e(bt,{})]}),wt=()=>{const{enqueueErrorSnackBar:t,enqueueSuccessSnackBar:u}=T(),s=R(),{i18n:d,_:n}=b(),[o,r]=z.useState(!1),{loadCurrentUser:i}=U(),[c]=B(mt),h=J({mode:"onChange",defaultValues:{otp:""}}),{isSubmitting:m}=h.formState,l=h.watch("otp"),y=!m&&(l==null?void 0:l.length)===6,S=async()=>{u({message:d._({id:"cRM1ec"})}),await i(),s(f.ProfilePage)};return{formConfig:h,isLoading:o,canSave:y,isSubmitting:m,handleSave:async L=>{try{r(!0),await c({variables:{otp:L.otp}}),await S()}catch{t({message:d._({id:"VEKoJx"})})}finally{r(!1)}},handleCancel:()=>{h.reset(),s(f.ProfilePage)}}},Ft=()=>{const t=Y();return e(Z,{name:"otp",control:t.control,render:({field:{onChange:u,onBlur:s,value:d}})=>e(X,{maxLength:6,onBlur:s,onChange:u,value:d,render:({slots:n})=>p(pt,{children:[e(I,{children:n.slice(0,3).map((o,r)=>e(M,{char:o.char,placeholderChar:o.placeholderChar,isActive:o.isActive,hasFakeCaret:o.hasFakeCaret},r))}),e(Tt,{}),e(I,{children:n.slice(3).map((o,r)=>e(M,{char:o.char,placeholderChar:o.placeholderChar,isActive:o.isActive,hasFakeCaret:o.hasFakeCaret},r))})]})})})},At=a.div`
  margin: ${({theme:t})=>t.spacing(4)} 0;
`,O=a.div`
  color: ${({theme:t})=>t.font.color.tertiary};
  font-size: ${({theme:t})=>t.font.size.sm};
  margin-bottom: ${({theme:t})=>t.spacing(4)};
  max-width: 400px;
`,_t=a.div`
  width: 100%;
  height: 1px;
  background-color: ${({theme:t})=>t.border.color.light};
  margin: ${({theme:t})=>t.spacing(6)} 0;
`,Pt=a.button`
  background: none;
  border: none;
  color: ${({theme:t})=>t.font.color.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({theme:t})=>t.spacing(1)};
  font-size: ${({theme:t})=>t.font.size.sm};
  margin-top: ${({theme:t})=>t.spacing(2)};
  padding: 0;
  text-decoration: underline;

  &:hover {
    color: ${({theme:t})=>t.font.color.primary};
  }
`,Ut=()=>{var m;const{i18n:t,_:u}=b(),s=et(),{enqueueSuccessSnackBar:d}=T(),n=C(_),{currentUserWorkspaceTwoFactorAuthenticationMethods:o}=D(),r=((m=o.TOTP)==null?void 0:m.status)==="VERIFIED",i=wt(),c=!r,h=async()=>{if(!n)return;const l=rt(n);l!==null&&(await navigator.clipboard.writeText(l),d({message:t._({id:"i5CJAR"}),options:{icon:e($,{size:s.icon.size.md}),duration:2e3}}))};return e(nt,{...i.formConfig,children:e(ct,{title:t._({id:"tuvLv1"}),links:[{children:e(g,{id:"7PzzBU"}),href:E(f.ProfilePage)},{children:e(g,{id:"vERlcd"}),href:E(f.ProfilePage)},{children:e(g,{id:"C4pKXW"})}],actionButton:c?e(at,{isSaveDisabled:!i.canSave,isCancelDisabled:i.isSubmitting,isLoading:i.isLoading,onCancel:i.handleCancel,onSave:i.formConfig.handleSubmit(i.handleSave)}):void 0,children:e(st,{children:r?e(k,{children:e(lt,{})}):p(k,{children:[e(ht,{}),e(F,{title:t._({id:"3DNcuK"})}),e(O,{children:e(g,{id:"zlvvC+"})}),p(At,{children:[n?e(it,{value:n}):e(ot,{}),n&&p(Pt,{onClick:h,children:[e($,{size:s.icon.size.sm}),e(g,{id:"S+Jl8l"})]})]}),e(_t,{}),e(F,{title:t._({id:"bD1Hnc"})}),e(O,{children:e(g,{id:"MY3Tl9"})}),e(Ft,{})]})})})})};export{Ut as SettingsTwoFactorAuthenticationMethod};
