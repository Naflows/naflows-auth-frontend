'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to profile by default
    router.replace('/account/me');
  }, [router]);

  return null; // or a loader
}