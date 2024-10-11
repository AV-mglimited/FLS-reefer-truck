// src/components/seo.js

import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ title, description, image, lang }) => {
    const { site } = useStaticQuery(
        graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            defaultImage: image
            siteUrl
          }
        }
      }
    `
    );

    const {
        defaultTitle,
        defaultDescription,
        defaultImage,
        siteUrl,
    } = site.siteMetadata;

    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        lang: lang || 'vi',
    };

    return (
        <Helmet htmlAttributes={{ lang: seo.lang }}>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />

            {/* OpenGraph tags */}
            <meta property="og:url" content={`${siteUrl}`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
        </Helmet>
    );
};

export default SEO;
