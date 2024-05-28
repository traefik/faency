import{j as e,a as n}from"./jsx-runtime-WuQMLw89.js";import{r as x,R as I}from"./index-Dl6G-zuu.js";import{s as p}from"./stitches.config-CKE6G7UO.js";import{F as i}from"./Flex-jm7nIrzU.js";import{b as q,B as A}from"./Button-ClaIUCuY.js";import{e as N}from"./Elevation-CQxWisSY.js";import{I as E}from"./react-icons.esm-C3slgq7o.js";import{A as a}from"./Avatar-C0zzFfC6.js";import{C as W}from"./Checkbox-BqPmPSa6.js";import{T as t}from"./Text-De0MgKz9.js";import"./modifyVariantsForStory-D3vOGtQO.js";import"./index-BSTPHMlZ.js";import"./extends-CF3RwP-h.js";import"./index-D_wDWxb3.js";import"./index-QZw2BAii.js";import"./index-D1_ZHIBm.js";import"./Box-CsPUZVXZ.js";import"./index-COmNUzeK.js";import"./index-CYHKWj1-.js";import"./index-CH6e6d6N.js";import"./index-xl_aMJyq.js";const F={bc:"transparent",c:"inherit",borderRadius:"inherit",fontFamily:"$rubik",fontSize:"$3",fontVariantNumeric:"tabular-nums"},H=p("span",i,{...F,p:"$2"}),P=p("button",i,{...q,...F,outline:"none",flexGrow:1,p:"$2","&::before":{borderRadius:"inherit",boxSizing:"border-box",content:'""',position:"absolute",inset:0},"&::after":{borderRadius:"inherit",boxSizing:"border-box",content:'""',position:"absolute",inset:0},"&:focus, &:focus-visible":{boxShadow:"inset 0 0 0 2px $colors$listItemFocusBorder"},"@hover":{"&:hover":{cursor:"pointer","&::before":{backgroundColor:"$listItemHoverBg"},"&::after":{backgroundColor:"$primary",opacity:.05}}},"&:active":{"&::before":{backgroundColor:"$listItemActiveBg"},"&::after":{backgroundColor:"$primary",opacity:.05}}}),O=p("li",{borderRadius:"$1",m:"$2",outline:"none",position:"relative",display:"flex","&:focus-within":{boxShadow:"none"},variants:{elevation:N},defaultVariants:{elevation:"1"}}),G=p("ul",{listStyleType:"none",m:0,p:0,color:"$hiContrast"}),U=x.createContext({interactive:!1}),s=I.forwardRef(({interactive:r,...m},u)=>{const h=x.useMemo(()=>({interactive:!!r}),[r]);return e(U.Provider,{value:h,children:e(G,{role:"list",ref:u,...m})})}),M=p("div",{position:"absolute",top:0,right:"$2",zIndex:1,height:"100%",display:"flex",alignItems:"center",justifyContent:"center",overflow:"visible"}),o=I.forwardRef(({children:r,controls:m,align:u,justify:h,direction:b,gap:g,wrap:v,...B},J)=>{const{interactive:k}=x.useContext(U);return n(O,{...B,ref:J,children:[k?e(P,{align:u,justify:h,direction:b,gap:g,wrap:v,children:r}):e(H,{align:u,justify:h,direction:b,gap:g,wrap:v,css:{flexGrow:1},children:r}),!!m&&e(M,{children:m})]})});try{s.displayName="Ul",s.__docgenInfo={description:"",displayName:"Ul",props:{css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}},interactive:{defaultValue:null,description:"",name:"interactive",required:!1,type:{name:"boolean"}}}}}catch{}try{o.displayName="Li",o.__docgenInfo={description:"",displayName:"Li",props:{direction:{defaultValue:null,description:"",name:"direction",required:!1,type:{name:'"column" | "row" | "rowReverse" | "columnReverse" | ({ "@light"?: "column" | "row" | "rowReverse" | "columnReverse"; "@bp1"?: "column" | "row" | "rowReverse" | "columnReverse"; ... 6 more ...; "@initial"?: "column" | ... 3 more ... | undefined; } & { ...; }) | undefined'}},gap:{defaultValue:null,description:"",name:"gap",required:!1,type:{name:'"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | ({ "@light"?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; ... 7 more ...; "@initial"?: "1" | ... 17 more ...; } & { ...; }) | undefined'}},justify:{defaultValue:null,description:"",name:"justify",required:!1,type:{name:'"center" | "end" | "start" | "space-around" | "space-between" | "space-evenly" | "between" | ({ "@light"?: "center" | "end" | "start" | "space-around" | "space-between" | "space-evenly" | "between"; ... 7 more ...; "@initial"?: "center" | ... 6 more ...; } & { ...; }) | undefined'}},wrap:{defaultValue:null,description:"",name:"wrap",required:!1,type:{name:'"wrap" | "noWrap" | "wrapReverse" | ({ "@light"?: "wrap" | "noWrap" | "wrapReverse"; "@bp1"?: "wrap" | "noWrap" | "wrapReverse"; "@bp2"?: "wrap" | "noWrap" | "wrapReverse" | undefined; ... 5 more ...; "@initial"?: "wrap" | ... 2 more ... | undefined; } & { ...; }) | undefined'}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:'CSS<{ bp1: "(min-width: 520px) and (max-width: 899px)"; bp2: "(min-width: 900px) and (max-width: 1199px)"; bp3: "(min-width: 1200px) and (max-width: 1799px)"; bp4: "(min-width: 1800px)"; motion: "(prefers-reduced-motion)"; hover: "(any-hover: hover)"; dark: "(prefers-color-scheme: dark)"; light: "(prefers-color-sche...'}},elevation:{defaultValue:null,description:"",name:"elevation",required:!1,type:{name:'number | `${number}` | ({ "@light"?: number | `${number}`; "@bp1"?: number | `${number}`; "@bp2"?: number | `${number}` | undefined; "@bp3"?: number | `${number}` | undefined; "@bp4"?: number | ... 1 more ... | undefined; "@motion"?: number | ... 1 more ... | undefined; "@hover"?: number | .....'}},controls:{defaultValue:null,description:"",name:"controls",required:!1,type:{name:"ReactNode"}},align:{defaultValue:null,description:"",name:"align",required:!1,type:{name:'"center" | "end" | "start" | "baseline" | "stretch" | "space-around" | "space-between" | "space-evenly" | ({ "@light"?: "center" | "end" | "start" | "baseline" | "stretch" | "space-around" | "space-between" | "space-evenly"; ... 7 more ...; "@initial"?: "center" | ... 7 more ...; } & { ...; }...'}}}}}catch{}const xe={title:"Components/List",component:s},V=r=>n(s,{...r,children:[e(o,{children:"Dashboard"}),e(o,{children:"Profile"}),e(o,{children:"Settings"}),e(o,{children:"Help"})]}),f=V.bind({}),l=V.bind({});l.args={interactive:!0};const c=r=>n(s,{...r,children:[n(o,{gap:"3",children:[e(a,{id:"100",src:"https://picsum.photos/100"}),n(i,{align:"start",direction:"column",children:[e(t,{size:"3",children:"John Doe"}),e(t,{size:"1",children:"john.doe@john.doe"})]})]}),n(o,{gap:"3",children:[e(a,{id:"42",src:"https://picsum.photos/42"}),n(i,{align:"start",direction:"column",children:[e(t,{size:"3",children:"Jane Doe"}),e(t,{size:"1",children:"jane.doe@jane.doe"})]})]}),n(o,{gap:"3",children:[e(a,{id:"67",src:"https://picsum.photos/67"}),n(i,{align:"start",direction:"column",children:[e(t,{size:"3",children:"Doe Jane"}),e(t,{size:"1",children:"doe.jane@doe.jane"})]})]})]});c.args={interactive:!0};const d=r=>n(s,{...r,children:[n(o,{gap:"3",controls:e(W,{}),children:[e(a,{id:"100",src:"https://picsum.photos/100"}),n(i,{align:"start",direction:"column",children:[e(t,{size:"3",children:"John Doe"}),e(t,{size:"1",children:"john.doe@john.doe"})]})]}),n(o,{gap:"3",controls:e(A,{variant:"red",children:"Delete"}),children:[e(a,{id:"42",src:"https://picsum.photos/42"}),n(i,{align:"start",direction:"column",children:[e(t,{size:"3",children:"Jane Doe"}),e(t,{size:"1",children:"jane.doe@jane.doe"})]})]}),n(o,{gap:"3",controls:e(E,{}),children:[e(a,{id:"67",src:"https://picsum.photos/67"}),n(i,{align:"start",direction:"column",children:[e(t,{size:"3",children:"Doe Jane"}),e(t,{size:"1",children:"doe.jane@doe.jane"})]})]})]});d.args={interactive:!0};var w,y,L;f.parameters={...f.parameters,docs:{...(w=f.parameters)==null?void 0:w.docs,source:{originalSource:`args => <Ul {...args}>
    <Li>Dashboard</Li>
    <Li>Profile</Li>
    <Li>Settings</Li>
    <Li>Help</Li>
  </Ul>`,...(L=(y=f.parameters)==null?void 0:y.docs)==null?void 0:L.source}}};var T,j,z;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`args => <Ul {...args}>
    <Li>Dashboard</Li>
    <Li>Profile</Li>
    <Li>Settings</Li>
    <Li>Help</Li>
  </Ul>`,...(z=(j=l.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var S,_,C;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`args => <Ul {...args}>
    <Li gap="3">
      <Avatar id="100" src="https://picsum.photos/100" />
      <Flex align="start" direction="column">
        <Text size="3">John Doe</Text>
        <Text size="1">john.doe@john.doe</Text>
      </Flex>
    </Li>
    <Li gap="3">
      <Avatar id="42" src="https://picsum.photos/42" />
      <Flex align="start" direction="column">
        <Text size="3">Jane Doe</Text>
        <Text size="1">jane.doe@jane.doe</Text>
      </Flex>
    </Li>
    <Li gap="3">
      <Avatar id="67" src="https://picsum.photos/67" />
      <Flex align="start" direction="column">
        <Text size="3">Doe Jane</Text>
        <Text size="1">doe.jane@doe.jane</Text>
      </Flex>
    </Li>
  </Ul>`,...(C=(_=c.parameters)==null?void 0:_.docs)==null?void 0:C.source}}};var R,$,D;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`args => <Ul {...args}>
    <Li gap="3" controls={<Checkbox />}>
      <Avatar id="100" src="https://picsum.photos/100" />
      <Flex align="start" direction="column">
        <Text size="3">John Doe</Text>
        <Text size="1">john.doe@john.doe</Text>
      </Flex>
    </Li>
    <Li gap="3" controls={<Button variant="red">Delete</Button>}>
      <Avatar id="42" src="https://picsum.photos/42" />
      <Flex align="start" direction="column">
        <Text size="3">Jane Doe</Text>
        <Text size="1">jane.doe@jane.doe</Text>
      </Flex>
    </Li>
    <Li gap="3" controls={<InfoCircledIcon />}>
      <Avatar id="67" src="https://picsum.photos/67" />
      <Flex align="start" direction="column">
        <Text size="3">Doe Jane</Text>
        <Text size="1">doe.jane@doe.jane</Text>
      </Flex>
    </Li>
  </Ul>`,...(D=($=d.parameters)==null?void 0:$.docs)==null?void 0:D.source}}};const be=["Basic","Interactive","Users","Controls"];export{f as Basic,d as Controls,l as Interactive,c as Users,be as __namedExportsOrder,xe as default};
