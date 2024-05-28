import{a,j as e,F as v}from"./jsx-runtime-WuQMLw89.js";import{D as u,a as C,b as f,c as q,d as y,S as B}from"./Dialog-Bug7HII1.js";import{r as c}from"./index-Dl6G-zuu.js";import{B as m}from"./Button-ClaIUCuY.js";import{B as O}from"./Box-CsPUZVXZ.js";import{T as l}from"./Text-De0MgKz9.js";import"./stitches.config-CKE6G7UO.js";import"./extends-CF3RwP-h.js";import"./index-COmNUzeK.js";import"./index-D_wDWxb3.js";import"./index-BSTPHMlZ.js";import"./index-CsAIWpTZ.js";import"./index-Dcc9teQf.js";import"./index-QZw2BAii.js";import"./index-D1_ZHIBm.js";import"./index-CWDp4F3j.js";import"./index-xl_aMJyq.js";import"./react-icons.esm-C3slgq7o.js";import"./Elevation-CQxWisSY.js";import"./Card-DZEj9gwK.js";import"./IconButton-DvPQDc94.js";import"./modifyVariantsForStory-D3vOGtQO.js";const Q={title:"Components/Dialog",component:u},b=()=>{const[n,t]=c.useState(1);return a(v,{children:[e(l,{size:2,as:"h3",css:{mb:"$3"},children:"Hello, World!"}),[...Array(n)].map((i,o)=>e(l,{css:{mb:"$1"},children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},o)),e(m,{css:{mt:"$3"},onClick:()=>t(i=>i+1),children:"Add more text"})]})},r=()=>{const[n,t]=c.useState(!1);return a(u,{open:n,onOpenChange:i=>t(i),children:[e(C,{asChild:!0,children:e(m,{onClick:()=>t(!0),children:"Open dialog"})}),e(O,{children:[...Array(10)].map((i,o)=>e(l,{css:{my:"$1"},children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},o))}),a(f,{children:[e(q,{}),e(y,{children:e(b,{})})]})]})},s=()=>{const[n,t]=c.useState(!1);return a(u,{open:n,onOpenChange:i=>t(i),children:[e(C,{asChild:!0,children:e(m,{onClick:()=>t(!0),children:"Open dialog"})}),e(O,{children:[...Array(10)].map((i,o)=>e(l,{css:{my:"$1"},children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},o))}),a(f,{children:[e(q,{}),e(B,{children:e(b,{})})]})]})};var d,p,g;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const [open, setOpen] = useState(false);
  return <Dialog open={open} onOpenChange={isOpen => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
      </DialogTrigger>

      <Box>
        {[...Array(10)].map((_, i) => <Text key={i} css={{
        my: '$1'
      }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Text>)}
      </Box>

      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <Content />
        </DialogContent>
      </DialogPortal>
    </Dialog>;
}`,...(g=(p=r.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var h,x,D;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const [open, setOpen] = useState(false);
  return <Dialog open={open} onOpenChange={isOpen => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
      </DialogTrigger>

      <Box>
        {[...Array(10)].map((_, i) => <Text key={i} css={{
        my: '$1'
      }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Text>)}
      </Box>

      <DialogPortal>
        <DialogOverlay />
        <StyledContent>
          <Content />
        </StyledContent>
      </DialogPortal>
    </Dialog>;
}`,...(D=(x=s.parameters)==null?void 0:x.docs)==null?void 0:D.source}}};const R=["Basic","NoCloseIcon"];export{r as Basic,s as NoCloseIcon,R as __namedExportsOrder,Q as default};
