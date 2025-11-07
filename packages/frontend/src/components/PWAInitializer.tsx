'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '@/utils/registerSW';

export default function PWAInitializer() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  // This component doesn't render anything
  return null;
}