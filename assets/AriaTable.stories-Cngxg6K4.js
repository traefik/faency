import{j as e,a,F as z}from"./jsx-runtime-WuQMLw89.js";import{r as l}from"./index-Dl6G-zuu.js";import{b as pe}from"./index-BSTPHMlZ.js";import{s as T}from"./stitches.config-CKE6G7UO.js";import{m as Te}from"./index-BfTaDxMi.js";import{d as me}from"./react-icons.esm-C3slgq7o.js";import{C as ue,c as be,e as fe,S as ge,b as ye,d as ve,T as we,f as Se}from"./Table-XnNRkLC8.js";import{B as te}from"./Box-CsPUZVXZ.js";import{m as xe}from"./modifyVariantsForStory-D3vOGtQO.js";import{U as R}from"./Link-BmXHhRCg.js";import{I as Ce}from"./Image-6SeHXl5T.js";import{B as o}from"./Badge-Bu076I1w.js";import{B as f}from"./Button-ClaIUCuY.js";import{F as _}from"./Flex-jm7nIrzU.js";import{T as P}from"./Text-De0MgKz9.js";import"./extends-CF3RwP-h.js";import"./Label-C-FSa_nZ.js";import"./index-QZw2BAii.js";import"./index-D1_ZHIBm.js";import"./Elevation-CQxWisSY.js";const g=T("div",ue,{display:"table-caption"}),ke=T("div",be,{display:"table-row-group"}),h=l.forwardRef((r,t)=>e(ke,{ref:t,role:"rowgroup",...r})),Be=T("div",fe,{display:"table-footer-group"}),S=l.forwardRef((r,t)=>e(Be,{ref:t,role:"rowgroup",...r})),V=T("div",ge,{display:"table-row"}),_e=T(pe,V),Ae=({isOpen:r,children:t})=>{const c=l.useMemo(()=>r?{transition:"all 0.2s ease-out",paddingBottom:0,paddingTop:0,border:"none"}:{transition:"all 0.2s ease-out",padding:"0px 16px",pointerEvents:"none",border:"none"},[r]),s=l.useMemo(()=>r?{transition:"all 0.2s ease-out",padding:"16px",paddingBottom:0}:{transition:"all 0.2s ease-out",height:0,overflow:"hidden",padding:"0px 16px"},[r]);return e(V,{css:r?{"&:not(:last-child)":{borderBottom:"1px solid $tableRowBorder"}}:{},children:e(n,{css:c,fullColSpan:!0,children:e(te,{css:s,children:t})})})},d=l.forwardRef(({asChild:r,children:t,collapsedContent:c,emptyFirstColumn:s,tableHead:m,css:L,...ie},oe)=>{const le=r?_e:V,[x,ce]=l.useState(!1);if(!r){const u=l.Children.toArray(t);if(u.some(N=>{if(!l.isValidElement(N))return!1;const{fullColSpan:he}=N.props;return!!he})&&u.length>1)throw new Error("Using fullColSpan is allowed only for a single full width Td.")}const F=l.useMemo(()=>s?m?e(i,{css:{width:24}}):e(n,{},"empty-td"):c?e(n,{children:e(te,{onClick:u=>{u.stopPropagation(),u.preventDefault()},children:e(me,{onClick:()=>ce(!x),style:{cursor:"pointer",transition:"transform 0.2s ease-out",transform:x?"rotate(90deg)":"initial"}})})},"chevron-td"):null,[x]),se=l.useMemo(()=>{var u;return r?l.cloneElement(t,{...t==null?void 0:t.props},[F,...(u=t==null?void 0:t.props)==null?void 0:u.children]):a(z,{children:[F,t]})},[r,F,t]);return a(z,{children:[e(le,{ref:oe,role:"row",css:c&&!x?{...L,"&:nth-last-child(2) span":{borderBottom:"none"}}:{...L},...ie,children:se}),!!c&&e(Ae,{isOpen:x,children:c})]})}),De=T("span",ye,{display:"table-cell"}),i=l.forwardRef((r,t)=>e(De,{ref:t,role:"columnheader",...r})),$=T("span",ve,{display:"table-cell"}),Fe=T($,{visibility:"hidden"}),n=l.forwardRef(({fullColSpan:r,css:t,...c},s)=>{const m=l.useMemo(()=>r?{position:"absolute",left:0,width:"100%",height:"100%"}:{},[r]);return r?a(z,{children:[e(Fe,{css:t,...c}),e($,{ref:s,role:"cell",css:Te(m,t),...c})]}):e($,{ref:s,role:"cell",css:t,...c})}),Re=T("div",we,{display:"table-header-group"}),p=l.forwardRef((r,t)=>e(Re,{ref:t,role:"rowgroup",...r})),ze=T("div",Se,{display:"table"}),B=l.forwardRef(({hasCollapsibleChildren:r,css:t,...c},s)=>e(ze,{ref:s,role:"table",css:r?{borderCollapse:"collapse",...t}:t,...c}));try{g.displayName="Caption",g.__docgenInfo={description:"",displayName:"Caption",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:'number | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "0" | "11" | "12" | "inherit" | ({ "@light"?: number | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "0" | "11" | "12" | "inherit"; ... 7 more ...; "@initial"?: number | ... 14 more ...; } & { ...; }) | undef...'}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:'"light" | "regular" | "medium" | "semiBold" | "bold" | ({ "@light"?: "light" | "regular" | "medium" | "semiBold" | "bold"; "@bp1"?: "light" | "regular" | "medium" | "semiBold" | "bold"; ... 6 more ...; "@initial"?: "light" | ... 4 more ... | undefined; } & { ...; }) | undefined'}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'"red" | "inherit" | "default" | "contrast" | "subtle" | "invalid" | ({ "@light"?: "red" | "inherit" | "default" | "contrast" | "subtle" | "invalid"; "@bp1"?: "red" | "inherit" | ... 4 more ...; ... 6 more ...; "@initial"?: "red" | ... 5 more ... | undefined; } & { ...; }) | undefined'}},gradient:{defaultValue:null,description:"",name:"gradient",required:!1,type:{name:'boolean | "true" | ({ "@light"?: boolean | "true"; "@bp1"?: boolean | "true"; "@bp2"?: boolean | "true" | undefined; "@bp3"?: boolean | "true" | undefined; "@bp4"?: boolean | "true" | undefined; "@motion"?: boolean | ... 1 more ... | undefined; "@hover"?: boolean | ... 1 more ... | undefined;...'}},transform:{defaultValue:null,description:"",name:"transform",required:!1,type:{name:'"capitalize" | "uppercase" | "capitalizeWords" | ({ "@light"?: "capitalize" | "uppercase" | "capitalizeWords"; "@bp1"?: "capitalize" | "uppercase" | "capitalizeWords"; ... 6 more ...; "@initial"?: "capitalize" | ... 2 more ... | undefined; } & { ...; }) | undefined'}},noWrap:{defaultValue:null,description:"",name:"noWrap",required:!1,type:{name:'boolean | "true" | ({ "@light"?: boolean | "true"; "@bp1"?: boolean | "true"; "@bp2"?: boolean | "true" | undefined; "@bp3"?: boolean | "true" | undefined; "@bp4"?: boolean | "true" | undefined; "@motion"?: boolean | ... 1 more ... | undefined; "@hover"?: boolean | ... 1 more ... | undefined;...'}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}try{h.displayName="Tbody",h.__docgenInfo={description:"",displayName:"Tbody",props:{css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}try{S.displayName="Tfoot",S.__docgenInfo={description:"",displayName:"Tfoot",props:{css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}try{d.displayName="Tr",d.__docgenInfo={description:"",displayName:"Tr",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}},active:{defaultValue:null,description:"",name:"active",required:!1,type:{name:'boolean | "true" | ({ "@light"?: boolean | "true"; "@bp1"?: boolean | "true"; "@bp2"?: boolean | "true" | undefined; "@bp3"?: boolean | "true" | undefined; "@bp4"?: boolean | "true" | undefined; "@motion"?: boolean | ... 1 more ... | undefined; "@hover"?: boolean | ... 1 more ... | undefined;...'}},interactive:{defaultValue:null,description:"",name:"interactive",required:!1,type:{name:'boolean | "true" | ({ "@light"?: boolean | "true"; "@bp1"?: boolean | "true"; "@bp2"?: boolean | "true" | undefined; "@bp3"?: boolean | "true" | undefined; "@bp4"?: boolean | "true" | undefined; "@motion"?: boolean | ... 1 more ... | undefined; "@hover"?: boolean | ... 1 more ... | undefined;...'}},collapsedContent:{defaultValue:null,description:"",name:"collapsedContent",required:!1,type:{name:"ReactNode"}},emptyFirstColumn:{defaultValue:null,description:"",name:"emptyFirstColumn",required:!1,type:{name:"boolean"}},tableHead:{defaultValue:null,description:"",name:"tableHead",required:!1,type:{name:"boolean"}}}}}catch{}try{i.displayName="Th",i.__docgenInfo={description:"",displayName:"Th",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:'number | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "0" | "11" | "12" | "inherit" | ({ "@light"?: number | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "0" | "11" | "12" | "inherit"; ... 7 more ...; "@initial"?: number | ... 14 more ...; } & { ...; }) | undef...'}},transform:{defaultValue:null,description:"",name:"transform",required:!1,type:{name:'"capitalize" | ({ "@light"?: "capitalize"; "@bp1"?: "capitalize"; "@bp2"?: "capitalize" | undefined; "@bp3"?: "capitalize" | undefined; "@bp4"?: "capitalize" | undefined; "@motion"?: "capitalize" | undefined; "@hover"?: "capitalize" | undefined; "@dark"?: "capitalize" | undefined; "@initial"?...'}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:'"light" | "regular" | "medium" | "semiBold" | "bold" | ({ "@light"?: "light" | "regular" | "medium" | "semiBold" | "bold"; "@bp1"?: "light" | "regular" | "medium" | "semiBold" | "bold"; ... 6 more ...; "@initial"?: "light" | ... 4 more ... | undefined; } & { ...; }) | undefined'}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}},align:{defaultValue:null,description:"",name:"align",required:!1,type:{name:'"center" | "end" | "start" | ({ "@light"?: "center" | "end" | "start"; "@bp1"?: "center" | "end" | "start"; "@bp2"?: "center" | "end" | "start" | undefined; "@bp3"?: "center" | ... 2 more ... | undefined; ... 4 more ...; "@initial"?: "center" | ... 2 more ... | undefined; } & { ...; }) | unde...'}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'"red" | "inherit" | "default" | "contrast" | "subtle" | "invalid" | ({ "@light"?: "red" | "inherit" | "default" | "contrast" | "subtle" | "invalid"; "@bp1"?: "red" | "inherit" | ... 4 more ...; ... 6 more ...; "@initial"?: "red" | ... 5 more ... | undefined; } & { ...; }) | undefined'}},gradient:{defaultValue:null,description:"",name:"gradient",required:!1,type:{name:'boolean | "true" | ({ "@light"?: boolean | "true"; "@bp1"?: boolean | "true"; "@bp2"?: boolean | "true" | undefined; "@bp3"?: boolean | "true" | undefined; "@bp4"?: boolean | "true" | undefined; "@motion"?: boolean | ... 1 more ... | undefined; "@hover"?: boolean | ... 1 more ... | undefined;...'}},noWrap:{defaultValue:null,description:"",name:"noWrap",required:!1,type:{name:'boolean | "true" | ({ "@light"?: boolean | "true"; "@bp1"?: boolean | "true"; "@bp2"?: boolean | "true" | undefined; "@bp3"?: boolean | "true" | undefined; "@bp4"?: boolean | "true" | undefined; "@motion"?: boolean | ... 1 more ... | undefined; "@hover"?: boolean | ... 1 more ... | undefined;...'}}}}}catch{}try{n.displayName="Td",n.__docgenInfo={description:"",displayName:"Td",props:{css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}},align:{defaultValue:null,description:"",name:"align",required:!1,type:{name:'"center" | "end" | "start" | ({ "@light"?: "center" | "end" | "start"; "@bp1"?: "center" | "end" | "start"; "@bp2"?: "center" | "end" | "start" | undefined; "@bp3"?: "center" | ... 2 more ... | undefined; ... 4 more ...; "@initial"?: "center" | ... 2 more ... | undefined; } & { ...; }) | unde...'}},subtle:{defaultValue:null,description:"",name:"subtle",required:!1,type:{name:'boolean | "true" | ({ "@light"?: boolean | "true"; "@bp1"?: boolean | "true"; "@bp2"?: boolean | "true" | undefined; "@bp3"?: boolean | "true" | undefined; "@bp4"?: boolean | "true" | undefined; "@motion"?: boolean | ... 1 more ... | undefined; "@hover"?: boolean | ... 1 more ... | undefined;...'}},fullColSpan:{defaultValue:null,description:"",name:"fullColSpan",required:!1,type:{name:"boolean"}}}}}catch{}try{p.displayName="Thead",p.__docgenInfo={description:"",displayName:"Thead",props:{css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}try{B.displayName="Table",B.__docgenInfo={description:"",displayName:"Table",props:{css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}},elevation:{defaultValue:null,description:"",name:"elevation",required:!1,type:{name:'number | `${number}` | ({ "@light"?: number | `${number}`; "@bp1"?: number | `${number}`; "@bp2"?: number | `${number}` | undefined; "@bp3"?: number | `${number}` | undefined; "@bp4"?: number | ... 1 more ... | undefined; "@motion"?: number | ... 1 more ... | undefined; "@hover"?: number | .....'}},hasCollapsibleChildren:{defaultValue:null,description:"",name:"hasCollapsibleChildren",required:!1,type:{name:"boolean"}}}}}catch{}const $e=r=>e(B,{...r}),b=xe($e),rn={title:"Components/AriaTable",component:b},y=({transform:r,...t})=>a(b,{"aria-label":"People","aria-describedby":"basic-table-caption",...t,children:[e(g,{id:"basic-table-caption",size:"10",children:"People with some information"}),e(p,{children:a(d,{children:[e(i,{transform:r,children:"first name"}),e(i,{transform:r,children:"last name"}),e(i,{transform:r,children:"Status"}),e(i,{transform:r,children:"Role"})]})}),a(h,{children:[a(d,{children:[e(n,{children:"John"}),e(n,{children:"Doe"}),e(n,{children:e(o,{variant:"green",children:"Connected"})}),e(n,{children:"Developer"})]}),a(d,{children:[e(n,{children:"Johny"}),e(n,{children:"Depp"}),e(n,{children:e(o,{variant:"orange",children:"AFK"})}),e(n,{children:"Actor"})]}),a(d,{children:[e(n,{children:"Natalie"}),e(n,{children:"Portman"}),e(n,{children:e(o,{variant:"green",children:"Connected"})}),e(n,{children:"Actor"})]}),a(d,{children:[e(n,{children:"Luke"}),e(n,{children:"Skywalker"}),e(n,{children:e(o,{variant:"red",children:"Disconnected"})}),e(n,{children:"Star wars"})]})]}),e(S,{children:e(d,{children:e(n,{fullColSpan:!0,"aria-colspan":4,css:{textAlign:"center"},children:e(f,{ghost:!0,variant:"secondary",css:{fontSize:"$1",height:"$5",boxShadow:"none"},children:"Load more..."})})})})]});y.args={transform:"capitalize"};y.argTypes={transform:{control:"inline-radio",options:["capitalize","capitalizeWords","uppercase","none"],mapping:{capitalize:"capitalize",capitalizeWords:"capitalizeWords",uppercase:"uppercase",none:""}}};const v=r=>a(b,{children:[e(p,{children:a(d,{children:[e(i,{...r,children:"Firstname"}),e(i,{...r,children:"Lastname"}),e(i,{...r,children:"Status"}),e(i,{...r,children:"Role"})]})}),a(h,{children:[a(d,{children:[e(n,{...r,children:"John"}),e(n,{...r,children:"Doe"}),e(n,{...r,children:e(o,{variant:"green",children:"Connected"})}),e(n,{...r,children:"Developer"})]}),a(d,{children:[e(n,{...r,children:"Johny"}),e(n,{...r,children:"Depp"}),e(n,{...r,children:e(o,{variant:"orange",children:"AFK"})}),e(n,{...r,children:"Actor"})]}),a(d,{children:[e(n,{...r,children:"Natalie"}),e(n,{...r,children:"Portman"}),e(n,{...r,children:e(o,{variant:"green",children:"Connected"})}),e(n,{...r,children:"Actor"})]}),a(d,{children:[e(n,{...r,children:"Luke"}),e(n,{...r,children:"Skywalker"}),e(n,{...r,children:e(o,{variant:"red",children:"Disconnected"})}),e(n,{...r,children:"Star wars"})]})]})]});v.argTypes={align:{control:"inline-radio",options:["start","center","end"]}};v.args={align:"start"};const C=r=>{const[t,c]=l.useState(3),s=l.useCallback(m=>({active:t===m,onClick:()=>c(m)}),[t,c]);return a(b,{children:[e(p,{children:a(d,{children:[e(i,{children:"Firstname"}),e(i,{children:"Lastname"}),e(i,{children:"Status"}),e(i,{children:"Role"})]})}),a(h,{children:[a(d,{...r,...s(1),children:[e(n,{children:"John"}),e(n,{children:"Doe"}),e(n,{children:e(o,{variant:"green",children:"Connected"})}),e(n,{children:"Developer"})]}),a(d,{...r,...s(2),children:[e(n,{children:"Johny"}),e(n,{children:"Depp"}),e(n,{children:e(o,{variant:"orange",children:"AFK"})}),e(n,{children:"Actor"})]}),a(d,{...r,...s(3),children:[e(n,{children:"Natalie"}),e(n,{children:"Portman"}),e(n,{children:e(o,{variant:"green",children:"Connected"})}),e(n,{children:"Actor"})]}),a(d,{...r,...s(4),children:[e(n,{children:"Luke"}),e(n,{children:"Skywalker"}),e(n,{children:e(o,{variant:"red",children:"Disconnected"})}),e(n,{children:"Star Wars"})]})]})]})};C.args={interactive:!0};const A=r=>a(B,{hasCollapsibleChildren:!0,"aria-label":"Empty","aria-describedby":"empty-table-caption",...r,children:[e(g,{id:"empty-table-caption",children:"Table with empty data"}),e(p,{children:a(d,{emptyFirstColumn:!0,tableHead:!0,children:[e(i,{children:"first name"}),e(i,{children:"last name"}),e(i,{children:"Status"}),e(i,{children:"Role"})]})}),a(h,{children:[e(d,{interactive:!0,asChild:!0,collapsedContent:e(_,{children:e(P,{children:"Additional description for this row."})}),children:a(R,{href:"https://traefik.io",target:"_blank",children:[e(n,{children:"Johnny"}),e(n,{children:"Depp"}),e(n,{children:e(o,{variant:"green",children:"Connected"})}),e(n,{children:"Developer"})]})}),e(d,{emptyFirstColumn:!0,interactive:!0,asChild:!0,children:a(R,{href:"https://traefik.io",target:"_blank",children:[e(n,{children:"John"}),e(n,{children:"Doe"}),e(n,{children:e(o,{variant:"green",children:"Connected"})}),e(n,{children:"Admin"})]})}),e(d,{interactive:!0,asChild:!0,collapsedContent:e(w,{}),children:a(R,{href:"https://traefik.io",target:"_blank",children:[e(n,{children:"Natalie"}),e(n,{children:"Portman"}),e(n,{children:e(o,{variant:"red",children:"Offline"})}),e(n,{children:"Developer"})]})})]})]}),D=({transform:r,...t})=>a(_,{direction:"column",gap:"4",children:[a(b,{"aria-label":"People","aria-describedby":"basic-table-caption",...t,children:[e(g,{size:"10",id:"basic-table-caption",children:"People with some information"}),e(p,{children:a(d,{children:[e(i,{transform:r,children:"first name"}),e(i,{transform:r,children:"last name"}),e(i,{transform:r,children:"Status"}),e(i,{transform:r,children:"Role"})]})}),a(h,{children:[a(d,{children:[e(n,{children:"John"}),e(n,{children:"Doe"}),e(n,{children:e(o,{variant:"green",children:"Connected"})}),e(n,{children:"Developer"})]}),a(d,{children:[e(n,{children:"Johny"}),e(n,{children:"Depp"}),e(n,{children:e(o,{variant:"orange",children:"AFK"})}),e(n,{children:"Actor"})]}),a(d,{children:[e(n,{children:"Natalie"}),e(n,{children:"Portman"}),e(n,{children:e(o,{variant:"green",children:"Connected"})}),e(n,{children:"Actor"})]}),a(d,{children:[e(n,{children:"Luke"}),e(n,{children:"Skywalker"}),e(n,{children:e(o,{variant:"red",children:"Disconnected"})}),e(n,{children:"Star wars"})]})]}),e(S,{children:e(d,{children:e(n,{fullColSpan:!0,"aria-colspan":4,css:{textAlign:"center"},children:e(f,{ghost:!0,variant:"secondary",css:{fontSize:"$1",height:"$5",boxShadow:"none"},children:"Load more..."})})})})]}),a(b,{"aria-label":"People","aria-describedby":"basic-table-caption",...t,children:[e(g,{size:"10",id:"basic-table-caption",children:"People with some information"}),e(p,{children:a(d,{children:[e(i,{transform:r,children:"first name"}),e(i,{transform:r,children:"last name"}),e(i,{transform:r,children:"Status"}),e(i,{transform:r,children:"Role"})]})}),a(h,{children:[a(d,{children:[e(n,{children:"John"}),e(n,{children:"Doe"}),e(n,{children:e(o,{variant:"green",children:"Connected"})}),e(n,{children:"Developer"})]}),a(d,{children:[e(n,{children:"Johny"}),e(n,{children:"Depp"}),e(n,{children:e(o,{variant:"orange",children:"AFK"})}),e(n,{children:"Actor"})]}),a(d,{children:[e(n,{children:"Natalie"}),e(n,{children:"Portman"}),e(n,{children:e(o,{variant:"green",children:"Connected"})}),e(n,{children:"Actor"})]}),a(d,{children:[e(n,{children:"Luke"}),e(n,{children:"Skywalker"}),e(n,{children:e(o,{variant:"red",children:"Disconnected"})}),e(n,{children:"Star wars"})]})]}),e(S,{children:a(d,{children:[e(n,{css:{textAlign:"left"},children:e(f,{ghost:!0,variant:"secondary",css:{fontSize:"$1",height:"$5",boxShadow:"none"},children:"One"})}),e(n,{css:{textAlign:"left"},children:e(f,{ghost:!0,variant:"secondary",css:{fontSize:"$1",height:"$5",boxShadow:"none"},children:"Two"})}),e(n,{css:{textAlign:"left"},children:e(f,{ghost:!0,variant:"secondary",css:{fontSize:"$1",height:"$5",boxShadow:"none"},children:"Three"})}),e(n,{css:{textAlign:"left"},children:e(f,{ghost:!0,variant:"secondary",css:{fontSize:"$1",height:"$5",boxShadow:"none"},children:"Four"})})]})})]}),a(b,{css:{tableLayout:"auto"},"aria-label":"People","aria-describedby":"basic-table-caption",...t,children:[e(g,{size:"10",id:"basic-table-caption",children:"People with some information"}),e(p,{children:a(d,{children:[e(i,{transform:r,children:"first name"}),e(i,{transform:r,children:"last name"}),e(i,{transform:r,children:"Status"}),e(i,{transform:r,children:"Role"})]})}),a(h,{children:[a(d,{children:[e(n,{children:"John"}),e(n,{children:"Doe"}),e(n,{children:e(o,{variant:"green",children:"Connected"})}),e(n,{children:"Developer"})]}),a(d,{children:[e(n,{children:"Johny"}),e(n,{children:"Depp"}),e(n,{children:e(o,{variant:"orange",children:"AFK"})}),e(n,{children:"Actor"})]}),a(d,{children:[e(n,{children:"Natalie"}),e(n,{children:"Portman"}),e(n,{children:e(o,{variant:"green",children:"Connected"})}),e(n,{children:"Actor"})]}),a(d,{children:[e(n,{children:"Luke"}),e(n,{children:"Skywalker"}),e(n,{children:e(o,{variant:"red",children:"Disconnected"})}),e(n,{children:"Star wars"})]})]}),e(S,{children:e(d,{children:e(n,{fullColSpan:!0,"aria-colspan":4,css:{textAlign:"center"},children:e(f,{ghost:!0,variant:"secondary",css:{fontSize:"$1",height:"$5",boxShadow:"none"},children:"Load more..."})})})})]})]}),Pe=()=>e(_,{align:"center",justify:"center",children:e(Ce,{src:"https://picsum.photos/38/38"})}),w=r=>a(b,{children:[e(p,{children:a(d,{children:[e(i,{children:"Flex issue column"}),e(i,{children:"Column"})]})}),e(h,{children:a(d,{children:[e(n,{children:e(Pe,{})}),e(n,{children:e(_,{align:"center",justify:"center",children:e(P,{children:"Cell"})})})]})})]}),k=r=>{const[t,c]=l.useState(3),s=l.useCallback(m=>({active:t===m,onClick:()=>c(m)}),[t,c]);return a(B,{hasCollapsibleChildren:!0,children:[e(p,{children:a(d,{emptyFirstColumn:!0,tableHead:!0,children:[e(i,{children:"Firstname"}),e(i,{children:"Lastname"}),e(i,{children:"Status"}),e(i,{children:"Role"})]})}),a(h,{children:[a(d,{emptyFirstColumn:!0,...s(1),...r,children:[e(n,{children:"John"}),e(n,{children:"Doe"}),e(n,{children:e(o,{variant:"green",children:"Connected"})}),e(n,{children:"Developer"})]}),a(d,{collapsedContent:e(_,{children:e(P,{children:"Additional description."})}),...s(2),...r,children:[e(n,{children:"Johny"}),e(n,{children:"Depp"}),e(n,{children:e(o,{variant:"orange",children:"AFK"})}),e(n,{children:"Actor"})]}),a(d,{collapsedContent:e(w,{}),...r,...s(3),children:[e(n,{children:"Natalie"}),e(n,{children:"Portman"}),e(n,{children:e(o,{variant:"green",children:"Connected"})}),e(n,{children:"Actor"})]})]})]})};k.args={interactive:!0};var q,J,I;y.parameters={...y.parameters,docs:{...(q=y.parameters)==null?void 0:q.docs,source:{originalSource:`({
  transform,
  ...args
}) => <TableForStory aria-label="People" aria-describedby="basic-table-caption" {...args}>
    <Caption id="basic-table-caption" size="10">
      People with some information
    </Caption>
    <Thead>
      <Tr>
        <Th transform={transform}>first name</Th>
        <Th transform={transform}>last name</Th>
        <Th transform={transform}>Status</Th>
        <Th transform={transform}>Role</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>John</Td>
        <Td>Doe</Td>
        <Td>
          <Badge variant="green">Connected</Badge>
        </Td>
        <Td>Developer</Td>
      </Tr>
      <Tr>
        <Td>Johny</Td>
        <Td>Depp</Td>
        <Td>
          <Badge variant="orange">AFK</Badge>
        </Td>
        <Td>Actor</Td>
      </Tr>
      <Tr>
        <Td>Natalie</Td>
        <Td>Portman</Td>
        <Td>
          <Badge variant="green">Connected</Badge>
        </Td>
        <Td>Actor</Td>
      </Tr>
      <Tr>
        <Td>Luke</Td>
        <Td>Skywalker</Td>
        <Td>
          <Badge variant="red">Disconnected</Badge>
        </Td>
        <Td>Star wars</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Td fullColSpan aria-colspan={4} css={{
        textAlign: 'center'
      }}>
          <Button ghost variant="secondary" css={{
          fontSize: '$1',
          height: '$5',
          boxShadow: 'none'
        }}>
            Load more...
          </Button>
        </Td>
      </Tr>
    </Tfoot>
  </TableForStory>`,...(I=(J=y.parameters)==null?void 0:J.docs)==null?void 0:I.source}}};var K,W,E;v.parameters={...v.parameters,docs:{...(K=v.parameters)==null?void 0:K.docs,source:{originalSource:`args => <TableForStory>
    <Thead>
      <Tr>
        <Th {...args}>Firstname</Th>
        <Th {...args}>Lastname</Th>
        <Th {...args}>Status</Th>
        <Th {...args}>Role</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td {...args}>John</Td>
        <Td {...args}>Doe</Td>
        <Td {...args}>
          <Badge variant="green">Connected</Badge>
        </Td>
        <Td {...args}>Developer</Td>
      </Tr>
      <Tr>
        <Td {...args}>Johny</Td>
        <Td {...args}>Depp</Td>
        <Td {...args}>
          <Badge variant="orange">AFK</Badge>
        </Td>
        <Td {...args}>Actor</Td>
      </Tr>
      <Tr>
        <Td {...args}>Natalie</Td>
        <Td {...args}>Portman</Td>
        <Td {...args}>
          <Badge variant="green">Connected</Badge>
        </Td>
        <Td {...args}>Actor</Td>
      </Tr>
      <Tr>
        <Td {...args}>Luke</Td>
        <Td {...args}>Skywalker</Td>
        <Td {...args}>
          <Badge variant="red">Disconnected</Badge>
        </Td>
        <Td {...args}>Star wars</Td>
      </Tr>
    </Tbody>
  </TableForStory>`,...(E=(W=v.parameters)==null?void 0:W.docs)==null?void 0:E.source}}};var U,H,j;C.parameters={...C.parameters,docs:{...(U=C.parameters)==null?void 0:U.docs,source:{originalSource:`args => {
  const [selectedRow, setSelectedRow] = useState(3);
  const makeSelectableRowProps = useCallback((rowNum: number) => ({
    active: selectedRow === rowNum,
    onClick: () => setSelectedRow(rowNum)
  }), [selectedRow, setSelectedRow]);
  return <TableForStory>
      <Thead>
        <Tr>
          <Th>Firstname</Th>
          <Th>Lastname</Th>
          <Th>Status</Th>
          <Th>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr {...args} {...makeSelectableRowProps(1)}>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </Tr>
        <Tr {...args} {...makeSelectableRowProps(2)}>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr {...args} {...makeSelectableRowProps(3)}>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr {...args} {...makeSelectableRowProps(4)}>
          <Td>Luke</Td>
          <Td>Skywalker</Td>
          <Td>
            <Badge variant="red">Disconnected</Badge>
          </Td>
          <Td>Star Wars</Td>
        </Tr>
      </Tbody>
    </TableForStory>;
}`,...(j=(H=C.parameters)==null?void 0:H.docs)==null?void 0:j.source}}};var M,O,G;A.parameters={...A.parameters,docs:{...(M=A.parameters)==null?void 0:M.docs,source:{originalSource:`args => <Table hasCollapsibleChildren aria-label="Empty" aria-describedby="empty-table-caption" {...args}>
    <Caption id="empty-table-caption">Table with empty data</Caption>
    <Thead>
      <Tr emptyFirstColumn tableHead>
        <Th>first name</Th>
        <Th>last name</Th>
        <Th>Status</Th>
        <Th>Role</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr interactive asChild collapsedContent={<Flex>
            <Text>Additional description for this row.</Text>
          </Flex>}>
        <UnstyledLink href="https://traefik.io" target="_blank">
          <Td>Johnny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </UnstyledLink>
      </Tr>
      <Tr emptyFirstColumn interactive asChild>
        <UnstyledLink href="https://traefik.io" target="_blank">
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Admin</Td>
        </UnstyledLink>
      </Tr>
      <Tr interactive asChild collapsedContent={<VerticalAlignment />}>
        <UnstyledLink href="https://traefik.io" target="_blank">
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="red">Offline</Badge>
          </Td>
          <Td>Developer</Td>
        </UnstyledLink>
      </Tr>
    </Tbody>
  </Table>`,...(G=(O=A.parameters)==null?void 0:O.docs)==null?void 0:G.source}}};var Q,X,Y;D.parameters={...D.parameters,docs:{...(Q=D.parameters)==null?void 0:Q.docs,source:{originalSource:`({
  transform,
  ...args
}) => <Flex direction="column" gap="4">
    <TableForStory aria-label="People" aria-describedby="basic-table-caption" {...args}>
      <Caption size="10" id="basic-table-caption">
        People with some information
      </Caption>
      <Thead>
        <Tr>
          <Th transform={transform}>first name</Th>
          <Th transform={transform}>last name</Th>
          <Th transform={transform}>Status</Th>
          <Th transform={transform}>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </Tr>
        <Tr>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Luke</Td>
          <Td>Skywalker</Td>
          <Td>
            <Badge variant="red">Disconnected</Badge>
          </Td>
          <Td>Star wars</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Td fullColSpan aria-colspan={4} css={{
          textAlign: 'center'
        }}>
            <Button ghost variant="secondary" css={{
            fontSize: '$1',
            height: '$5',
            boxShadow: 'none'
          }}>
              Load more...
            </Button>
          </Td>
        </Tr>
      </Tfoot>
    </TableForStory>
    <TableForStory aria-label="People" aria-describedby="basic-table-caption" {...args}>
      <Caption size="10" id="basic-table-caption">
        People with some information
      </Caption>
      <Thead>
        <Tr>
          <Th transform={transform}>first name</Th>
          <Th transform={transform}>last name</Th>
          <Th transform={transform}>Status</Th>
          <Th transform={transform}>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </Tr>
        <Tr>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Luke</Td>
          <Td>Skywalker</Td>
          <Td>
            <Badge variant="red">Disconnected</Badge>
          </Td>
          <Td>Star wars</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Td css={{
          textAlign: 'left'
        }}>
            <Button ghost variant="secondary" css={{
            fontSize: '$1',
            height: '$5',
            boxShadow: 'none'
          }}>
              One
            </Button>
          </Td>
          <Td css={{
          textAlign: 'left'
        }}>
            <Button ghost variant="secondary" css={{
            fontSize: '$1',
            height: '$5',
            boxShadow: 'none'
          }}>
              Two
            </Button>
          </Td>
          <Td css={{
          textAlign: 'left'
        }}>
            <Button ghost variant="secondary" css={{
            fontSize: '$1',
            height: '$5',
            boxShadow: 'none'
          }}>
              Three
            </Button>
          </Td>
          <Td css={{
          textAlign: 'left'
        }}>
            <Button ghost variant="secondary" css={{
            fontSize: '$1',
            height: '$5',
            boxShadow: 'none'
          }}>
              Four
            </Button>
          </Td>
        </Tr>
      </Tfoot>
    </TableForStory>
    <TableForStory css={{
    tableLayout: 'auto'
  }} aria-label="People" aria-describedby="basic-table-caption" {...args}>
      <Caption size="10" id="basic-table-caption">
        People with some information
      </Caption>
      <Thead>
        <Tr>
          <Th transform={transform}>first name</Th>
          <Th transform={transform}>last name</Th>
          <Th transform={transform}>Status</Th>
          <Th transform={transform}>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </Tr>
        <Tr>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr>
          <Td>Luke</Td>
          <Td>Skywalker</Td>
          <Td>
            <Badge variant="red">Disconnected</Badge>
          </Td>
          <Td>Star wars</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Td fullColSpan aria-colspan={4} css={{
          textAlign: 'center'
        }}>
            <Button ghost variant="secondary" css={{
            fontSize: '$1',
            height: '$5',
            boxShadow: 'none'
          }}>
              Load more...
            </Button>
          </Td>
        </Tr>
      </Tfoot>
    </TableForStory>
  </Flex>`,...(Y=(X=D.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,ne;w.parameters={...w.parameters,docs:{...(Z=w.parameters)==null?void 0:Z.docs,source:{originalSource:`args => <TableForStory>
    <Thead>
      <Tr>
        <Th>Flex issue column</Th>
        <Th>Column</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>
          <FlexIssue />
        </Td>
        <Td>
          <Flex align="center" justify="center">
            <Text>Cell</Text>
          </Flex>
        </Td>
      </Tr>
    </Tbody>
  </TableForStory>`,...(ne=(ee=w.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var re,ae,de;k.parameters={...k.parameters,docs:{...(re=k.parameters)==null?void 0:re.docs,source:{originalSource:`args => {
  const [selectedRow, setSelectedRow] = useState(3);
  const makeSelectableRowProps = useCallback((rowNum: number) => ({
    active: selectedRow === rowNum,
    onClick: () => setSelectedRow(rowNum)
  }), [selectedRow, setSelectedRow]);
  return <Table hasCollapsibleChildren>
      <Thead>
        <Tr emptyFirstColumn tableHead>
          <Th>Firstname</Th>
          <Th>Lastname</Th>
          <Th>Status</Th>
          <Th>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr emptyFirstColumn {...makeSelectableRowProps(1)} {...args}>
          <Td>John</Td>
          <Td>Doe</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Developer</Td>
        </Tr>
        <Tr collapsedContent={<Flex>
              <Text>Additional description.</Text>
            </Flex>} {...makeSelectableRowProps(2)} {...args}>
          <Td>Johny</Td>
          <Td>Depp</Td>
          <Td>
            <Badge variant="orange">AFK</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
        <Tr collapsedContent={<VerticalAlignment />} {...args} {...makeSelectableRowProps(3)}>
          <Td>Natalie</Td>
          <Td>Portman</Td>
          <Td>
            <Badge variant="green">Connected</Badge>
          </Td>
          <Td>Actor</Td>
        </Tr>
      </Tbody>
    </Table>;
}`,...(de=(ae=k.parameters)==null?void 0:ae.docs)==null?void 0:de.source}}};const an=["Basic","Alignment","Interactive","Links","Columns","VerticalAlignment","CollapsibleRow"];export{v as Alignment,y as Basic,k as CollapsibleRow,D as Columns,C as Interactive,A as Links,w as VerticalAlignment,an as __namedExportsOrder,rn as default};
