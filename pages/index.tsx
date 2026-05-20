import dynamic from 'next/dynamic';
import Head from 'next/head';
const InsuranceOptimizer = dynamic(() => import('../src/components/InsuranceOptimizer'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Smart Insurance Deductible Optimizer | SmartInsuredReserve</title>
        <meta name="description" content="Build your self-insurance reserve fund and optimize your deductibles over time. Calculate required reserves based on policy parameters and risk factors." />
        <meta property="og:title" content="Smart Insurance Deductible Optimizer" />
        <meta property="og:description" content="Build your self-insurance reserve fund and optimize your deductibles over time." />
        <meta property="og:type" content="website" />
      </Head>
      <InsuranceOptimizer />
    </>
  );
}
