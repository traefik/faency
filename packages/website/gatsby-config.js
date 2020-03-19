module.exports = {
  pathPrefix: '/faency',
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-use-dark-mode',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: 'hsl(208, 98%, 50%)',
        showSpinner: false,
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],

        remarkPlugins: [require('remark-slug'), require('remark-autolink-headings')],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: `${__dirname}/src/docs/`,
      },
    },
  ],
}
