import{j as i}from"./jsx-runtime-WuQMLw89.js";import{R as m,r as p}from"./index-Dl6G-zuu.js";import{s as d,k as c}from"./stitches.config-CKE6G7UO.js";import{m as b}from"./modifyVariantsForStory-D3vOGtQO.js";import{b as f}from"./index-Cy-whKHn.js";const g={appearance:"none",userSelect:"none",boxSizing:"border-box",border:"none",WebkitTapHighlightColor:"rgba(0,0,0,0)","&:disabled":{pointerEvents:"none",opacity:.5}},h={small:"$sizes$8",medium:"$sizes$9",large:"$sizes$10"},n=e=>({$$bgSize:h[e],backgroundSize:"$$bgSize",backgroundImage:`linear-gradient(
            -45deg,
            transparent 33%,
            $colors$deepBlue4 33%,
            $colors$deepBlue4 66%,
            transparent 66%
          )`,animation:`${c({"100%":{transform:"translateX($$bgSize)"}})} 500ms linear infinite`}),a=d("button",g,{all:"unset",alignItems:"center",overflow:"hidden","&::before":{boxSizing:"border-box",content:'""',position:"absolute",inset:0},"&::after":{boxSizing:"border-box",content:'""',position:"absolute",inset:0},display:"inline-flex",flexShrink:0,justifyContent:"center",lineHeight:"1",position:"relative",height:"$5",px:"$2",fontFamily:"$rubik",fontSize:"$3",fontWeight:"$medium",fontVariantNumeric:"tabular-nums","&:focus-visible":{boxShadow:"inset 0 0 0 2px $colors$focusOutline","&::before":{backgroundColor:"rgba(255, 255, 255, 0.15)"},"&::after":{opacity:.15}},"@hover":{"&:hover":{cursor:"pointer","&::before":{backgroundColor:"rgba(255, 255, 255, 0.15)"},"&::after":{opacity:.05}}},"&:active":{"&::before":{backgroundColor:"rgba(0, 0, 0, 0.15)"}},variants:{size:{small:{borderRadius:"$3",height:"$5",px:"$2",fontSize:"$1",lineHeight:"$sizes$5"},medium:{borderRadius:"$3",height:"$6",px:"$3",fontSize:"$3",lineHeight:"$sizes$6"},large:{borderRadius:"$3",height:"$7",px:"$3",fontSize:"$3",lineHeight:"$sizes$7"}},variant:{primary:{bc:"$primary",c:"$buttonPrimaryText","&:focus-visible":{boxShadow:"inset 0 0 0 2px $colors$buttonPrimaryFocusBorder"},"@hover":{"&:hover":{"&::after":{backgroundColor:"$primary"}}}},secondary:{bc:"$buttonSecondaryBg",c:"$buttonSecondaryText",boxShadow:"inset 0 0 0 2px $colors$buttonSecondaryBorder","&:active":{boxShadow:"inset 0 0 0 1px $colors$buttonSecondaryBorder"},"&:focus-visible":{boxShadow:"inset 0 0 0 2px $colors$buttonSecondaryFocusBorder"},"@hover":{"&:hover":{"&::after":{backgroundColor:"$primary"}}}},red:{backgroundColor:"$buttonRedBg",color:"$buttonRedText","&:focus-visible":{boxShadow:"inset 0 0 0 2px $colors$buttonRedFocusBg"}}},state:{active:{bc:"$deepBlue5",c:"$deepBlue11","&:active":{backgroundColor:"$deepBlue5"}},waiting:{bc:"$deepBlue3",boxShadow:"inset 0 0 0 1px $deepBlue4",c:"transparent",overflow:"hidden",pointerEvents:"none","&::after":{left:"-100%",width:"200%",...n("medium")}}},ghost:{true:{boxShadow:"none","@hover":{"&:hover":{boxShadow:"none"}}}},rounded:{true:{borderRadius:"$pill"}}},compoundVariants:[{variant:"primary",ghost:"true",css:{color:"$primary",backgroundColor:"transparent","@hover":{"&:hover":{color:"$buttonPrimaryGhostHoverText",backgroundColor:"transparent"}}}},{variant:"secondary",state:"waiting",css:{backgroundColor:"$deepBlue3",color:"transparent"}},{variant:"secondary",state:"active",css:{backgroundColor:"$buttonPrimaryBg",color:"$buttonPrimaryText"}},{variant:"red",state:"waiting",css:{backgroundColor:"$deepBlue3",color:"transparent"}},{variant:"red",ghost:"true",css:{color:"$buttonRedBg",backgroundColor:"transparent","@hover":{"&:hover":{color:"$buttonRedHoverText",backgroundColor:"transparent"}}}},{size:"small",state:"waiting",css:{"&::after":n("small")}},{size:"large",state:"waiting",css:{"&::after":n("large")}}],defaultVariants:{size:"medium",variant:"primary"}}),y=d(f,a),r=m.forwardRef(({children:e,asChild:t,...l},u)=>{const s=p.useMemo(()=>t?y:a,[t]);return i(s,{ref:u,...l,children:e})}),$=e=>i(r,{...e}),o=b($);try{a.displayName="StyledButton",a.__docgenInfo={description:"",displayName:"StyledButton",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:'"medium" | "large" | "small" | ({ "@light"?: "medium" | "large" | "small"; "@bp1"?: "medium" | "large" | "small"; "@bp2"?: "medium" | "large" | "small" | undefined; ... 5 more ...; "@initial"?: "medium" | ... 2 more ... | undefined; } & { ...; }) | undefined'}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'"red" | "primary" | "secondary" | ({ "@light"?: "red" | "primary" | "secondary"; "@bp1"?: "red" | "primary" | "secondary"; "@bp2"?: "red" | "primary" | "secondary" | undefined; ... 5 more ...; "@initial"?: "red" | ... 2 more ... | undefined; } & { ...; }) | undefined'}},state:{defaultValue:null,description:"",name:"state",required:!1,type:{name:'"active" | "waiting" | ({ "@light"?: "active" | "waiting"; "@bp1"?: "active" | "waiting"; "@bp2"?: "active" | "waiting" | undefined; "@bp3"?: "active" | "waiting" | undefined; ... 4 more ...; "@initial"?: "active" | ... 1 more ... | undefined; } & { ...; }) | undefined'}},ghost:{defaultValue:null,description:"",name:"ghost",required:!1,type:{name:'boolean | "true" | ({ "@light"?: boolean | "true"; "@bp1"?: boolean | "true"; "@bp2"?: boolean | "true" | undefined; "@bp3"?: boolean | "true" | undefined; "@bp4"?: boolean | "true" | undefined; "@motion"?: boolean | ... 1 more ... | undefined; "@hover"?: boolean | ... 1 more ... | undefined;...'}},rounded:{defaultValue:null,description:"",name:"rounded",required:!1,type:{name:'boolean | "true" | ({ "@light"?: boolean | "true"; "@bp1"?: boolean | "true"; "@bp2"?: boolean | "true" | undefined; "@bp3"?: boolean | "true" | undefined; "@bp4"?: boolean | "true" | undefined; "@motion"?: boolean | ... 1 more ... | undefined; "@hover"?: boolean | ... 1 more ... | undefined;...'}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}}}}}catch{}try{r.displayName="Button",r.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:'"medium" | "large" | "small" | ({ "@light"?: "medium" | "large" | "small"; "@bp1"?: "medium" | "large" | "small"; "@bp2"?: "medium" | "large" | "small" | undefined; ... 5 more ...; "@initial"?: "medium" | ... 2 more ... | undefined; } & { ...; }) | undefined'}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"string"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'"red" | "primary" | "secondary" | ({ "@light"?: "red" | "primary" | "secondary"; "@bp1"?: "red" | "primary" | "secondary"; "@bp2"?: "red" | "primary" | "secondary" | undefined; ... 5 more ...; "@initial"?: "red" | ... 2 more ... | undefined; } & { ...; }) | undefined'}},ghost:{defaultValue:null,description:"",name:"ghost",required:!1,type:{name:'boolean | "true" | ({ "@light"?: boolean | "true"; "@bp1"?: boolean | "true"; "@bp2"?: boolean | "true" | undefined; "@bp3"?: boolean | "true" | undefined; "@bp4"?: boolean | "true" | undefined; "@motion"?: boolean | ... 1 more ... | undefined; "@hover"?: boolean | ... 1 more ... | undefined;...'}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ prefix: ""; media: { bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; ... 4 more ...; light: "(prefers-color-scheme: light)"; }; theme: { ...; }; themeMap: DefaultThemeMap; utils: { ...; }; }>'}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},state:{defaultValue:null,description:"",name:"state",required:!1,type:{name:'"active" | "waiting" | ({ "@light"?: "active" | "waiting"; "@bp1"?: "active" | "waiting"; "@bp2"?: "active" | "waiting" | undefined; "@bp3"?: "active" | "waiting" | undefined; ... 4 more ...; "@initial"?: "active" | ... 1 more ... | undefined; } & { ...; }) | undefined'}},rounded:{defaultValue:null,description:"",name:"rounded",required:!1,type:{name:'boolean | "true" | ({ "@light"?: boolean | "true"; "@bp1"?: boolean | "true"; "@bp2"?: boolean | "true" | undefined; "@bp3"?: boolean | "true" | undefined; "@bp4"?: boolean | "true" | undefined; "@motion"?: boolean | ... 1 more ... | undefined; "@hover"?: boolean | ... 1 more ... | undefined;...'}}}}}catch{}try{o.displayName="ButtonForStory",o.__docgenInfo={description:"",displayName:"ButtonForStory",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"string"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ prefix: ""; media: { bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; ... 4 more ...; light: "(prefers-color-scheme: light)"; }; theme: { ...; }; themeMap: DefaultThemeMap; utils: { ...; }; }>'}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"medium"'},{value:'"large"'},{value:'"small"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"red"'},{value:'"primary"'},{value:'"secondary"'}]}},state:{defaultValue:null,description:"",name:"state",required:!1,type:{name:"enum",value:[{value:'"active"'},{value:'"waiting"'}]}},ghost:{defaultValue:null,description:"",name:"ghost",required:!1,type:{name:"boolean"}},rounded:{defaultValue:null,description:"",name:"rounded",required:!1,type:{name:"boolean"}}}}}catch{}export{r as B,o as a,g as b};
