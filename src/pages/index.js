import * as React from "react"
import { Link, graphql } from "gatsby"
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

import Layout from "../components/layout"
import Seo from "../components/seo"

const LandingPageIndex = ({ data, location }) => {
    const { t } = useTranslation();

  return (
    <Layout location={location}></Layout>
  )
}

export default LandingPageIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo
    title="Cross-Border Reefer Truck Service - China, Laos, Thailand, Cambodia | FLS Group"
    description="FLS Group offers ISO-certified cross-border refrigerator truck services with fleets all under 7 years old. Full customs clearance, experienced drivers, 24/7 tracking and assistance."
    image="/images/fls-og-image.jpg"
    lang="en"
/>

export const pageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["index"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
