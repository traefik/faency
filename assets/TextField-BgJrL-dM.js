import{j as a,a as M}from"./jsx-runtime-WuQMLw89.js";import{R as e}from"./index-Dl6G-zuu.js";import{s as d}from"./stitches.config-CKE6G7UO.js";import{k as z,E as B,e as G,l as W}from"./react-icons.esm-C3slgq7o.js";import{I as $}from"./Input-ByZWJrJE.js";import{T as V}from"./Tooltip-BsFykkui.js";import{L as J}from"./Label-CazOnMFe.js";import{B as K}from"./Box-CsPUZVXZ.js";const L=d("div",{display:"flex",flexDirection:"row",alignItems:"center"}),Q=d(z,{"& + *":{marginLeft:"$1"}}),U=d(B,{"@hover":{"&:hover":{cursor:"pointer"}}}),X=d(G,{"@hover":{"&:hover":{cursor:"pointer"}}}),Y=d(W,{"@hover":{"&:hover":{cursor:"pointer"}}}),C=e.forwardRef(({state:u,clearable:r,label:s,id:m,type:l,disabled:o,readOnly:g,onBlur:v,onFocus:y,css:q,...A},k)=>{const c=e.useRef(null);e.useImperativeHandle(k,()=>c.current);const[b,p]=e.useState(!1),[f,w]=e.useState(l),h=e.useMemo(()=>f!=="password",[f]),n=e.useMemo(()=>u==="invalid",[u]),x=e.useMemo(()=>o?"subtle":n?"invalid":b?"contrast":"default",[n,o,b]),E=e.useMemo(()=>s==null?null:typeof s=="string"?a(J,{variant:x,htmlFor:m,children:s}):a(s,{variant:x,htmlFor:m}),[s,x,m]),t=e.useMemo(()=>l==="password",[l]),F=e.useMemo(()=>t?f:l,[t,l,f]),S=e.useMemo(()=>r||t||n,[r,t,n]),I=e.useMemo(()=>r&&n||r&&t||n&&t,[r,n,t]),_=e.useMemo(()=>g||o,[g,o]),R=e.useCallback(()=>{const{current:i}=c;i&&i.clear()},[c]),N=e.useCallback(i=>{y&&y(i),p(!0)},[y,p]),P=e.useCallback(i=>{v&&v(i),p(!1)},[v,p]),H=e.useCallback(()=>{w(i=>i==="password"?void 0:"password")},[w]),j=e.useMemo(()=>I?L:e.Fragment,[I]),D=e.useMemo(()=>h?X:U,[h]),T=e.useMemo(()=>h?"Hide password":"Show password",[h]);return M(K,{css:q,children:[E,a($,{id:m,ref:c,endAdornment:S&&M(j,{children:[n&&a(Q,{role:"alert","aria-label":"Invalid"}),t&&a(V,{content:T,children:a(D,{"aria-label":T,onClick:H})}),r&&!_&&a(V,{content:"Clear",children:a(Y,{"aria-label":"Clear",onClick:R})})]}),state:u,type:F,disabled:o,readOnly:g,onFocus:N,onBlur:P,...A})]})});try{C.displayName="TextField",C.__docgenInfo={description:"",displayName:"TextField",props:{type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"string"}},startAdornment:{defaultValue:null,description:"",name:"startAdornment",required:!1,type:{name:"ReactNode"}},endAdornment:{defaultValue:null,description:"",name:"endAdornment",required:!1,type:{name:"ReactNode"}},cursor:{defaultValue:null,description:"",name:"cursor",required:!1,type:{name:'"default" | "text" | ({ "@light"?: "default" | "text"; "@bp1"?: "default" | "text"; "@bp2"?: "default" | "text" | undefined; "@bp3"?: "default" | "text" | undefined; ... 4 more ...; "@initial"?: "default" | ... 1 more ... | undefined; } & { ...; }) | undefined'}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:'"medium" | "large" | "small" | ({ "@light"?: "medium" | "large" | "small"; "@bp1"?: "medium" | "large" | "small"; "@bp2"?: "medium" | "large" | "small" | undefined; ... 5 more ...; "@initial"?: "medium" | ... 2 more ... | undefined; } & { ...; }) | undefined'}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'"ghost" | ({ "@light"?: "ghost"; "@bp1"?: "ghost"; "@bp2"?: "ghost" | undefined; "@bp3"?: "ghost" | undefined; "@bp4"?: "ghost" | undefined; "@motion"?: "ghost" | undefined; "@hover"?: "ghost" | undefined; "@dark"?: "ghost" | undefined; "@initial"?: "ghost" | undefined; } & { ...; }) | undefi...'}},state:{defaultValue:null,description:"",name:"state",required:!1,type:{name:'"invalid" | ({ "@light"?: "invalid"; "@bp1"?: "invalid"; "@bp2"?: "invalid" | undefined; "@bp3"?: "invalid" | undefined; "@bp4"?: "invalid" | undefined; "@motion"?: "invalid" | undefined; "@hover"?: "invalid" | undefined; "@dark"?: "invalid" | undefined; "@initial"?: "invalid" | undefined; } ...'}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ prefix: ""; media: { bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; ... 4 more ...; light: "(prefers-color-scheme: light)"; }; theme: { ...; }; themeMap: DefaultThemeMap; utils: { ...; }; }>'}},clearable:{defaultValue:null,description:"",name:"clearable",required:!1,type:{name:"boolean"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string | ((props: TextFieldLabelProps) => Element)"}}}}}catch{}export{C as T};