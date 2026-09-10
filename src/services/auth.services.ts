import apiClientWraper from "../api/client.ts";

export async function setUserCredentials(id: any) {
  try {
    const res = await apiClientWraper.get(`/api/user/get/${id}`);

    return res.data;
  } catch (error) {
    throw error
  }
}

export async function logoutUser(){
   const res = await apiClientWraper.get(`/api/user/logout`);
   return res;
}
