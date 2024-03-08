import{a as k,j as O}from"./jsx-runtime-WuQMLw89.js";import{r as o,R as q}from"./index-Dl6G-zuu.js";import{s as w}from"./stitches.config-CKE6G7UO.js";import{_ as d}from"./extends-CCbyfPlC.js";import{a as $,$ as K}from"./index-COmNUzeK.js";import{$ as A,b as j}from"./index-Cy-whKHn.js";import{$ as H}from"./index-D_wDWxb3.js";import{$ as L}from"./index-CiDhy-qA.js";import{$ as G,h as W,a as U,b as Z,c as z}from"./index-DwXtUxXH.js";import{$ as B}from"./index-CKWv3fp9.js";import{$ as R,b as F,c as J,d as Q,a as X}from"./index-DEk5VkIV.js";import{$ as N}from"./index-C0EqwiN4.js";import{$ as I}from"./index-D1o5GlT1.js";import{p as Y}from"./Panel-DnGxmVDB.js";import{e as ee}from"./Elevation-CQxWisSY.js";const M="Popover",[D,je]=H(M,[R]),m=R(),[oe,i]=D(M),te=e=>{const{__scopePopover:n,children:c,open:a,defaultOpen:t,onOpenChange:r,modal:s=!1}=e,p=m(n),l=o.useRef(null),[u,v]=o.useState(!1),[h=!1,f]=K({prop:a,defaultProp:t,onChange:r});return o.createElement(X,p,o.createElement(oe,{scope:n,contentId:B(),triggerRef:l,open:h,onOpenChange:f,onOpenToggle:o.useCallback(()=>f(_=>!_),[f]),hasCustomAnchor:u,onCustomAnchorAdd:o.useCallback(()=>v(!0),[]),onCustomAnchorRemove:o.useCallback(()=>v(!1),[]),modal:s},c))},re="PopoverAnchor",ce=o.forwardRef((e,n)=>{const{__scopePopover:c,...a}=e,t=i(re,c),r=m(c),{onCustomAnchorAdd:s,onCustomAnchorRemove:p}=t;return o.useEffect(()=>(s(),()=>p()),[s,p]),o.createElement(F,d({},r,a,{ref:n}))}),ne="PopoverTrigger",ae=o.forwardRef((e,n)=>{const{__scopePopover:c,...a}=e,t=i(ne,c),r=m(c),s=A(n,t.triggerRef),p=o.createElement(I.button,d({type:"button","aria-haspopup":"dialog","aria-expanded":t.open,"aria-controls":t.contentId,"data-state":V(t.open)},a,{ref:s,onClick:$(e.onClick,t.onOpenToggle)}));return t.hasCustomAnchor?p:o.createElement(F,d({asChild:!0},r),p)}),S="PopoverPortal",[se,pe]=D(S,{forceMount:void 0}),de=e=>{const{__scopePopover:n,forceMount:c,children:a,container:t}=e,r=i(S,n);return o.createElement(se,{scope:n,forceMount:c},o.createElement(N,{present:c||r.open},o.createElement(G,{asChild:!0,container:t},a)))},b="PopoverContent",ie=o.forwardRef((e,n)=>{const c=pe(b,e.__scopePopover),{forceMount:a=c.forceMount,...t}=e,r=i(b,e.__scopePopover);return o.createElement(N,{present:a||r.open},r.modal?o.createElement(le,d({},t,{ref:n})):o.createElement(fe,d({},t,{ref:n})))}),le=o.forwardRef((e,n)=>{const c=i(b,e.__scopePopover),a=o.useRef(null),t=A(n,a),r=o.useRef(!1);return o.useEffect(()=>{const s=a.current;if(s)return W(s)},[]),o.createElement(U,{as:j,allowPinchZoom:!0},o.createElement(T,d({},e,{ref:t,trapFocus:c.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:$(e.onCloseAutoFocus,s=>{var p;s.preventDefault(),r.current||(p=c.triggerRef.current)===null||p===void 0||p.focus()}),onPointerDownOutside:$(e.onPointerDownOutside,s=>{const p=s.detail.originalEvent,l=p.button===0&&p.ctrlKey===!0,u=p.button===2||l;r.current=u},{checkForDefaultPrevented:!1}),onFocusOutside:$(e.onFocusOutside,s=>s.preventDefault(),{checkForDefaultPrevented:!1})})))}),fe=o.forwardRef((e,n)=>{const c=i(b,e.__scopePopover),a=o.useRef(!1),t=o.useRef(!1);return o.createElement(T,d({},e,{ref:n,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:r=>{var s;if((s=e.onCloseAutoFocus)===null||s===void 0||s.call(e,r),!r.defaultPrevented){var p;a.current||(p=c.triggerRef.current)===null||p===void 0||p.focus(),r.preventDefault()}a.current=!1,t.current=!1},onInteractOutside:r=>{var s,p;(s=e.onInteractOutside)===null||s===void 0||s.call(e,r),r.defaultPrevented||(a.current=!0,r.detail.originalEvent.type==="pointerdown"&&(t.current=!0));const l=r.target;((p=c.triggerRef.current)===null||p===void 0?void 0:p.contains(l))&&r.preventDefault(),r.detail.originalEvent.type==="focusin"&&t.current&&r.preventDefault()}}))}),T=o.forwardRef((e,n)=>{const{__scopePopover:c,trapFocus:a,onOpenAutoFocus:t,onCloseAutoFocus:r,disableOutsidePointerEvents:s,onEscapeKeyDown:p,onPointerDownOutside:l,onFocusOutside:u,onInteractOutside:v,...h}=e,f=i(b,c),_=m(c);return Z(),o.createElement(z,{asChild:!0,loop:!0,trapped:a,onMountAutoFocus:t,onUnmountAutoFocus:r},o.createElement(L,{asChild:!0,disableOutsidePointerEvents:s,onInteractOutside:v,onEscapeKeyDown:p,onPointerDownOutside:l,onFocusOutside:u,onDismiss:()=>f.onOpenChange(!1)},o.createElement(J,d({"data-state":V(f.open),role:"dialog",id:f.contentId},_,h,{ref:n,style:{...h.style,"--radix-popover-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-popover-content-available-width":"var(--radix-popper-available-width)","--radix-popover-content-available-height":"var(--radix-popper-available-height)","--radix-popover-trigger-width":"var(--radix-popper-anchor-width)","--radix-popover-trigger-height":"var(--radix-popper-anchor-height)"}}))))}),ue="PopoverClose",$e=o.forwardRef((e,n)=>{const{__scopePopover:c,...a}=e,t=i(ue,c);return o.createElement(I.button,d({type:"button"},a,{ref:n,onClick:$(e.onClick,()=>t.onOpenChange(!1))}))}),be=o.forwardRef((e,n)=>{const{__scopePopover:c,...a}=e,t=m(c);return o.createElement(Q,d({},t,a,{ref:n}))});function V(e){return e?"open":"closed"}const me=te,ve=ce,he=ae,_e=de,Pe=ie,ge=$e,xe=be;function P({children:e,...n}){return O(me,{...n,children:e})}const Ce=w(Pe,Y,{minWidth:200,minHeight:"$6",maxWidth:265,color:"$hiContrast","&:focus":{outline:"none"},variants:{elevation:ee},defaultVariants:{elevation:2}}),ye={0:{fill:"$00dp"},1:{fill:"$01dp"},2:{fill:"$02dp"},3:{fill:"$03dp"},4:{fill:"$04dp"},5:{fill:"$05dp"}},Ee=w(xe,{fill:"currentColor",variants:{elevation:ye},defaultVariants:{elevation:2}}),g=q.forwardRef(({children:e,hideArrow:n,arrowCss:c,elevation:a,...t},r)=>k(Ce,{sideOffset:0,elevation:a,...t,ref:r,children:[e,!n&&O(Ee,{elevation:a,width:11,height:5,offset:5,css:c})]})),x=he,C=ge,y=ve,E=_e;try{P.displayName="Popover",P.__docgenInfo={description:"",displayName:"Popover",props:{}}}catch{}try{g.displayName="PopoverContent",g.__docgenInfo={description:"",displayName:"PopoverContent",props:{elevation:{defaultValue:null,description:"",name:"elevation",required:!1,type:{name:'number | `${number}` | ({ "@light"?: number | `${number}`; "@bp1"?: number | `${number}`; "@bp2"?: number | `${number}` | undefined; "@bp3"?: number | `${number}` | undefined; "@bp4"?: number | ... 1 more ... | undefined; "@motion"?: number | ... 1 more ... | undefined; "@hover"?: number | .....'}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ prefix: ""; media: { bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; ... 4 more ...; light: "(prefers-color-scheme: light)"; }; theme: { ...; }; themeMap: DefaultThemeMap; utils: { ...; }; }>'}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},hideArrow:{defaultValue:null,description:"",name:"hideArrow",required:!1,type:{name:"boolean"}},arrowCss:{defaultValue:null,description:"",name:"arrowCss",required:!1,type:{name:'CSS<{ prefix: ""; media: { bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; ... 4 more ...; light: "(prefers-color-scheme: light)"; }; theme: { ...; }; themeMap: DefaultThemeMap; utils: { ...; }; }>'}}}}}catch{}try{x.displayName="PopoverTrigger",x.__docgenInfo={description:"",displayName:"PopoverTrigger",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}try{C.displayName="PopoverClose",C.__docgenInfo={description:"",displayName:"PopoverClose",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}try{y.displayName="PopoverAnchor",y.__docgenInfo={description:"",displayName:"PopoverAnchor",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}try{E.displayName="PopoverPortal",E.__docgenInfo={description:"",displayName:"PopoverPortal",props:{}}}catch{}export{de as $,x as P,g as a,C as b,ce as c,P as d};