import React from "react";
import Head from "next/head";
import { SEOProps } from "@/lib/types";

const SEO = ({ fullTitle, description, canonicalUrl, ogImage, jsonLd }: SEOProps) => {
    const fulltitle = `${fullTitle} | Kirie Scripts`;
    const canonicalurl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : undefined);


    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            {ogImage && <meta property="og:image" content={ogImage} />}
            <meta property="og:type" content="article" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            {ogImage && <meta name="twitter:image" content={ogImage} />}

            {/* JSON-LD Structured Data */}
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
        </Head>
    );
};

export default SEO;
