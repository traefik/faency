import{a as E,j as m}from"./jsx-runtime-WuQMLw89.js";import{_ as l}from"./extends-CCbyfPlC.js";import{r as b,R as t}from"./index-Dl6G-zuu.js";import{$ as N}from"./index-D_wDWxb3.js";import{$ as w}from"./index-D1o5GlT1.js";import{$ as T,a as j,b as D}from"./index-DDdsoQNw.js";import{$ as S,a as L}from"./index-COmNUzeK.js";import{a as z}from"./index-DbIbOXBD.js";import{s as R}from"./stitches.config-CKE6G7UO.js";import"./index-D1_ZHIBm.js";import"./index-Cy-whKHn.js";import"./index-CKWv3fp9.js";const U=b.forwardRef((e,o)=>{const{pressed:i,defaultPressed:n=!1,onPressedChange:a,...c}=e,[s=!1,r]=S({prop:i,onChange:a,defaultProp:n});return b.createElement(w.button,l({type:"button","aria-pressed":s,"data-state":s?"on":"off","data-disabled":e.disabled?"":void 0},c,{ref:o,onClick:L(e.onClick,()=>{e.disabled||r(!s)})}))}),v="ToggleGroup",[O,pe]=N(v,[T]),k=T(),W=t.forwardRef((e,o)=>{const{type:i,...n}=e;if(i==="single"){const a=n;return t.createElement(H,l({},a,{ref:o}))}if(i==="multiple"){const a=n;return t.createElement(J,l({},a,{ref:o}))}throw new Error(`Missing prop \`type\` expected on \`${v}\``)}),[A,M]=O(v),H=t.forwardRef((e,o)=>{const{value:i,defaultValue:n,onValueChange:a=()=>{},...c}=e,[s,r]=S({prop:i,defaultProp:n,onChange:a});return t.createElement(A,{scope:e.__scopeToggleGroup,type:"single",value:s?[s]:[],onItemActivate:r,onItemDeactivate:t.useCallback(()=>r(""),[r])},t.createElement(F,l({},c,{ref:o})))}),J=t.forwardRef((e,o)=>{const{value:i,defaultValue:n,onValueChange:a=()=>{},...c}=e,[s=[],r]=S({prop:i,defaultProp:n,onChange:a}),d=t.useCallback(p=>r((f=[])=>[...f,p]),[r]),x=t.useCallback(p=>r((f=[])=>f.filter(q=>q!==p)),[r]);return t.createElement(A,{scope:e.__scopeToggleGroup,type:"multiple",value:s,onItemActivate:d,onItemDeactivate:x},t.createElement(F,l({},c,{ref:o})))}),[K,Q]=O(v),F=t.forwardRef((e,o)=>{const{__scopeToggleGroup:i,disabled:n=!1,rovingFocus:a=!0,orientation:c,dir:s,loop:r=!0,...d}=e,x=k(i),p=z(s),f={role:"group",dir:p,...d};return t.createElement(K,{scope:i,rovingFocus:a,disabled:n},a?t.createElement(j,l({asChild:!0},x,{orientation:c,dir:p,loop:r}),t.createElement(w.div,l({},f,{ref:o}))):t.createElement(w.div,l({},f,{ref:o})))}),C="ToggleGroupItem",X=t.forwardRef((e,o)=>{const i=M(C,e.__scopeToggleGroup),n=Q(C,e.__scopeToggleGroup),a=k(e.__scopeToggleGroup),c=i.value.includes(e.value),s=n.disabled||e.disabled,r={...e,pressed:c,disabled:s},d=t.useRef(null);return n.rovingFocus?t.createElement(D,l({asChild:!0},a,{focusable:!s,active:c,ref:d}),t.createElement(_,l({},r,{ref:o}))):t.createElement(_,l({},r,{ref:o}))}),_=t.forwardRef((e,o)=>{const{__scopeToggleGroup:i,value:n,...a}=e,c=M(C,i),s={role:"radio","aria-checked":e.pressed,"aria-pressed":void 0},r=c.type==="single"?s:void 0;return t.createElement(U,l({},r,a,{ref:o,onPressedChange:d=>{d?c.onItemActivate(n):c.onItemDeactivate(n)}}))}),Y=W,Z=X,g=R(Y,{display:"inline-flex",bc:"$buttonSwitchContainerBg",borderRadius:"$3",p:"3px",gap:"$1"}),u=R(Z,{display:"inline-flex",bc:"$buttonSwitchOffBg",c:"$buttonSwitchOffColor",p:"$1",width:"$10",justifyContent:"center",fontWeight:600,border:"none",position:"relative","&::before":{boxSizing:"border-box",content:'""',position:"absolute",inset:0,borderRadius:"$3"},"&::after":{boxSizing:"border-box",content:'""',position:"absolute",inset:0,borderRadius:"$3"},"&:focus-visible":{borderRadius:"$3","&::before":{backgroundColor:"rgba(255, 255, 255, 0.15)"},"&::after":{opacity:.15}},"@hover":{"&:hover":{cursor:"pointer","&::before":{backgroundColor:"rgba(255, 255, 255, 0.15)"},"&::after":{opacity:.05}}},"&[data-state=on]":{bc:"$buttonSwitchActiveBg",c:"$buttonSwitchActiveColor",borderRadius:"$3"}});try{g.displayName="ButtonSwitchContainer",g.__docgenInfo={description:"",displayName:"ButtonSwitchContainer",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}try{u.displayName="ButtonSwitchItem",u.__docgenInfo={description:"",displayName:"ButtonSwitchItem",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}const fe={title:"Components/ButtonSwitch",component:g},h=()=>{const[e,o]=b.useState("left");return E(g,{type:"single",value:e,onValueChange:o,children:[m(u,{value:"left",children:"Left"}),m(u,{value:"right",children:"Right"})]})},$=()=>{const[e,o]=b.useState([]);return E(g,{type:"multiple",value:e,onValueChange:o,children:[m(u,{value:"option1",children:"Option 1"}),m(u,{value:"option2",children:"Option 2"}),m(u,{value:"option3",children:"Option 3"}),m(u,{value:"option4",children:"Option 4"})]})};var y,B,G;h.parameters={...h.parameters,docs:{...(y=h.parameters)==null?void 0:y.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('left');
  return <ButtonSwitchContainer type="single" value={value} onValueChange={setValue}>
      <ButtonSwitchItem value="left">Left</ButtonSwitchItem>
      <ButtonSwitchItem value="right">Right</ButtonSwitchItem>
    </ButtonSwitchContainer>;
}`,...(G=(B=h.parameters)==null?void 0:B.docs)==null?void 0:G.source}}};var I,V,P;$.parameters={...$.parameters,docs:{...(I=$.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const [value, setValue] = useState<string[]>([]);
  return <ButtonSwitchContainer type="multiple" value={value} onValueChange={setValue}>
      <ButtonSwitchItem value="option1">Option 1</ButtonSwitchItem>
      <ButtonSwitchItem value="option2">Option 2</ButtonSwitchItem>
      <ButtonSwitchItem value="option3">Option 3</ButtonSwitchItem>
      <ButtonSwitchItem value="option4">Option 4</ButtonSwitchItem>
    </ButtonSwitchContainer>;
}`,...(P=(V=$.parameters)==null?void 0:V.docs)==null?void 0:P.source}}};const me=["Basic","Multiple"];export{h as Basic,$ as Multiple,me as __namedExportsOrder,fe as default};
