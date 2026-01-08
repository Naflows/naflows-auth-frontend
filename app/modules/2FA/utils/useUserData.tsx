"use client";

import fetchData from "@/scripts/account/get-user-info";
import { UserBodyProps } from "@/types/UserBodyProps";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect } from "react";


export const useUserData = ({
    pathname, router, setUserFetch
} : {
    pathname: string;
    router: AppRouterInstance;
    setUserFetch: React.Dispatch<React.SetStateAction<UserBodyProps | undefined>>;
}) => {
    useEffect(() => {
        let ignore = false;

        const fetchUserData = async () => {
            try {
                const userData = await fetchData("user");
                if (ignore) return;

                const wholeURL = new URL(window.location.href);
                

                if (userData.data.success === false) {
                    router.push(`/auth?redirect=${wholeURL}`);
                    console.error("Failed to fetch user info", userData.data);
                    return;
                }

                setUserFetch(userData.data.user);
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
}