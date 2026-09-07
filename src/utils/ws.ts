import { io } from "socket.io-client";


function connectWS(){
    const apiUrl = import.meta.env.VITE_API_URL;
    return io(apiUrl);
}

export default connectWS;