import dynamic from 'next/dynamic';
import Head from 'next/head';
import { buildSocialMetaTags, buildWebApplicationJsonLd } from '../src/lib/seo';

const InsuranceOptimizer = dynamic(() => import('../src/components/InsuranceOptimizer'), { ssr: false });

export default function Home() {
  const socialMetaTags = buildSocialMetaTags();
  const webApplicationJsonLd = buildWebApplicationJsonLd();

  return (
    <>
      <Head>
        <title>Smart Insurance Deductible Optimizer | SmartInsuredReserve</title>
        <meta name="description" content="Build your self-insurance reserve fund and optimize your deductibles over time. Calculate required reserves based on policy parameters and risk factors." />
        <meta property="og:title" content="Smart Insurance Deductible Optimizer" />
        {socialMetaTags.map((entry) => (
          entry.property
            ? <meta key={entry.property} property={entry.property} content={entry.content} />
            : <meta key={entry.name} name={entry.name} content={entry.content} />
        ))}
        <meta property="og:description" content="Build your self-insurance reserve fund and optimize your deductibles over time." />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
        />
      </Head>
      <InsuranceOptimizer />
    </>
  );
}
