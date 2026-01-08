"use client";

import fetchData from "@/scripts/account/get-user-info";
import { UserBodyProps } from "@/types/UserBodyProps";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, createContext, use, useContext } from "react";


import '@/public/root/index.scss';
import '@/public/root/pages/modules/2fa/index.scss';
import { useUserData } from "./utils/useUserData";
import axios from "axios";

// Create a context to share data between layout and pages


export const TwoFAContext = createContext<{
    user: UserBodyProps;
} | null>(null);

export function useTwoFAData() {
    const context = useContext(TwoFAContext);
    if (!context) {
        throw new Error('useTwoFAData must be used within TwoFALayout');
    }
    return context;
}

export default function TwoFALayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ action: string, serviceID?: string }>;
}) {
    const pathname = usePathname();
    const parameters = use(params);
    const router = useRouter();
    // Fetch user data on mount

    const [userFetch, setUserFetch] = useState<UserBodyProps | undefined>(undefined);

    useUserData({
        pathname,
        router,
        setUserFetch
    });




    if (!userFetch) {
        return (
            <div className="two-fa__module__layout loading__state">
                <div className="loader__container">
                    <div className="small-loader"></div>
                </div>
            </div>
        );
    }

    if (userFetch) {
        return (
            <TwoFAContext.Provider value={{
                user: userFetch
            }}>
                <div className="two-fa__module__layout">

                    <div className="right__section">
                        <div className="header__content">
                            <img src="https://naflows.com/public/assets/naflows_full_logotype.png" alt="Naflows Logo" className="naflows-logo" />

                            <div className="header__informations">
                                <h2>2FA Required</h2>
                                <p>Naflows requires you to perform an additional step to execute your actions securely.</p>
                            </div>

                        </div>

                        <div className="connection__header">
                            {
                                (userFetch?.profile_picture ?
                                    <img src={userFetch?.profile_picture || "/public/assets/default_avatar.png"} alt="User Avatar" />
                                    :
                                    <div className="default__avatar__placeholder">
                                        {
                                            // @ts-expect-error because first_name and last_name cannot be undefined as userFetch exists (see above)
                                            userFetch?.first_name.charAt(0).toUpperCase()}{userFetch?.last_name.charAt(0).toUpperCase()
                                        }
                                    </div>)
                            }
                            <div className="profile__informations">
                                <span id="user-full-name">{userFetch?.first_name} {userFetch?.last_name}</span>
                                <span id="user-email">{userFetch?.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="left__section">
                        {children}
                    </div>
                </div>
            </TwoFAContext.Provider>
        );
    }
}