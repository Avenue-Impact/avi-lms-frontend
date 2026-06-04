import { Helmet } from "react-helmet-async";

/**
 * SEOHead — drop-in per-page SEO head component.
 * @param {string} title - Page title (50–60 chars recommended)
 * @param {string} description - Meta description (150–160 chars recommended)
 * @param {string} [canonical] - Canonical URL for this page
 * @param {string} [ogImage] - Open Graph image URL
 */
const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = "https://avenueimpact.com/mobile-dark.png",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImage} />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEOHead;
