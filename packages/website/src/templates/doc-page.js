import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import * as FC from '@containous/faency'
import Layout from '../components/Layout'
import CodeBlock from '../components/CodeBlock'
import Icon from 'react-eva-icons'
import { SystemPropsTable } from '../components/SystemPropsTable'
import { PropsTable } from '../components/PropsTable'
import { ThemeSection } from '../components/ThemeSection'
import { APISection } from '../components/APISection'
import useDarkMode from 'use-dark-mode'

function Prop(props) {
  return (
    <FC.Box mb={3}>
      <FC.Text as="p" size={2} sx={{ lineHeight: 2, color: FC.theme.colors.grays[7] }}>
        {props.isOptional && 'optional'} <code>{props.children}</code>
      </FC.Text>
      {props.default && (
        <FC.Text as="p" size={2} sx={{ lineHeight: 2, color: 'gray700' }}>
          default <code>{props.default}</code>
        </FC.Text>
      )}
    </FC.Box>
  )
}

Prop.propTypes = {
  children: PropTypes.elementType,
  default: PropTypes.string,
  isOptional: PropTypes.bool,
}

export const components = {
  ...FC,
  pre: function Pre(props) {
    return <div {...props} />
  },
  Icon,
  code: CodeBlock,
  table: FC.Table,
  thead: FC.Thead,
  tbody: FC.Tbody,
  tfoot: FC.Tfoot,
  tr: FC.Tr,
  th: FC.Th,
  td: FC.Td,
  inlineCode: function InlineCode(props) {
    return <FC.Chip variant="blue" {...props} />
  },
  SystemProps: SystemPropsTable,
  PropsTable: PropsTable,
  h1: function H1(props) {
    return <FC.Heading {...props} size={3} mt={8} mb={30} />
  },
  h2: function H2(props) {
    return <FC.Heading {...props} as="h2" size={2} mt={8} mb={26} />
  },
  h3: function H3(props) {
    return <FC.Heading {...props} as="h3" size={1} mt={7} mb={22} sx={{ lineHeight: 1 }} />
  },
  h4: function H4(props) {
    return <FC.Heading {...props} as="h4" weight={500} size={0} mt={6} mb={1} sx={{ lineHeight: 2 }} />
  },
  p: function P(props) {
    return <FC.Text {...props} as="p" size={3} lineHeight={3} />
  },
  Prop,
  ThemeSection,
  APISection,
  useDarkMode,
  getValidImageUrl: () =>
    'https://images.unsplash.com/photo-1579380287268-aa88d096651c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
}

function DocPageTemplate({ data, location }) {
  const children = <MDXRenderer>{data.mdx.body}</MDXRenderer>

  return (
    <Layout pathname={location.pathname}>
      <Helmet>
        <title>Faency — {data.mdx.frontmatter.title}</title>
        <meta property="og:title" content={`Faency — ${data.mdx.frontmatter.title}`} />
        <meta property="og:description" content={data.mdx.frontmatter.description} />
        <meta name="twitter:title" content={`Faency — ${data.mdx.frontmatter.title}`} />
        <meta name="twitter:description" content={data.mdx.frontmatter.description} />
      </Helmet>

      <MDXProvider components={components}>
        <FC.Box>
          <FC.Heading size={4} mb={20} lineHeight={4}>
            {data.mdx.frontmatter.title}
          </FC.Heading>
          <FC.Heading size={1} mb={7} as="h2" lineHeight={3} textColor={FC.theme.colors.grays[5]}>
            {data.mdx.frontmatter.description}
          </FC.Heading>
          {children}
        </FC.Box>
      </MDXProvider>
    </Layout>
  )
}

DocPageTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string,
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    }),
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

export default DocPageTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        component
        description
      }
      body
    }
  }
`
