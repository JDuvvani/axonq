"use client";

import { io, Socket } from "socket.io-client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { env } from "@/env/client";
import { useAuth } from "@clerk/nextjs";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket | null => useContext(SocketContext);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const initialized = useRef(false);

  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (socket && !isSignedIn) {
      socket.disconnect();
      setSocket(null);
      return;
    }

    const connect = async () => {
      const token = await getToken();

      if (initialized.current || !token) return;

      const socketIO = io(env.NEXT_PUBLIC_API_URL, { auth: { token } });

      setSocket(socketIO);

      initialized.current = true;
    };

    connect();

    return () => {
      socket?.disconnect();
    };
  }, [isSignedIn, socket, getToken]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
