'use client';

import { useAccountData } from '../layout';
import ServicesComponent from '../sub-components/Services';

export default function ServicesPage() {
  const { servicesFetch } = useAccountData();

  return <ServicesComponent servicesData={servicesFetch} />;
}
