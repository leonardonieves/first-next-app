import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link';

export default function Page() {
  return ( <div>
    <h1>Home page</h1>
    <Link href="/note">Notes</Link>
  </div>);
}
