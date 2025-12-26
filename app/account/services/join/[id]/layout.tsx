'use client';
import { useAccountData } from "@/app/account/layout";
import { getPublicServiceInformations } from "@/scripts/pages/services/get/get-public-infos";
import { ServicesBodyProps } from "@/types/ServicesBodyProps";
import { createContext, use, useContext, useEffect, useState } from "react";



const JoinServiceData = createContext<{
    service: ServicesBodyProps | null;
} | null>(null);

export function useJoinServiceData() {
    return useContext(JoinServiceData);
}

export default function JoinServiceLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{id : string}>;
}) {
    const paramsResolved = use(params);
    const id = paramsResolved.id;

    const {userFetch} = useAccountData();

    const [service, setService] = useState<ServicesBodyProps | null>(null);

    useEffect(() => {
        if (!userFetch || !userFetch.id) {
            console.log("User data not available yet in join layout.");
            return;
        }

        let ignore = false;
        const controller = new AbortController();

        async function fetchData() {
            try {
                const data = await getPublicServiceInformations(id, userFetch.id);
                if (ignore) return;

                console.log("Fetched service data in join layout:", data);
                setService(data);
                if (!ignore) {
                    setService(serviceData);
                } else {
                    console.log("Component unmounted before setting service data.");
                }
            } catch (error) {
                if (!ignore) {
                    console.error("Error fetching service data:", error);
                }
            }
        }

        fetchData();

        return () => {
            ignore = true;
            controller.abort();
        };
    }, [userFetch, id])

    

    return (
        <JoinServiceData.Provider value={{ service: service }}>
            <div className="account__services__join__layout">
                {children}
            </div>
        </JoinServiceData.Provider>
    );
}