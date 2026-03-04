import dynamic from 'next/dynamic';
const InsuranceOptimizer = dynamic(() => import('../src/components/InsuranceOptimizer'), { ssr: false });

export default function Home() {
  return <InsuranceOptimizer />;
}
