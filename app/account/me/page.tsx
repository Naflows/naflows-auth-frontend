'use client';

import { useAccountData } from '../layout';
import AccountUserBody from '../sub-components/UserBody';

export default function MePage() {
    const { userFetch, setUserFetch } = useAccountData();

    return <AccountUserBody userData={userFetch} setUserData={setUserFetch} />;
}

export const Metadata = {
    title: 'My Account - Profile',
    description: 'Manage your account profile and settings.',
};