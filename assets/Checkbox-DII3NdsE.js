import{j as k}from"./jsx-runtime-WuQMLw89.js";import{r as t,R as D}from"./index-Dl6G-zuu.js";import{s as E}from"./stitches.config-CKE6G7UO.js";import{_ as C}from"./extends-CCbyfPlC.js";import{$ as z}from"./index-Cy-whKHn.js";import{$ as q}from"./index-D_wDWxb3.js";import{$ as H,a as y}from"./index-COmNUzeK.js";import{$ as M}from"./index-CYHKWj1-.js";import{$ as j}from"./index-CH6e6d6N.js";import{$ as N}from"./index-C0EqwiN4.js";import{$ as _}from"./index-D1o5GlT1.js";import{m as T}from"./react-icons.esm-C3slgq7o.js";const S="Checkbox",[O,ie]=q(S),[V,A]=O(S),K=t.forwardRef((e,c)=>{const{__scopeCheckbox:o,name:i,checked:u,defaultChecked:a,required:f,disabled:s,value:l="on",onCheckedChange:h,...g}=e,[n,$]=t.useState(null),R=z(c,r=>$(r)),m=t.useRef(!1),v=n?!!n.closest("form"):!0,[b=!1,x]=H({prop:u,defaultProp:a,onChange:h}),P=t.useRef(b);return t.useEffect(()=>{const r=n==null?void 0:n.form;if(r){const p=()=>x(P.current);return r.addEventListener("reset",p),()=>r.removeEventListener("reset",p)}},[n,x]),t.createElement(V,{scope:o,state:b,disabled:s},t.createElement(_.button,C({type:"button",role:"checkbox","aria-checked":d(b)?"mixed":b,"aria-required":f,"data-state":I(b),"data-disabled":s?"":void 0,disabled:s,value:l},g,{ref:R,onKeyDown:y(e.onKeyDown,r=>{r.key==="Enter"&&r.preventDefault()}),onClick:y(e.onClick,r=>{x(p=>d(p)?!0:!p),v&&(m.current=r.isPropagationStopped(),m.current||r.stopPropagation())})})),v&&t.createElement(X,{control:n,bubbles:!m.current,name:i,value:l,checked:b,required:f,disabled:s,style:{transform:"translateX(-100%)"}}))}),L="CheckboxIndicator",F=t.forwardRef((e,c)=>{const{__scopeCheckbox:o,forceMount:i,...u}=e,a=A(L,o);return t.createElement(N,{present:i||d(a.state)||a.state===!0},t.createElement(_.span,C({"data-state":I(a.state),"data-disabled":a.disabled?"":void 0},u,{ref:c,style:{pointerEvents:"none",...e.style}})))}),X=e=>{const{control:c,checked:o,bubbles:i=!0,...u}=e,a=t.useRef(null),f=M(o),s=j(c);return t.useEffect(()=>{const l=a.current,h=window.HTMLInputElement.prototype,n=Object.getOwnPropertyDescriptor(h,"checked").set;if(f!==o&&n){const $=new Event("click",{bubbles:i});l.indeterminate=d(o),n.call(l,d(o)?!1:o),l.dispatchEvent($)}},[f,o,i]),t.createElement("input",C({type:"checkbox","aria-hidden":!0,defaultChecked:d(o)?!1:o},u,{tabIndex:-1,ref:a,style:{...e.style,...s,position:"absolute",pointerEvents:"none",opacity:0,margin:0}}))};function d(e){return e==="indeterminate"}function I(e){return d(e)?"indeterminate":e?"checked":"unchecked"}const W=K,G=F,B=E(G,{alignItems:"center",display:"flex",height:"100%",justifyContent:"center",width:"100%"}),J=E(W,{all:"unset",border:"none",boxSizing:"border-box",userSelect:"none","&::before":{boxSizing:"border-box"},"&::after":{boxSizing:"border-box"},alignItems:"center",appearance:"none",display:"inline-flex",justifyContent:"center",lineHeight:"1",margin:"0",outline:"none",padding:"0",WebkitTapHighlightColor:"rgba(0,0,0,0)",overflow:"hidden","&[data-state=checked]":{backgroundColor:"$checkboxCheckedBg",boxShadow:"inset 0 0 0 1px transparent",color:"$checkboxCheckedIcon","@hover":{"&:hover":{backgroundColor:"$checkboxCheckedHoverBg"}}},"&[data-state=unchecked]":{backgroundColor:"$checkboxBg",boxShadow:"inset 0 0 0 1px $colors$checkboxBorder",color:"$checkboxIcon","@hover":{"&:hover":{backgroundColor:"$checkboxHoverBg",boxShadow:"inset 0 0 0 1px $colors$checkboxHoverBorder"}}},"&:focus":{outline:"none",boxShadow:"inset 0 0 0 1px $colors$checkboxFocusBorder"},"&:disabled":{pointerEvents:"none",backgroundColor:"$checkboxDisabledBg",boxShadow:"inset 0 0 0 1px $colors$checkboxDisabledBorder","&::placeholder":{color:"$checkboxDisabledText"},[`& ${B}`]:{"&::after":{backgroundColor:"$checkboxIndicatorDisabledBg"}}},variants:{size:{medium:{width:18,height:18,borderRadius:"$2"},large:{width:"$5",height:"$5",borderRadius:"$3"}}},defaultVariants:{size:"medium"}}),w=D.forwardRef((e,c)=>k(J,{...e,ref:c,children:k(B,{children:k(T,{height:40,width:40})})}));try{w.displayName="Checkbox",w.__docgenInfo={description:"",displayName:"Checkbox",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:'"medium" | "large" | ({ "@light"?: "medium" | "large"; "@bp1"?: "medium" | "large"; "@bp2"?: "medium" | "large" | undefined; "@bp3"?: "medium" | "large" | undefined; ... 4 more ...; "@initial"?: "medium" | ... 1 more ... | undefined; } & { ...; }) | undefined'}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ prefix: ""; media: { bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; ... 4 more ...; light: "(prefers-color-scheme: light)"; }; theme: { ...; }; themeMap: DefaultThemeMap; utils: { ...; }; }>'}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}export{w as C};
