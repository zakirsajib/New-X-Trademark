import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import H1 from '../components/H1'
import Layout from '../components/Layout'
import PostList from '../components/PostList'

const Tag = props => {
  const { data, pageContext } = props
  const { edges: posts, totalCount } = data.allWordpressPost
  const { title: siteTitle } = data.site.siteMetadata
  const { name: tag } = pageContext
  const title = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } with the tag ${tag}`

  return (
    <Layout>
      <Helmet title={`${tag} | ${siteTitle}`} />
      <section className="section">
        <div className="container">
          <H1 style={{color: `#e0e1e2`}} dangerouslySetInnerHTML={{ __html: title}}></H1>
        </div>
      </section>
      <PostList posts={posts} title={title} />
    </Layout>
  )
}

export default Tag

export const pageQuery = graphql`
  query TagPage($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(filter: { tags: { elemMatch: { slug: { eq: $slug } } } }) {
      totalCount
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`
