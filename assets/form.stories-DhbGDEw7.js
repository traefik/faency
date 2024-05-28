import{a as s,j as e}from"./jsx-runtime-WuQMLw89.js";import{L as a}from"./Link-BmXHhRCg.js";import{F as t}from"./Flex-jm7nIrzU.js";import{a as l}from"./Heading-6EoCpiwd.js";import{C as p}from"./Card-DZEj9gwK.js";import{T as o}from"./TextField-DStYRBnm.js";import{C as c}from"./Checkbox-BqPmPSa6.js";import{L as d}from"./Label-C-FSa_nZ.js";import{B as u}from"./Button-ClaIUCuY.js";import"./index-Dl6G-zuu.js";import"./stitches.config-CKE6G7UO.js";import"./Text-De0MgKz9.js";import"./Elevation-CQxWisSY.js";import"./react-icons.esm-C3slgq7o.js";import"./Input-BRDGbW19.js";import"./Tooltip-CfKSzXzN.js";import"./index-CtlLVxo4.js";import"./extends-CF3RwP-h.js";import"./index-COmNUzeK.js";import"./index-D_wDWxb3.js";import"./index-BSTPHMlZ.js";import"./index-Dcc9teQf.js";import"./index-QZw2BAii.js";import"./index-D1_ZHIBm.js";import"./index-CsAIWpTZ.js";import"./index-nOrHFD8e.js";import"./index-CH6e6d6N.js";import"./index-xl_aMJyq.js";import"./index-B9ccl3Eh.js";import"./Box-CsPUZVXZ.js";import"./index-CYHKWj1-.js";import"./modifyVariantsForStory-D3vOGtQO.js";const r=()=>s(t,{css:{flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[e(l,{css:{mb:"$6"},children:"Form Example"}),e(p,{css:{p:"$6"},children:s("form",{children:[e(o,{id:"email",type:"email",name:"email",label:"Email",size:"large",placeholder:"Your e-mail address",autoComplete:"email",css:{mb:"$3"}}),e(o,{id:"password",type:"password",label:"Password",name:"password",size:"large",placeholder:"A secured password",autoComplete:"new-password",css:{mb:"$4"}}),s(t,{css:{alignItems:"center",mb:"$3"},children:[e(c,{id:"terms",name:"terms",css:{mr:"$2"}}),s(d,{htmlFor:"terms",css:{fontSize:"$1",fontWeight:"$regular",textTransform:"initial"},children:["By signing up, you agree to the"," ",e(a,{href:"#terms",variant:"subtle",children:"Terms of Service"})]})]}),e(u,{type:"submit",size:"large",variant:"primary",css:{width:"100%"},children:"Sign Up"})]})})]}),K={title:"Examples/Form",component:r};var m,i,n;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`() => <Flex css={{
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}}>
    <H1 css={{
    mb: '$6'
  }}>Form Example</H1>
    <Card css={{
    p: '$6'
  }}>
      <form>
        <TextField id="email" type="email" name="email" label="Email" size="large" placeholder="Your e-mail address" autoComplete="email" css={{
        mb: '$3'
      }} />
        <TextField id="password" type="password" label="Password" name="password" size="large" placeholder="A secured password" autoComplete="new-password" css={{
        mb: '$4'
      }} />

        <Flex css={{
        alignItems: 'center',
        mb: '$3'
      }}>
          <Checkbox id="terms" name="terms" css={{
          mr: '$2'
        }} />
          <Label htmlFor="terms" css={{
          fontSize: '$1',
          fontWeight: '$regular',
          textTransform: 'initial'
        }}>
            By signing up, you agree to the{' '}
            <Link href="#terms" variant="subtle">
              Terms of Service
            </Link>
          </Label>
        </Flex>

        <Button type="submit" size="large" variant="primary" css={{
        width: '100%'
      }}>
          Sign Up
        </Button>
      </form>
    </Card>
  </Flex>`,...(n=(i=r.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const M=["Form"];export{r as Form,M as __namedExportsOrder,K as default};
