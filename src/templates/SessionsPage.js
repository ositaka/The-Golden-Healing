import React from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'

// Export Template for use in CMS preview
export const SessionsPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  body
}) => (
  <main className="SessionsPage">
    <Helmet>
      <title>{title}</title>
    </Helmet>

    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>
  </main>
)

const SessionsPage = ({ data: { page } }) => (
  <SessionsPageTemplate {...page.frontmatter} body={page.html} />
)
export default SessionsPage

export const pageQuery = graphql`
  query SessionsPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        featuredImage {
          ...FluidImage
        }
      }
    }
  }
`
