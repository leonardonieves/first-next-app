import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link';
import { Button, Typography } from '@mui/material';

export default function Page() {
  return (
    <div>
      <Typography variant="h2">Dashboard</Typography>
      <Button component={Link} href="/note" variant="contained" color="primary">
        Go to Notes
      </Button>
    </div>
  );
}
