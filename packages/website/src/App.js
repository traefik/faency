import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { Flex, Box, Chip, Button, Heading, Text, theme } from '@containous/faency'
import Icon from 'react-eva-icons'
import Container from './components/Container'
import List from './components/List'
import NavItem from './components/NavItem'
import Divider from './components/Divider'
import pkg from '../package.json'

function App({ element, props: appProps }) {
  const [navOpen, setNavOpen] = useState(false)

  const query = graphql`
    fragment mdxContent on MdxConnection {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
    query {
      pinned: allMdx(
        sort: { order: ASC, fields: [frontmatter___title] }
        filter: { frontmatter: { pinned: { ne: null } } }
      ) {
        ...mdxContent
      }
      components: allMdx(
        sort: { order: ASC, fields: [frontmatter___component] }
        filter: { frontmatter: { component: { ne: null } } }
      ) {
        ...mdxContent
      }
    }
  `

  const pathname = appProps.location.pathname

  return (
    <StaticQuery
      query={query}
      render={data => {
        return (
          <>
            <Box
              position={['static', 'fixed']}
              width={['100%', 200, 250]}
              height={['auto', '100vh']}
              overflow={['auto', 'scroll']}
              pb={[0, 8]}
              borderRight={[0, '1px solid']}
              borderBottom={['1px solid', 0]}
              borderColor={[theme.colors.grays[3], theme.colors.grays[3]]}
              style={{ WebkitOverflowScrolling: 'touch', overflowX: 'hidden' }}
            >
              <Box pt="1em" px={16}>
                <Flex alignItems="center">
                  <Box>
                    <img src="/logo.png" alt="Containous Logo" height="35px" />
                  </Box>
                  <Chip ml={1} variant="blue">
                    v{pkg.version}
                  </Chip>
                  <Box ml="auto" display={['block', 'none']}>
                    <Button size={1} variant={navOpen ? 'active' : undefined} onClick={() => setNavOpen(!navOpen)}>
                      {!navOpen && <Icon name="menu-outline" size="medium" fill="black" />}
                      {navOpen && <Icon name="close-outline" size="medium" fill="black" />}
                    </Button>
                  </Box>
                </Flex>
              </Box>

              <Box display={[navOpen ? 'block' : 'none', 'block']}>
                <Divider />
                <List>
                  <Heading size={1} my={10} mx={16}>
                    Overview
                  </Heading>
                  {data.pinned.edges.map(({ node }) => (
                    <NavItem
                      key={node.frontmatter.title}
                      to={node.fields.slug}
                      active={pathname === node.fields.slug}
                      onClick={() => setNavOpen(false)}
                    >
                      {node.frontmatter.title}
                    </NavItem>
                  ))}
                </List>

                <Divider />

                <List>
                  <Heading size={1} my={10} mx={16}>
                    Components
                  </Heading>
                  {data.components.edges.map(({ node }) => (
                    <NavItem
                      key={node.frontmatter.title}
                      to={node.fields.slug}
                      active={pathname === node.fields.slug}
                      onClick={() => setNavOpen(false)}
                    >
                      {node.frontmatter.title}
                    </NavItem>
                  ))}
                </List>

                <Divider />

                <List>
                  <Heading size={1} my={10} mx={16}>
                    Github links
                  </Heading>

                  <NavItem as="a" href="https://github.com/containous/faency" isExternal>
                    Faency
                  </NavItem>
                  <NavItem as="a" href="https://github.com/containous/faency/tree/master/packages/website" isExternal>
                    Faency Docs
                  </NavItem>
                </List>

                <Divider />

                <Box px={16} mt={3} minHeight={4}>
                  <Text size={2}>
                    Powered by{' '}
                    <a href="https://containo.us" title="Containous">
                      Containous
                    </a>
                  </Text>
                </Box>
                <Box px={16} mb={2} minHeight={4}>
                  <Text size={2}>
                    Highy inspired by{' '}
                    <a href="https://radix.modulz.app/" title="Radix Design System">
                      Radix
                    </a>
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box
              pt={8}
              pb={9}
              marginLeft={[0, 200, 250]}
              maxWidth={['100%']}
              display={[navOpen ? 'none' : 'block', 'block']}
              backgroundColor="#F2F3F5"
            >
              <Container size={1}>{element}</Container>
            </Box>
          </>
        )
      }}
    />
  )
}

App.propTypes = {
  element: PropTypes.elementType,
  props: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

export default App
