import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./components/Layout";
import { createContext, useContext } from "react";
import { useState, ReactNode } from "react";
import Swal from "sweetalert2";
import Head from "next/head";

export interface User {
  currentUserEmail?: string;
  email: string;
  firstname?: string;
  lastname?: string;
  password: string;
  date: string;
  role: string;
  avatar: string;
}

export interface AuthProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        setUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UseUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    Swal.fire({
      icon: "warning",
      position: "center",
      title: "useUser must be used within a UserProvider",
    });
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DRSChecker | Depression Rating Scale Checker</title>
      </Head>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
}
