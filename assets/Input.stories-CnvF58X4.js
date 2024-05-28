import{a as e,j as n,F as U}from"./jsx-runtime-WuQMLw89.js";import{s as Y}from"./stitches.config-CKE6G7UO.js";import{m as q}from"./modifyVariantsForStory-D3vOGtQO.js";import{I as H}from"./Input-BRDGbW19.js";import{E as J,M as p}from"./react-icons.esm-C3slgq7o.js";import{i as y}from"./ignoreArgType-DG8_8Mu6.js";import{F as b}from"./Flex-jm7nIrzU.js";import{B as r}from"./Box-CsPUZVXZ.js";import{L as t}from"./Label-C-FSa_nZ.js";import"./index-Dl6G-zuu.js";import"./Elevation-CQxWisSY.js";import"./extends-CF3RwP-h.js";import"./index-QZw2BAii.js";import"./index-D1_ZHIBm.js";import"./index-BSTPHMlZ.js";import"./Text-De0MgKz9.js";const g=Y(J,{"@hover":{"&:hover":{cursor:"pointer"}}}),K=o=>n(H,{...o}),a=q(K),cn={title:"Components/Input",component:a,argTypes:{onClick:{action:"clicked"}}},l=({id:o,...i})=>e(b,{direction:"column",gap:2,children:[e(r,{children:[n(t,{htmlFor:`${o}-small`,children:"Small"}),n(a,{id:`${o}-small`,size:"small",...i})]}),e(r,{children:[n(t,{htmlFor:`${o}-default`,children:"Default"}),n(a,{id:`${o}-default`,...i})]}),e(r,{children:[n(t,{htmlFor:`${o}-large`,children:"Large"}),n(a,{id:`${o}-large`,size:"large",...i})]}),e(r,{children:[n(t,{htmlFor:`${o}-ghost`,children:"Ghost"}),n(a,{id:`${o}-ghost`,variant:"ghost",...i})]}),e(r,{children:[n(t,{htmlFor:`${o}-adornments`,children:"Adornments"}),n(a,{id:`${o}-adornments`,startAdornment:n(p,{}),endAdornment:n(g,{}),...i})]})]});l.args={placeholder:"placeholder"};y("id",l);const Q=["button","checkbox","reset","submit","color","file","password","radio","range","date","datetime-local","month","time","week","email","number","search","tel","text","url"],u=({type:o,...i})=>n(b,{direction:"column",gap:2,children:Q.map(c=>e(U,{children:[n(t,{htmlFor:`types-${c}`,children:c},c),n(a,{id:`types-${c}`,...i,type:c})]}))});u.args={};const d=l.bind({});d.args={id:"invalid",state:"invalid"};y("id",d);const m=l.bind({});m.args={id:"disabled",disabled:!0,defaultValue:"value"};y("id",m);const h=l.bind({});h.args={id:"readonly",readOnly:!0,defaultValue:"value"};y("id",h);const F=o=>e(b,{direction:"column",gap:2,children:[e(r,{children:[n(t,{htmlFor:"ghost-small",children:"Small"}),n(a,{id:"ghost-small",size:"small",...o})]}),e(r,{children:[n(t,{htmlFor:"ghost-default",children:"Default"}),n(a,{id:"ghost-default",...o})]}),e(r,{children:[n(t,{htmlFor:"ghost-large",children:"Large"}),n(a,{id:"ghost-large",size:"large",...o})]}),e(r,{children:[n(t,{htmlFor:"ghost-invalid",children:"Invalid"}),n(a,{id:"ghost-invalid",state:"invalid",...o})]}),e(r,{children:[n(t,{htmlFor:"ghost-disabled",children:"Disabled"}),n(a,{id:"ghost-disabled",disabled:!0,...o})]}),e(r,{children:[n(t,{htmlFor:"ghost-readonly",children:"ReadOnly"}),n(a,{id:"ghost-readonly",readOnly:!0,...o})]}),e(r,{children:[n(t,{htmlFor:"ghost-adornments",children:"Adornments"}),n(a,{id:"ghost-adornments",startAdornment:n(p,{}),endAdornment:n(g,{}),...o})]})]});F.args={defaultValue:"value",variant:"ghost"};const s=l.bind({});s.args={id:"adornments",startAdornment:n(p,{}),endAdornment:n(g,{})};s.argTypes={startAdornment:{options:["search","eye"],mapping:{search:n(p,{}),eye:n(g,{})}},endAdornment:{options:["search","eye"],mapping:{search:n(p,{}),eye:n(g,{})}}};y("id",s);const x=o=>n("form",{children:e(b,{direction:"column",gap:2,children:[e(r,{children:[n(t,{htmlFor:"autofill-small",children:"Small"}),n(a,{id:"autofill-small",name:"ship-city",autoComplete:"shipping locality",size:"small",...o})]}),e(r,{children:[n(t,{htmlFor:"autofill-default",children:"Default"}),n(a,{id:"autofill-default",name:"ship-organization",autoComplete:"shipping organization",...o})]}),e(r,{children:[n(t,{htmlFor:"autofill-large",children:"Large"}),n(a,{id:"autofill-large",name:"ship-address",autoComplete:"shipping street-address",size:"large",...o})]}),e(r,{children:[n(t,{htmlFor:"autofill-ghost",children:"Ghost"}),n(a,{id:"autofill-ghost",name:"ship-city",autoComplete:"shipping locality",variant:"ghost",...o})]}),e(r,{children:[n(t,{htmlFor:"autofill-invalid",children:"Invalid"}),n(a,{id:"autofill-invalid",name:"ship-zip",autoComplete:"shipping postal-code",state:"invalid",...o})]}),e(r,{children:[n(t,{htmlFor:"autofill-adornments",children:"Adornments"}),n(a,{id:"autofill-adornments",name:"ship-country",autoComplete:"shipping country",startAdornment:n(p,{}),endAdornment:n(g,{}),...o})]})]})});var L,f,B;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:'({\n  id,\n  ...args\n}) => <Flex direction="column" gap={2}>\n    <Box>\n      <Label htmlFor={`${id}-small`}>Small</Label>\n      <InputForStory id={`${id}-small`} size="small" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-default`}>Default</Label>\n      <InputForStory id={`${id}-default`} {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-large`}>Large</Label>\n      <InputForStory id={`${id}-large`} size="large" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-ghost`}>Ghost</Label>\n      <InputForStory id={`${id}-ghost`} variant="ghost" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-adornments`}>Adornments</Label>\n      <InputForStory id={`${id}-adornments`} startAdornment={<MagnifyingGlassIcon />} endAdornment={<StyledEyeOpenIcon />} {...args} />\n    </Box>\n  </Flex>',...(B=(f=l.parameters)==null?void 0:f.docs)==null?void 0:B.source}}};var I,S,$;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`({
  type,
  ...args
}) => <Flex direction="column" gap={2}>
    {INPUT_TYPES.map(type => <>
        <Label htmlFor={\`types-\${type}\`} key={type}>
          {type}
        </Label>
        <InputForStory id={\`types-\${type}\`} {...args} type={type} />
      </>)}
  </Flex>`,...($=(S=u.parameters)==null?void 0:S.docs)==null?void 0:$.source}}};var A,v,z;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:'({\n  id,\n  ...args\n}) => <Flex direction="column" gap={2}>\n    <Box>\n      <Label htmlFor={`${id}-small`}>Small</Label>\n      <InputForStory id={`${id}-small`} size="small" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-default`}>Default</Label>\n      <InputForStory id={`${id}-default`} {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-large`}>Large</Label>\n      <InputForStory id={`${id}-large`} size="large" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-ghost`}>Ghost</Label>\n      <InputForStory id={`${id}-ghost`} variant="ghost" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-adornments`}>Adornments</Label>\n      <InputForStory id={`${id}-adornments`} startAdornment={<MagnifyingGlassIcon />} endAdornment={<StyledEyeOpenIcon />} {...args} />\n    </Box>\n  </Flex>',...(z=(v=d.parameters)==null?void 0:v.docs)==null?void 0:z.source}}};var G,O,C;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:'({\n  id,\n  ...args\n}) => <Flex direction="column" gap={2}>\n    <Box>\n      <Label htmlFor={`${id}-small`}>Small</Label>\n      <InputForStory id={`${id}-small`} size="small" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-default`}>Default</Label>\n      <InputForStory id={`${id}-default`} {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-large`}>Large</Label>\n      <InputForStory id={`${id}-large`} size="large" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-ghost`}>Ghost</Label>\n      <InputForStory id={`${id}-ghost`} variant="ghost" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-adornments`}>Adornments</Label>\n      <InputForStory id={`${id}-adornments`} startAdornment={<MagnifyingGlassIcon />} endAdornment={<StyledEyeOpenIcon />} {...args} />\n    </Box>\n  </Flex>',...(C=(O=m.parameters)==null?void 0:O.docs)==null?void 0:C.source}}};var D,E,M;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:'({\n  id,\n  ...args\n}) => <Flex direction="column" gap={2}>\n    <Box>\n      <Label htmlFor={`${id}-small`}>Small</Label>\n      <InputForStory id={`${id}-small`} size="small" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-default`}>Default</Label>\n      <InputForStory id={`${id}-default`} {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-large`}>Large</Label>\n      <InputForStory id={`${id}-large`} size="large" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-ghost`}>Ghost</Label>\n      <InputForStory id={`${id}-ghost`} variant="ghost" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-adornments`}>Adornments</Label>\n      <InputForStory id={`${id}-adornments`} startAdornment={<MagnifyingGlassIcon />} endAdornment={<StyledEyeOpenIcon />} {...args} />\n    </Box>\n  </Flex>',...(M=(E=h.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};var T,k,P;F.parameters={...F.parameters,docs:{...(T=F.parameters)==null?void 0:T.docs,source:{originalSource:`args => <Flex direction="column" gap={2}>
    <Box>
      <Label htmlFor="ghost-small">Small</Label>
      <InputForStory id="ghost-small" size="small" {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-default">Default</Label>
      <InputForStory id="ghost-default" {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-large">Large</Label>
      <InputForStory id="ghost-large" size="large" {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-invalid">Invalid</Label>
      <InputForStory id="ghost-invalid" state="invalid" {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-disabled">Disabled</Label>
      <InputForStory id="ghost-disabled" disabled {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-readonly">ReadOnly</Label>
      <InputForStory id="ghost-readonly" readOnly {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-adornments">Adornments</Label>
      <InputForStory id="ghost-adornments" startAdornment={<MagnifyingGlassIcon />} endAdornment={<StyledEyeOpenIcon />} {...args} />
    </Box>
  </Flex>`,...(P=(k=F.parameters)==null?void 0:k.docs)==null?void 0:P.source}}};var R,V,_;s.parameters={...s.parameters,docs:{...(R=s.parameters)==null?void 0:R.docs,source:{originalSource:'({\n  id,\n  ...args\n}) => <Flex direction="column" gap={2}>\n    <Box>\n      <Label htmlFor={`${id}-small`}>Small</Label>\n      <InputForStory id={`${id}-small`} size="small" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-default`}>Default</Label>\n      <InputForStory id={`${id}-default`} {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-large`}>Large</Label>\n      <InputForStory id={`${id}-large`} size="large" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-ghost`}>Ghost</Label>\n      <InputForStory id={`${id}-ghost`} variant="ghost" {...args} />\n    </Box>\n\n    <Box>\n      <Label htmlFor={`${id}-adornments`}>Adornments</Label>\n      <InputForStory id={`${id}-adornments`} startAdornment={<MagnifyingGlassIcon />} endAdornment={<StyledEyeOpenIcon />} {...args} />\n    </Box>\n  </Flex>',...(_=(V=s.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};var j,w,N;x.parameters={...x.parameters,docs:{...(j=x.parameters)==null?void 0:j.docs,source:{originalSource:`args => <form>
    <Flex direction="column" gap={2}>
      <Box>
        <Label htmlFor="autofill-small">Small</Label>
        <InputForStory id="autofill-small" name="ship-city" autoComplete="shipping locality" size="small" {...args} />
      </Box>
      <Box>
        <Label htmlFor="autofill-default">Default</Label>
        <InputForStory id="autofill-default" name="ship-organization" autoComplete="shipping organization" {...args} />
      </Box>
      <Box>
        <Label htmlFor="autofill-large">Large</Label>
        <InputForStory id="autofill-large" name="ship-address" autoComplete="shipping street-address" size="large" {...args} />
      </Box>
      <Box>
        <Label htmlFor="autofill-ghost">Ghost</Label>
        <InputForStory id="autofill-ghost" name="ship-city" autoComplete="shipping locality" variant="ghost" {...args} />
      </Box>
      <Box>
        <Label htmlFor="autofill-invalid">Invalid</Label>
        <InputForStory id="autofill-invalid" name="ship-zip" autoComplete="shipping postal-code" state="invalid" {...args} />
      </Box>
      <Box>
        <Label htmlFor="autofill-adornments">Adornments</Label>
        <InputForStory id="autofill-adornments" name="ship-country" autoComplete="shipping country" startAdornment={<MagnifyingGlassIcon />} endAdornment={<StyledEyeOpenIcon />} {...args} />
      </Box>
    </Flex>
  </form>`,...(N=(w=x.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};const un=["Basic","Types","Invalid","Disabled","ReadOnly","Ghost","Adornments","Autofill"];export{s as Adornments,x as Autofill,l as Basic,m as Disabled,F as Ghost,d as Invalid,h as ReadOnly,u as Types,un as __namedExportsOrder,cn as default};
