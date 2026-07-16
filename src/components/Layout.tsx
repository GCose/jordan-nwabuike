import Head from "next/head";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const title =
    "Jordan Nwabuike | Software Engineer & Founder of Jordan In Tech";
  const description =
    "Jordan Nwabuike is a software engineer and the founder of Jordan In Tech, from Banjul, The Gambia. NASA Space Apps Challenge 2025 winner, MRCG AI Hackathon runner-up, and ITCA Software Club team lead. This is his story, from campus internships to founding his own company.";
  const keywords =
    "Jordan Nwabuike, Nwabuike, Jordan, Jordan In Tech, who is Jordan Nwabuike, Jordan Nwabuike Gambia, Jordan Nwabuike The Gambia, Jordan Nwabuike Banjul, Jordan Nwabuike software engineer, Jordan Nwabuike developer, Jordan Nwabuike portfolio, Jordan Nwabuike website, Jordan Nwabuike founder, Jordan Nwabuike CEO, Jordan In Tech founder, Jordan In Tech CEO, Jordan Nwabuike NASA Space Apps, Jordan Nwabuike MRCG AI Hackathon, Jordan Nwabuike ITCA, Jordan Nwabuike University of The Gambia, Jordan Nwabuike UTG, software engineer Gambia, Gambian software engineer, tech founder Gambia, backend developer Gambia, Gambia tech startup, NASA Space Apps Challenge Gambia winner, ITCA Software Club, Jordan Gambia tech, Jordan Banjul";
  const url = "https://jordan.jordanintech.com";
  const ogImage = `${url}/images/portfolio/og.jpg`;
  const personId = `${url}/#person`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}/#profilepage`,
        url,
        name: title,
        description,
        inLanguage: "en",
        dateCreated: "2026-07-14",
        dateModified: "2026-07-15",
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Jordan Nwabuike",
        alternateName: ["Jordan", "Nwabuike", "Jordan C. Nwabuike"],
        description,
        url,
        image: [
          {
            "@type": "ImageObject",
            url: ogImage,
            width: 1200,
            height: 630,
            caption: "Jordan Nwabuike in a green double-breasted suit",
          },
          {
            "@type": "ImageObject",
            url: `${url}/images/portfolio/jordan-portrait.jpg`,
            width: 1500,
            height: 2000,
            caption:
              "Jordan Nwabuike at the Peace Building, University of The Gambia",
          },
        ],
        jobTitle: "Software Engineer & Founder",
        worksFor: {
          "@type": "Organization",
          name: "Jordan In Tech",
          url: "https://jordanintech.com",
        },
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "University of The Gambia",
          },
          { "@type": "Organization", name: "Cayor (Kashma)" },
          { "@type": "Organization", name: "INSIST GLOBAL" },
          { "@type": "Organization", name: "NextGen Software" },
          { "@type": "Organization", name: "Modem Pay" },
        ],
        memberOf: {
          "@type": "Organization",
          name: "ITCA Software Club, University of The Gambia",
        },
        award: [
          "1st Place — NASA Space Apps Challenge 2025 (Banjul)",
          "2nd Place — MRCG AI Hackathon 2025",
        ],
        knowsAbout: [
          "Software Engineering",
          "Backend Development",
          "Payment Systems",
          "Mobile Applications",
          "Web Development",
        ],
        nationality: { "@type": "Country", name: "The Gambia" },
        homeLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Banjul",
            addressCountry: "GM",
          },
        },
        sameAs: [
          "https://github.com/Jordanlopez546/",
          "https://linkedin.com/in/jordan-c-nwabuike",
          "https://jordanintech.com",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: "Jordan Nwabuike",
        inLanguage: "en",
        publisher: { "@id": personId },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Jordan Nwabuike" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b0d12" />
        <meta charSet="utf-8" />

        <link rel="canonical" href={url} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon-512.png"
          type="image/png"
          sizes="512x512"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Jordan Nwabuike in a green double-breasted suit"
        />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Jordan Nwabuike" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <main className="relative min-h-screen">{children}</main>
    </>
  );
};

export default Layout;
