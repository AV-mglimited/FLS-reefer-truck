import * as React from "react"
import { Link, graphql } from "gatsby"
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import ogImg from '../images/FLS-default-og-image.jpg';

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

export const Head = ({ data, pageContext }) => {
    const language = pageContext.language || 'vie'; // Default to 'en' if undefined
    const {t} = useTranslation();


    // Fetch translated strings for SEO metadata
    const title = t('seo.title');
    const description = t('seo.description');

    return (
        <Seo
            title={title}
            description={description}
            image={ogImg}
            lang={language}
        />
    );
};

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
