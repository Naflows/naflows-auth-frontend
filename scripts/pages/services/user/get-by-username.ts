import axios from "axios";



export async function getUsersByUsername(username: string): Promise<{
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
}[] | []> {
    axios.get(`${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/public/user/${username}`, {
        withCredentials: false,
    }).then((response) => {
        console.log("Fetched users for username filter:", response.data);
        return response.data.users;
    }).catch((error) => {
        console.error("Error fetching users for username filter:", error);
        return [];
    });

    return []; // Fallback return in case of error
}