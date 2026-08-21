import { io } from "socket.io-client";


function connectWS(){
    const apiUrl = import.meta.env.VITE_API_URL
    console.log(apiUrl)
    return io(apiUrl);
}

export default connectWS;