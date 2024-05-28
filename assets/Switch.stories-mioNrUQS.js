import{j as c,a as T,F as ie}from"./jsx-runtime-WuQMLw89.js";import{r as s,R as p}from"./index-Dl6G-zuu.js";import{s as Z}from"./stitches.config-CKE6G7UO.js";import{_ as L}from"./extends-CF3RwP-h.js";import{$ as de,a as le}from"./index-COmNUzeK.js";import{$ as ue}from"./index-BSTPHMlZ.js";import{$ as be}from"./index-D_wDWxb3.js";import{$ as fe}from"./index-CYHKWj1-.js";import{$ as pe}from"./index-CH6e6d6N.js";import{$ as ee}from"./index-QZw2BAii.js";import{e as V}from"./Elevation-CQxWisSY.js";import{m as me}from"./modifyVariantsForStory-D3vOGtQO.js";import{i as te}from"./ignoreArgType-DG8_8Mu6.js";import{F as re}from"./Flex-jm7nIrzU.js";import{L as B}from"./Label-C-FSa_nZ.js";import"./index-D1_ZHIBm.js";import"./Text-De0MgKz9.js";const ae="Switch",[he,Xe]=be(ae),[$e,ge]=he(ae),Se=s.forwardRef((e,t)=>{const{__scopeSwitch:r,name:n,checked:a,defaultChecked:b,required:i,disabled:o,value:l="on",onCheckedChange:g,...w}=e,[d,u]=s.useState(null),oe=ue(t,v=>u(v)),R=s.useRef(!1),P=d?!!d.closest("form"):!0,[k=!1,se]=de({prop:a,defaultProp:b,onChange:g});return s.createElement($e,{scope:r,checked:k,disabled:o},s.createElement(ee.button,L({type:"button",role:"switch","aria-checked":k,"aria-required":i,"data-state":ne(k),"data-disabled":o?"":void 0,disabled:o,value:l},w,{ref:oe,onClick:le(e.onClick,v=>{se(ce=>!ce),P&&(R.current=v.isPropagationStopped(),R.current||v.stopPropagation())})})),P&&s.createElement(we,{control:d,bubbles:!R.current,name:n,value:l,checked:k,required:i,disabled:o,style:{transform:"translateX(-100%)"}}))}),xe="SwitchThumb",Fe=s.forwardRef((e,t)=>{const{__scopeSwitch:r,...n}=e,a=ge(xe,r);return s.createElement(ee.span,L({"data-state":ne(a.checked),"data-disabled":a.disabled?"":void 0},n,{ref:t}))}),we=e=>{const{control:t,checked:r,bubbles:n=!0,...a}=e,b=s.useRef(null),i=fe(r),o=pe(t);return s.useEffect(()=>{const l=b.current,g=window.HTMLInputElement.prototype,d=Object.getOwnPropertyDescriptor(g,"checked").set;if(i!==r&&d){const u=new Event("click",{bubbles:n});d.call(l,r),l.dispatchEvent(u)}},[i,r,n]),s.createElement("input",L({type:"checkbox","aria-hidden":!0,defaultChecked:r},a,{tabIndex:-1,ref:b,style:{...e.style,...o,position:"absolute",pointerEvents:"none",opacity:0,margin:0}}))};function ne(e){return e?"checked":"unchecked"}const ke=Se,ve=Fe,$=14,f=1.5,_=2,C=32,z=18,y=Z(ve,{position:"absolute",left:0,width:$,height:$,backgroundColor:"$switchThumb",borderRadius:"$round",boxShadow:"rgba(0, 0, 0, 0.3) 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 1px 2px;",transition:"transform 100ms cubic-bezier(0.22, 1, 0.36, 1)",transform:`translateX(${_}px)`,willChange:"transform",'&[data-state="checked"]':{transform:`translateX(${C-_-$}px)`}}),Ce=Z(ke,{all:"unset",boxSizing:"border-box",userSelect:"none","&::before":{boxSizing:"border-box"},"&::after":{boxSizing:"border-box"},alignItems:"center",display:"inline-flex",justifyContent:"center",lineHeight:"1",margin:"0",outline:"none",WebkitTapHighlightColor:"rgba(0,0,0,0)",backgroundColor:"$switchBackground",borderRadius:"$pill",position:"relative","@hover":{"&:hover":{cursor:"pointer",[`& ${y}`]:{...V[1]}}},"&:focus":{outline:"2px solid $switchFocusBorder",[`& ${y}`]:{...V[2]}},"&:disabled":{pointerEvents:"none",opacity:.38},'&[data-state="checked"]':{backgroundColor:"$switchActiveBackground"},variants:{size:{1:{width:C,height:z,m:"$2"},2:{width:C*f,height:z*f,[`& ${y}`]:{width:$*f,height:$*f,transform:`translateX(${f*_})`,'&[data-state="checked"]':{transform:`translateX(${f*(C-_-$)}px)`}}}}},defaultVariants:{size:"1"}}),H=p.forwardRef((e,t)=>c(Ce,{...e,ref:t,children:c(y,{})}));try{H.displayName="Switch",H.__docgenInfo={description:"",displayName:"Switch",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:'number | "1" | "2" | ({ "@light"?: number | "1" | "2"; "@bp1"?: number | "1" | "2"; "@bp2"?: number | "1" | "2" | undefined; "@bp3"?: number | "1" | "2" | undefined; "@bp4"?: number | ... 2 more ... | undefined; "@motion"?: number | ... 2 more ... | undefined; "@hover"?: number | ... 2 more ....'}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSS"}}}}}catch{}const ye=e=>c(H,{...e}),E=me(ye),Ne={title:"Components/Switch",component:E,argTypes:{onClick:{action:"clicked"}}},M=e=>c(E,{...e}),S=M.bind({});S.args={};const x=M.bind({});x.args={size:"2"};const F=M.bind({});F.args={disabled:!0};const m=({id:e,...t})=>T(re,{align:"center",children:[c(B,{variant:"contrast",htmlFor:e,children:"label"}),c(E,{id:e,...t})]});m.args={id:"labelled"};te("id",m);const h=({id:e,onFocus:t,onBlur:r,invalid:n,disabled:a,...b})=>{const[i,o]=p.useState(!1),l=p.useMemo(()=>a?"subtle":n?"invalid":i?"contrast":"default",[n,a,i]),g=p.useMemo(()=>n?"invalid":a?"subtle":"contrast",[n,a]),w=p.useCallback(u=>{t&&t(u),o(!0)},[t,o]),d=p.useCallback(u=>{r&&r(u),o(!1)},[r,o]);return T(ie,{children:[c(B,{htmlFor:e,variant:l,children:"title"}),T(re,{align:"center",children:[c(B,{variant:g,htmlFor:e,children:"label"}),c(E,{id:e,disabled:a,onBlur:d,onFocus:w,...b})]})]})};h.args={id:"label-title",invalid:!1,disabled:!1};te("id",h);var A,I,O;S.parameters={...S.parameters,docs:{...(A=S.parameters)==null?void 0:A.docs,source:{originalSource:"args => <SwitchForStory {...args} />",...(O=(I=S.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var q,j,D;x.parameters={...x.parameters,docs:{...(q=x.parameters)==null?void 0:q.docs,source:{originalSource:"args => <SwitchForStory {...args} />",...(D=(j=x.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var X,N,G;F.parameters={...F.parameters,docs:{...(X=F.parameters)==null?void 0:X.docs,source:{originalSource:"args => <SwitchForStory {...args} />",...(G=(N=F.parameters)==null?void 0:N.docs)==null?void 0:G.source}}};var U,W,J;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`({
  id,
  ...args
}) => <Flex align="center">
    <Label variant="contrast" htmlFor={id}>
      label
    </Label>
    <SwitchForStory id={id} {...args} />
  </Flex>`,...(J=(W=m.parameters)==null?void 0:W.docs)==null?void 0:J.source}}};var K,Q,Y;h.parameters={...h.parameters,docs:{...(K=h.parameters)==null?void 0:K.docs,source:{originalSource:`({
  id,
  onFocus,
  onBlur,
  invalid,
  disabled,
  ...args
}) => {
  const [hasFocus, setHasFocus] = React.useState(false);
  const titleVariant = React.useMemo(() => {
    if (disabled) {
      return 'subtle';
    }
    if (invalid) {
      return 'invalid';
    }
    if (hasFocus) {
      return 'contrast';
    }
    return 'default';
  }, [invalid, disabled, hasFocus]);
  const labelVariant = React.useMemo(() => {
    if (invalid) {
      return 'invalid';
    }
    if (disabled) {
      return 'subtle';
    }
    return 'contrast';
  }, [invalid, disabled]);
  const handleFocus = React.useCallback((e: React.FocusEvent<HTMLButtonElement>) => {
    if (onFocus) {
      onFocus(e);
    }
    setHasFocus(true);
  }, [onFocus, setHasFocus]);
  const handleBlur = React.useCallback((e: React.FocusEvent<HTMLButtonElement>) => {
    if (onBlur) {
      onBlur(e);
    }
    setHasFocus(false);
  }, [onBlur, setHasFocus]);
  return <>
      <Label htmlFor={id} variant={titleVariant}>
        title
      </Label>
      <Flex align="center">
        <Label variant={labelVariant} htmlFor={id}>
          label
        </Label>
        <SwitchForStory id={id} disabled={disabled} onBlur={handleBlur} onFocus={handleFocus} {...args} />
      </Flex>
    </>;
}`,...(Y=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:Y.source}}};const Ge=["Basic","Large","Disabled","Labelled","LabelAndTitle"];export{S as Basic,F as Disabled,h as LabelAndTitle,m as Labelled,x as Large,Ge as __namedExportsOrder,Ne as default};
