import * as React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import ogImg from '../images/FLS-default-og-image.jpg';

import Layout from '../components/layout';
import Seo from '../components/seo';

const LandingPageIndex = ({ data, location }) => {
    const { t } = useTranslation();

    return (
        <Layout location={location}>
            {/* Your page content */}
        </Layout>
    );
};

export default LandingPageIndex;

export const Head = ({ data, pageContext }) => {
    const language = pageContext.language || 'vie';

    const translationsData = data.translation.data;
    const translations = JSON.parse(translationsData);

    const title = translations.seo.title;
    const description = translations.seo.description;

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
    translation: locale(ns: { eq: "index" }, language: { eq: $language }) {
      data
    }
  }
`;
