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


const AccountContext = createContext<{
  userFetch: any;
  setUserFetch: React.Dispatch<React.SetStateAction<any>>;
  servicesFetch: any[];
  setServicesFetch: React.Dispatch<React.SetStateAction<any[]>>;
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

  const [userFetch, setUserFetch] = useState(undefined);
  const [servicesFetch, setServicesFetch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState();

  const dir = {
    profile: { val: "user" },
    services: { val: "services" },
    security: { val: "security", active: false },
    billing: { val: "billing", active: false },
    support: { val: "support", active: false },
  };

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchData("user");

        if (userData.data.success === false) {
          router.push(`/auth?redirect=${pathname}`);
          console.error("Failed to fetch user info", userData.data);
          return;
        }

        setUserFetch(userData.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user info:", error);
        router.push(`/auth?redirect=${pathname}`);
      }
    };

    fetchUserData();
  }, [pathname, router]);

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
  if (loading || !userFetch) {
    return (<></>);
  }

  // Provide context data to all child pages
  const contextValue = {
    userFetch,
    setUserFetch,
    servicesFetch,
    setServicesFetch,
    selectedTab,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      <NotificationProvider>
        <AccountHeader userFetch={userFetch} selectedTab={selectedTab || "profile"} />
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