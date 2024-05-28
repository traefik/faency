import{a as y,j as e}from"./jsx-runtime-WuQMLw89.js";import{r as F}from"./index-Dl6G-zuu.js";import{T as Q}from"./TextField-DStYRBnm.js";import{M as U,i as W,j as X,I as Y}from"./react-icons.esm-C3slgq7o.js";import{s as J}from"./stitches.config-CKE6G7UO.js";import{m as Z}from"./modifyVariantsForStory-D3vOGtQO.js";import{i as d}from"./ignoreArgType-DG8_8Mu6.js";import{d as ee,P as ae,a as re}from"./Popover-DLWl_4gM.js";import{F as b}from"./Flex-jm7nIrzU.js";import{L as le}from"./Label-C-FSa_nZ.js";import{T as oe}from"./Text-De0MgKz9.js";import"./Input-BRDGbW19.js";import"./Elevation-CQxWisSY.js";import"./Tooltip-CfKSzXzN.js";import"./index-CtlLVxo4.js";import"./extends-CF3RwP-h.js";import"./index-COmNUzeK.js";import"./index-D_wDWxb3.js";import"./index-BSTPHMlZ.js";import"./index-Dcc9teQf.js";import"./index-QZw2BAii.js";import"./index-D1_ZHIBm.js";import"./index-CsAIWpTZ.js";import"./index-nOrHFD8e.js";import"./index-CH6e6d6N.js";import"./index-xl_aMJyq.js";import"./index-B9ccl3Eh.js";import"./Box-CsPUZVXZ.js";import"./index-CWDp4F3j.js";import"./Panel-DnGxmVDB.js";const de=a=>e(Q,{...a}),l=Z(de),Ee={title:"Components/TextField",component:l,argTypes:{onClick:{action:"clicked"}}},ie=a=>e(l,{...a}),o=({id:a,...r})=>y(b,{direction:"column",gap:2,children:[e(l,{size:"small",id:`'${a}-small'`,label:"small",placeholder:"placeholder",...r}),e(l,{id:`'${a}-basic'`,label:"basic",placeholder:"placeholder",...r}),e(l,{size:"large",id:`'${a}-large'`,label:"large",placeholder:"placeholder",...r}),e(l,{state:"invalid",id:`'${a}-invalid'`,label:"invalid",placeholder:"placeholder",...r}),e(l,{startAdornment:e(U,{}),id:`'${a}-search'`,label:"search",placeholder:"Search...",...r})]});o.args={id:"basic"};d("id",o);const s=ie.bind({});s.args={type:"password",id:"passwordtype",label:"password"};d("id",s);const t=o.bind({});t.args={id:"clearable",clearable:!0};d("id",t);const n=o.bind({});n.args={id:"disabled",disabled:!0};d("id",n);const c=o.bind({});c.args={id:"readonly",readOnly:!0};d("id",c);const se=J(W,{"@hover":{"&:hover":{cursor:"pointer"}}}),g=a=>{const r="Text to copy",[K,h]=F.useState(!1),N=F.useCallback(async()=>{await navigator.clipboard.writeText(r),h(!0),setTimeout(()=>{h(!1)},2e3)},[r,h]);return e(b,{direction:"column",gap:2,children:e(l,{id:"readOnly-copy",label:"readOnly Copy",value:r,readOnly:!0,endAdornment:K?e(X,{"aria-label":"Copied"}):e(se,{"aria-label":"Copy",onClick:N}),...a})})},i=({id:a,...r})=>y(b,{direction:"column",gap:2,children:[e(l,{id:`${a}-disabled`,label:"disabled",placeholder:"placeholder",value:"disabled",disabled:!0,...r}),e(l,{id:`${a}-readOnly`,label:"readOnly",placeholder:"placeholder",value:"readOnly",readOnly:!0,...r})]});i.args={id:"display"};d("id",i);const p=i.bind({});p.args={id:"displayclearable",clearable:!0};d("id",p);const m=({id:a,...r})=>y(b,{direction:"column",gap:2,children:[e(l,{id:`${a}-basic`,...r}),e(l,{id:`${a}-invalid`,state:"invalid",...r}),e(l,{id:`${a}-disabled`,value:"disabled",disabled:!0,...r})]}),te=J(Y,{ml:"$2","@hover":{"&:hover":{cursor:"pointer"}}}),ne=a=>e(le,{...a,children:y(b,{align:"center",children:["Field Label",y(ee,{children:[e(ae,{asChild:!0,children:e(te,{})}),e(re,{css:{p:"$3"},children:e(oe,{as:"p",css:{color:"currentColor"},children:"More information"})})]})]})});m.args={id:"labelcomponent",label:ne};d("id",m);var u,x,S;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`({
  id,
  ...args
}) => <Flex direction="column" gap={2}>
    <TextFieldForStory size="small" id={\`'\${id}-small'\`} label="small" placeholder="placeholder" {...args} />
    <TextFieldForStory id={\`'\${id}-basic'\`} label="basic" placeholder="placeholder" {...args} />
    <TextFieldForStory size="large" id={\`'\${id}-large'\`} label="large" placeholder="placeholder" {...args} />
    <TextFieldForStory state="invalid" id={\`'\${id}-invalid'\`} label="invalid" placeholder="placeholder" {...args} />
    <TextFieldForStory startAdornment={<MagnifyingGlassIcon />} id={\`'\${id}-search'\`} label="search" placeholder="Search..." {...args} />
  </Flex>`,...(S=(x=o.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var T,C,$;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:"args => <TextFieldForStory {...args} />",...($=(C=s.parameters)==null?void 0:C.docs)==null?void 0:$.source}}};var v,f,O;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`({
  id,
  ...args
}) => <Flex direction="column" gap={2}>
    <TextFieldForStory size="small" id={\`'\${id}-small'\`} label="small" placeholder="placeholder" {...args} />
    <TextFieldForStory id={\`'\${id}-basic'\`} label="basic" placeholder="placeholder" {...args} />
    <TextFieldForStory size="large" id={\`'\${id}-large'\`} label="large" placeholder="placeholder" {...args} />
    <TextFieldForStory state="invalid" id={\`'\${id}-invalid'\`} label="invalid" placeholder="placeholder" {...args} />
    <TextFieldForStory startAdornment={<MagnifyingGlassIcon />} id={\`'\${id}-search'\`} label="search" placeholder="Search..." {...args} />
  </Flex>`,...(O=(f=t.parameters)==null?void 0:f.docs)==null?void 0:O.source}}};var I,z,w;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`({
  id,
  ...args
}) => <Flex direction="column" gap={2}>
    <TextFieldForStory size="small" id={\`'\${id}-small'\`} label="small" placeholder="placeholder" {...args} />
    <TextFieldForStory id={\`'\${id}-basic'\`} label="basic" placeholder="placeholder" {...args} />
    <TextFieldForStory size="large" id={\`'\${id}-large'\`} label="large" placeholder="placeholder" {...args} />
    <TextFieldForStory state="invalid" id={\`'\${id}-invalid'\`} label="invalid" placeholder="placeholder" {...args} />
    <TextFieldForStory startAdornment={<MagnifyingGlassIcon />} id={\`'\${id}-search'\`} label="search" placeholder="Search..." {...args} />
  </Flex>`,...(w=(z=n.parameters)==null?void 0:z.docs)==null?void 0:w.source}}};var k,A,M;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`({
  id,
  ...args
}) => <Flex direction="column" gap={2}>
    <TextFieldForStory size="small" id={\`'\${id}-small'\`} label="small" placeholder="placeholder" {...args} />
    <TextFieldForStory id={\`'\${id}-basic'\`} label="basic" placeholder="placeholder" {...args} />
    <TextFieldForStory size="large" id={\`'\${id}-large'\`} label="large" placeholder="placeholder" {...args} />
    <TextFieldForStory state="invalid" id={\`'\${id}-invalid'\`} label="invalid" placeholder="placeholder" {...args} />
    <TextFieldForStory startAdornment={<MagnifyingGlassIcon />} id={\`'\${id}-search'\`} label="search" placeholder="Search..." {...args} />
  </Flex>`,...(M=(A=c.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var D,P,G;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  const toCopy = 'Text to copy';
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    await navigator.clipboard.writeText(toCopy);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [toCopy, setCopied]);
  return <Flex direction="column" gap={2}>
      <TextFieldForStory id={\`readOnly-copy\`} label="readOnly Copy" value={toCopy} readOnly endAdornment={copied ? <CheckCircledIcon aria-label="Copied" /> : <StyledCopyIcon aria-label="Copy" onClick={onCopy} />} {...args} />
    </Flex>;
}`,...(G=(P=g.parameters)==null?void 0:P.docs)==null?void 0:G.source}}};var L,j,R;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:'({\n  id,\n  ...args\n}) => <Flex direction="column" gap={2}>\n    <TextFieldForStory id={`${id}-disabled`} label="disabled" placeholder="placeholder" value="disabled" disabled {...args} />\n    <TextFieldForStory id={`${id}-readOnly`} label="readOnly" placeholder="placeholder" value="readOnly" readOnly {...args} />\n  </Flex>',...(R=(j=i.parameters)==null?void 0:j.docs)==null?void 0:R.source}}};var B,E,_;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:'({\n  id,\n  ...args\n}) => <Flex direction="column" gap={2}>\n    <TextFieldForStory id={`${id}-disabled`} label="disabled" placeholder="placeholder" value="disabled" disabled {...args} />\n    <TextFieldForStory id={`${id}-readOnly`} label="readOnly" placeholder="placeholder" value="readOnly" readOnly {...args} />\n  </Flex>',...(_=(E=p.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var V,q,H;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:'({\n  id,\n  ...args\n}) => <Flex direction="column" gap={2}>\n    <TextFieldForStory id={`${id}-basic`} {...args} />\n    <TextFieldForStory id={`${id}-invalid`} state="invalid" {...args} />\n    <TextFieldForStory id={`${id}-disabled`} value="disabled" disabled {...args} />\n  </Flex>',...(H=(q=m.parameters)==null?void 0:q.docs)==null?void 0:H.source}}};const _e=["Basic","PasswordType","Clearable","Disabled","ReadOnly","ReadOnlyCopy","Display","DisplayClearable","LabelComponent"];export{o as Basic,t as Clearable,n as Disabled,i as Display,p as DisplayClearable,m as LabelComponent,s as PasswordType,c as ReadOnly,g as ReadOnlyCopy,_e as __namedExportsOrder,Ee as default};
