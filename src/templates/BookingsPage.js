import React from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'

// Export Template for use in CMS preview
export const BookingsPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  body
}) => (
  <main className="BookingsPage">
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

const BookingsPage = ({ data: { page } }) => (
  <BookingsPageTemplate {...page.frontmatter} body={page.html} />
)
export default BookingsPage

export const pageQuery = graphql`
  query BookingsPage($id: String!) {
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
