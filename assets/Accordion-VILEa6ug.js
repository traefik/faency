import{j as I,a as le}from"./jsx-runtime-WuQMLw89.js";import{r as d,R as r}from"./index-Dl6G-zuu.js";import{_ as m}from"./extends-CCbyfPlC.js";import{$ as Y,a as se}from"./index-D_wDWxb3.js";import{$ as pe,a as fe}from"./index-DbIbOXBD.js";import{$ as Z}from"./index-Cy-whKHn.js";import{$ as M,a as J}from"./index-COmNUzeK.js";import{$ as w}from"./index-D1o5GlT1.js";import{$ as me}from"./index-C0EqwiN4.js";import{$ as Q}from"./index-CKWv3fp9.js";import{k as X,s as v}from"./stitches.config-CKE6G7UO.js";import{d as ue}from"./react-icons.esm-C3slgq7o.js";import{e as be}from"./Elevation-CQxWisSY.js";const ee="Collapsible",[$e,oe]=Y(ee),[he,z]=$e(ee),xe=d.forwardRef((e,a)=>{const{__scopeCollapsible:o,open:t,defaultOpen:i,disabled:n,onOpenChange:c,...l}=e,[s=!1,p]=M({prop:t,defaultProp:i,onChange:c});return d.createElement(he,{scope:o,disabled:n,contentId:Q(),open:s,onOpenToggle:d.useCallback(()=>p(b=>!b),[p])},d.createElement(w.div,m({"data-state":H(s),"data-disabled":n?"":void 0},l,{ref:a})))}),ge="CollapsibleTrigger",ve=d.forwardRef((e,a)=>{const{__scopeCollapsible:o,...t}=e,i=z(ge,o);return d.createElement(w.button,m({type:"button","aria-controls":i.contentId,"aria-expanded":i.open||!1,"data-state":H(i.open),"data-disabled":i.disabled?"":void 0,disabled:i.disabled},t,{ref:a,onClick:J(e.onClick,i.onOpenToggle)}))}),te="CollapsibleContent",ye=d.forwardRef((e,a)=>{const{forceMount:o,...t}=e,i=z(te,e.__scopeCollapsible);return d.createElement(me,{present:o||i.open},({present:n})=>d.createElement(_e,m({},t,{ref:a,present:n})))}),_e=d.forwardRef((e,a)=>{const{__scopeCollapsible:o,present:t,children:i,...n}=e,c=z(te,o),[l,s]=d.useState(t),p=d.useRef(null),b=Z(a,p),$=d.useRef(0),y=$.current,g=d.useRef(0),_=g.current,A=c.open||l,C=d.useRef(A),h=d.useRef();return d.useEffect(()=>{const f=requestAnimationFrame(()=>C.current=!1);return()=>cancelAnimationFrame(f)},[]),se(()=>{const f=p.current;if(f){h.current=h.current||{transitionDuration:f.style.transitionDuration,animationName:f.style.animationName},f.style.transitionDuration="0s",f.style.animationName="none";const u=f.getBoundingClientRect();$.current=u.height,g.current=u.width,C.current||(f.style.transitionDuration=h.current.transitionDuration,f.style.animationName=h.current.animationName),s(t)}},[c.open,t]),d.createElement(w.div,m({"data-state":H(c.open),"data-disabled":c.disabled?"":void 0,id:c.contentId,hidden:!A},n,{ref:b,style:{"--radix-collapsible-content-height":y?`${y}px`:void 0,"--radix-collapsible-content-width":_?`${_}px`:void 0,...e.style}}),A&&i)});function H(e){return e?"open":"closed"}const Ce=xe,Ae=ve,we=ye,x="Accordion",Ie=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[L,Ee,Re]=pe(x),[E,mo]=Y(x,[Re,oe]),j=oe(),ne=r.forwardRef((e,a)=>{const{type:o,...t}=e,i=t,n=t;return r.createElement(L.Provider,{scope:e.__scopeAccordion},o==="multiple"?r.createElement(Pe,m({},n,{ref:a})):r.createElement(Ne,m({},i,{ref:a})))});ne.propTypes={type(e){const a=e.value||e.defaultValue;return e.type&&!["single","multiple"].includes(e.type)?new Error("Invalid prop `type` supplied to `Accordion`. Expected one of `single | multiple`."):e.type==="multiple"&&typeof a=="string"?new Error("Invalid prop `type` supplied to `Accordion`. Expected `single` when `defaultValue` or `value` is type `string`."):e.type==="single"&&Array.isArray(a)?new Error("Invalid prop `type` supplied to `Accordion`. Expected `multiple` when `defaultValue` or `value` is type `string[]`."):null}};const[re,Se]=E(x),[ae,Ve]=E(x,{collapsible:!1}),Ne=r.forwardRef((e,a)=>{const{value:o,defaultValue:t,onValueChange:i=()=>{},collapsible:n=!1,...c}=e,[l,s]=M({prop:o,defaultProp:t,onChange:i});return r.createElement(re,{scope:e.__scopeAccordion,value:l?[l]:[],onItemOpen:s,onItemClose:r.useCallback(()=>n&&s(""),[n,s])},r.createElement(ae,{scope:e.__scopeAccordion,collapsible:n},r.createElement(ie,m({},c,{ref:a}))))}),Pe=r.forwardRef((e,a)=>{const{value:o,defaultValue:t,onValueChange:i=()=>{},...n}=e,[c=[],l]=M({prop:o,defaultProp:t,onChange:i}),s=r.useCallback(b=>l(($=[])=>[...$,b]),[l]),p=r.useCallback(b=>l(($=[])=>$.filter(y=>y!==b)),[l]);return r.createElement(re,{scope:e.__scopeAccordion,value:c,onItemOpen:s,onItemClose:p},r.createElement(ae,{scope:e.__scopeAccordion,collapsible:!0},r.createElement(ie,m({},n,{ref:a}))))}),[ke,R]=E(x),ie=r.forwardRef((e,a)=>{const{__scopeAccordion:o,disabled:t,dir:i,orientation:n="vertical",...c}=e,l=r.useRef(null),s=Z(l,a),p=Ee(o),$=fe(i)==="ltr",y=J(e.onKeyDown,g=>{var _;if(!Ie.includes(g.key))return;const A=g.target,C=p().filter(k=>{var T;return!((T=k.ref.current)!==null&&T!==void 0&&T.disabled)}),h=C.findIndex(k=>k.ref.current===A),f=C.length;if(h===-1)return;g.preventDefault();let u=h;const S=0,V=f-1,N=()=>{u=h+1,u>V&&(u=S)},P=()=>{u=h-1,u<S&&(u=V)};switch(g.key){case"Home":u=S;break;case"End":u=V;break;case"ArrowRight":n==="horizontal"&&($?N():P());break;case"ArrowDown":n==="vertical"&&N();break;case"ArrowLeft":n==="horizontal"&&($?P():N());break;case"ArrowUp":n==="vertical"&&P();break}const de=u%f;(_=C[de].ref.current)===null||_===void 0||_.focus()});return r.createElement(ke,{scope:o,disabled:t,direction:i,orientation:n},r.createElement(L.Slot,{scope:o},r.createElement(w.div,m({},c,{"data-orientation":n,ref:s,onKeyDown:t?void 0:y}))))}),q="AccordionItem",[Te,F]=E(q),qe=r.forwardRef((e,a)=>{const{__scopeAccordion:o,value:t,...i}=e,n=R(q,o),c=Se(q,o),l=j(o),s=Q(),p=t&&c.value.includes(t)||!1,b=n.disabled||e.disabled;return r.createElement(Te,{scope:o,open:p,disabled:b,triggerId:s},r.createElement(Ce,m({"data-orientation":n.orientation,"data-state":ce(p)},l,i,{ref:a,disabled:b,open:p,onOpenChange:$=>{$?c.onItemOpen(t):c.onItemClose(t)}})))}),Oe="AccordionHeader",De=r.forwardRef((e,a)=>{const{__scopeAccordion:o,...t}=e,i=R(x,o),n=F(Oe,o);return r.createElement(w.h3,m({"data-orientation":i.orientation,"data-state":ce(n.open),"data-disabled":n.disabled?"":void 0},t,{ref:a}))}),G="AccordionTrigger",Me=r.forwardRef((e,a)=>{const{__scopeAccordion:o,...t}=e,i=R(x,o),n=F(G,o),c=Ve(G,o),l=j(o);return r.createElement(L.ItemSlot,{scope:o},r.createElement(Ae,m({"aria-disabled":n.open&&!c.collapsible||void 0,"data-orientation":i.orientation,id:n.triggerId},l,t,{ref:a})))}),ze="AccordionContent",He=r.forwardRef((e,a)=>{const{__scopeAccordion:o,...t}=e,i=R(x,o),n=F(ze,o),c=j(o);return r.createElement(we,m({role:"region","aria-labelledby":n.triggerId,"data-orientation":i.orientation},c,t,{ref:a,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...e.style}}))});function ce(e){return e?"open":"closed"}const Le=ne,je=qe,Fe=De,Ge=Me,Ke=He,Be=X({from:{height:0},to:{height:"var(--radix-accordion-content-height)"}}),Ue=X({from:{height:"var(--radix-accordion-content-height)"},to:{height:0}}),We=v(Le,{borderRadius:0,bc:"transparent",variants:{elevation:be},defaultVariants:{elevation:0}}),Ye=v(je,{mt:"$1",borderRadius:"inherit","&:first-child":{mt:0},boxShadow:"0 1px 0 0 $colors$divider"}),O=v(Fe,{all:"unset",display:"flex",borderRadius:"inherit"}),D=v(Ge,{all:"unset",borderRadius:"inherit",fontFamily:"inherit",bc:"$contentBg",c:"$accordionLabel",px:"$2",lineHeight:1,fontSize:"$3",display:"flex",flex:1,alignItems:"center",justifyContent:"flex-start",position:"relative","&::before":{borderRadius:"inherit",boxSizing:"border-box",content:'""',position:"absolute",inset:0},"&:focus":{boxShadow:"inset 0 0 0 1px $colors$accordionActiveShadow"},"@hover":{"&:hover":{cursor:"pointer","&::before":{backgroundColor:"$accordionHoverShadow"}}},transition:"opacity 200ms ease-out",variants:{size:{small:{py:"$2"},medium:{py:"$3"},large:{py:"$5"}}},defaultVariants:{size:"small"}}),Ze=v(ue,{mr:"$2",c:"$accordionText",transition:"transform 200ms ease-out","[data-state=open] > &":{transform:"rotateZ(90deg)"}}),Je=v(Ke,{overflow:"hidden",fontSize:"$3",c:"$accordionText",'&[data-state="open"]':{animation:`${Be} 200ms ease-out`},'&[data-state="closed"]':{animation:`${Ue} 200ms ease-out`}}),Qe=v("div",{variants:{size:{small:{py:"$2"},medium:{py:"$3"},large:{py:"$5"}}},defaultVariants:{size:"small"}}),K=We,B=Ye,U=r.forwardRef(({children:e,...a},o)=>I(O,{children:le(D,{ref:o,...a,children:[I(Ze,{"aria-hidden":!0}),e]})})),W=r.forwardRef(({children:e,size:a,...o},t)=>I(Je,{...o,ref:t,children:I(Qe,{size:a,children:e})}));try{O.displayName="StyledAccordionHeader",O.__docgenInfo={description:"",displayName:"StyledAccordionHeader",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}try{D.displayName="StyledAccordionTrigger",D.__docgenInfo={description:"",displayName:"StyledAccordionTrigger",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:'"medium" | "large" | "small" | ({ "@light"?: "medium" | "large" | "small"; "@bp1"?: "medium" | "large" | "small"; "@bp2"?: "medium" | "large" | "small" | undefined; ... 5 more ...; "@initial"?: "medium" | ... 2 more ... | undefined; } & { ...; }) | undefined'}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}try{K.displayName="AccordionRoot",K.__docgenInfo={description:"",displayName:"AccordionRoot",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},elevation:{defaultValue:null,description:"",name:"elevation",required:!1,type:{name:'number | `${number}` | ({ "@light"?: number | `${number}`; "@bp1"?: number | `${number}`; "@bp2"?: number | `${number}` | undefined; "@bp3"?: number | `${number}` | undefined; "@bp4"?: number | ... 1 more ... | undefined; "@motion"?: number | ... 1 more ... | undefined; "@hover"?: number | .....'}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}try{B.displayName="AccordionItem",B.__docgenInfo={description:"",displayName:"AccordionItem",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}try{U.displayName="AccordionTrigger",U.__docgenInfo={description:"",displayName:"AccordionTrigger",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:'"medium" | "large" | "small" | ({ "@light"?: "medium" | "large" | "small"; "@bp1"?: "medium" | "large" | "small"; "@bp2"?: "medium" | "large" | "small" | undefined; ... 5 more ...; "@initial"?: "medium" | ... 2 more ... | undefined; } & { ...; }) | undefined'}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}try{W.displayName="AccordionContent",W.__docgenInfo={description:"",displayName:"AccordionContent",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:'"medium" | "large" | "small" | ({ "@light"?: "medium" | "large" | "small"; "@bp1"?: "medium" | "large" | "small"; "@bp2"?: "medium" | "large" | "small" | undefined; ... 5 more ...; "@initial"?: "medium" | ... 2 more ... | undefined; } & { ...; }) | undefined'}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ prefix: ""; media: { bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; ... 4 more ...; light: "(prefers-color-scheme: light)"; }; theme: { ...; }; themeMap: DefaultThemeMap; utils: { ...; }; }>'}}}}}catch{}export{B as A,D as S,U as a,W as b,K as c,O as d};
