import axios from "axios";


export async function generateTwoFACode(action: string, serviceID?: string) : Promise<{ success: boolean; data?: {
    codeSent: boolean;
}; error?: object }> {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DUMMY_API_URL_DEV}/user/secure/2FA/generate-code`, {
        action: action,
        data: {
            serviceID: serviceID
        }
    },
        {
            withCredentials: true
        }
    ).then(response => {
        console.log("2FA code generation response:", response.data);
        // Add a parameter to the current URL without reloading the page
        return {
            success: true, data: response.data
        }
    }).catch(error => {
        console.error("Error during 2FA code generation:", error);
        return {
            success: false, error: error
        }
    })
    return res;
}