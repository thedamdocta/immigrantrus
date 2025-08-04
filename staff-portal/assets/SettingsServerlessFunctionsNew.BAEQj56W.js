import{M as p,br as F,bp as v,bs as d,N,r as f,j as r,z as o,B as a,i as C}from"./index.Dg3lKJeg.js";import{S as E}from"./SaveAndCancelButtons.DdB8J98L.js";import{S as g}from"./SettingsPageContainer.CJeLyK8s.js";import{S as h}from"./SubMenuTopBarContainer.BNGFwgBo.js";import{S as O}from"./SettingsServerlessFunctionNewForm.CsOizZyL.js";import{S as R}from"./serverlessFunctionFragment.D9YCFdm_.js";import{F as _}from"./findManyServerlessFunctions.KaQuerem.js";import"./IconDeviceFloppy.CaehffdS.js";import"./Breadcrumb.CQyf5Hn6.js";const b=p`
  ${R}
  mutation CreateOneServerlessFunctionItem(
    $input: CreateServerlessFunctionInput!
  ) {
    createOneServerlessFunction(input: $input) {
      ...ServerlessFunctionFields
    }
  }
`,w=()=>{const n=F(),[e]=v(b,{client:n});return{createOneServerlessFunction:async s=>await e({variables:{input:s},awaitRefetchQueries:!0,refetchQueries:[d(_)??""]})}},L=()=>{const n=N(),[e,i]=f.useState({name:"",description:""}),{createOneServerlessFunction:s}=w(),c=async()=>{const t=await s({name:e.name,description:e.description});C(t==null?void 0:t.data)&&n(a.ServerlessFunctions,{id:t.data.createOneServerlessFunction.id})},u=t=>l=>{i(m=>({...m,[t]:l}))},S=!!e.name&&s;return r(h,{title:"New Function",links:[{children:"Workspace",href:o(a.Workspace)},{children:"Functions",href:o(a.ServerlessFunctions)},{children:"New"}],actionButton:r(E,{isSaveDisabled:!S,onCancel:()=>{n(a.ServerlessFunctions)},onSave:c}),children:r(g,{children:r(O,{formValues:e,onChange:u})})})};export{L as SettingsServerlessFunctionsNew,L as default};
