'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Loader from "@/global/components/Loader";
import fetchData from "@/scripts/account/get-user-info";

// Create a context to share data between layout and pages
import { createContext, useContext } from 'react';
import AccountHeader from './account-header/AccountHeader';

import '@/public/root/index.scss';
import '@/public/root/pages/account/index.scss';
import { NotificationProvider } from '@/global/action-information/NotificationContent';
import NotificationContainer from '@/global/action-information/NotificationContainer';
import { UserBodyProps } from '@/types/UserBodyProps';
import { getAllServices } from '@/scripts/pages/services/get/get-all';
import { ServicesForUserProps } from '@/types/ServicesForUserProps';


const AccountContext = createContext<{
  userFetch: UserBodyProps;
  setUserFetch: React.Dispatch<React.SetStateAction<UserBodyProps | undefined>>;
  servicesFetch: ServicesForUserProps[];
  setServicesFetch: React.Dispatch<React.SetStateAction<ServicesForUserProps[]>>;
  servicesLoaded?: boolean;
  selectedTab: string | undefined;
} | null>(null);

export const useAccountData = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccountData must be used within AccountLayout');
  }
  return context;
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [userFetch, setUserFetch] = useState<UserBodyProps | undefined>(undefined);
  const [servicesFetch, setServicesFetch] = useState<ServicesForUserProps[]>([]);
  const [selectedTab, setSelectedTab] = useState<string | undefined>(undefined);
  const [servicesLoaded, setServicesLoaded] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  const dir = {
    profile: { val: "user" },
    services: { val: "services" },
    security: { val: "security", active: false },
    billing: { val: "billing", active: false },
    support: { val: "support", active: false },
  };

  // Fetch user data on mount
  useEffect(() => {
    let ignore = false;

    const fetchUserData = async () => {
      try {
        const userData = await fetchData("user");
        if (ignore) return;

        if (userData.data.success === false) {
          router.push(`/auth?redirect=${pathname}`);
          console.error("Failed to fetch user info", userData.data);
          return;
        }

        setUserFetch(userData.data.user);
        setUserLoading(false); // ✅ Don't wait for services
      } catch (error) {
        if (!ignore) {
          console.error("Error fetching user info:", error);
          router.push(`/auth?redirect=${pathname}`);
        }
      }
    };

    fetchUserData();

    return () => {
      ignore = true;
    };
  }, [pathname, router]);

  useEffect(() => {
    if (!userFetch?.id) return;

    let ignore = false;
    const controller = new AbortController();

    const fetchServices = async () => {
      try {
        console.log("Starting services fetch...");
        const serviceData = await getAllServices(controller.signal);
        if (ignore) return;

        if (serviceData.data.success === false) {
          console.error("Failed to fetch services info", serviceData.data);
          setServicesLoaded(true);
          return;
        }

        console.log("Loaded service data:", serviceData.data.services);
        setServicesFetch(serviceData.data.services || []);
        setServicesLoaded(true);
      } catch (error) {
        if (!ignore && error instanceof Error && error.name !== 'CanceledError') {
          console.error("Error fetching services:", error);
          setServicesLoaded(true); // Mark as loaded even on error
        }
      }
    };

    fetchServices();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [userFetch?.id]);

  // Update selected tab based on pathname
  useEffect(() => {
    const pathParts = pathname.split("/");
    const tab = pathParts[2] || "profile";

    if (tab && Object.keys(dir).includes(tab)) {
      setSelectedTab(tab);
      document.title = `Account - ${tab.charAt(0).toUpperCase() + tab.slice(1)}`;
    }
  }, [pathname]);


  // Show loader while fetching initial data
  if (userLoading || !userFetch) {
    return (<></>);
  }

  // Provide context data to all child pages
  const contextValue = {
    userFetch,
    setUserFetch,
    servicesFetch,
    setServicesFetch,
    selectedTab,
    servicesLoaded,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      <NotificationProvider>
        <AccountHeader selectedTab={selectedTab || "profile"} />
        <div className="nass__page">
          {userFetch && children}
        </div>
        <NotificationContainer />
      </NotificationProvider>
    </AccountContext.Provider>
  );

}


export const Metadata = {
  title: "My Account - NASS",
  description: "Access your NASS account and manage your services with Naflows' Authentication Service System.",
};