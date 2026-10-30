import { Figtree, Inter } from 'next/font/google';
import '@/styles/globals.css';

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${figtree.variable} ${inter.variable} ${inter.className}`}>
      <Component {...pageProps} />
    </div>
  );
}
