import { io } from "socket.io-client";


function connectWS(){
    return io("http://localhost:4000");
}

export default connectWS;