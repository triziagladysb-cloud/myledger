'use client';

import dynamic from 'next/dynamic';

const MyLedger = dynamic(() => import('./MyLedger'), { ssr: false });

export default function Page() {
  return <MyLedger />;
}
