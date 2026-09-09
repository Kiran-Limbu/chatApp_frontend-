import { toast } from "react-toastify";
import apiClientWraper from "../api/client.ts";


export async function setUserCredentials() {
  try {
    const res = await apiClientWraper.get("/api/user/me");
   
    localStorage.setItem(
      "info",
      JSON.stringify({
        email: res.data[0].email,
        userName: res.data[0].userName,
        avatar: res.data[0].avatar,
      }),
    );
  } catch (error) {
    console.error(`error: ${error}`);
    toast.error(`error: ${error}`)
  }
}

