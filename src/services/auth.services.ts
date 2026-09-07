import { toast } from "react-toastify";
import apiClientWraper from "../api/client.ts";

const baseUrl = import.meta.env.VITE_API_URL;

export async function setUserCredentials() {
  try {
    const res = await apiClientWraper.get(`${baseUrl}/api/user/me`);
    localStorage.setItem(
      "info",
      JSON.stringify({
        email: res.data.user.email,
        userName: res.data.user.userName,
        avatar: res.data.user.avatar,
      }),
    );
    return res?.data ?? res;
  } catch (error) {
    console.error(`error: ${error}`);
    toast.error(`error: ${error}`)
  }
}

