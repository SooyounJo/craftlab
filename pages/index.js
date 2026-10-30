import Head from 'next/head';
import { useState } from 'react';
import Frame from '@/components/Frame';
import ScaleFrame from '@/components/ScaleFrame';

export default function Home() {
  const [lang, setLang] = useState('en');

  return (
    <>
      <Head>
        <title>CRAFT Lab</title>
        <meta
          name="description"
          content="CRAFT Lab — Robot as Cultural Medium. Arts, Fabrication, Technology."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ScaleFrame>
        <Frame lang={lang} onLang={setLang} />
      </ScaleFrame>
    </>
  );
}
