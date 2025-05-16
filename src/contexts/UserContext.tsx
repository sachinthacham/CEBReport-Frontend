import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  Userno: string;
  Name: string;
  Designation: string;
  TelephoneNo: string;
  NIC_no: string;
  salary_scale: string;
  Private_Addr: string;
  Email: string;
  Vip: string;
  Status: string | null;
  Common_exception: string | null;
  Errormsg: string | null;
  Logged: boolean;
};

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const userContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    Userno: "",
    Name: "",
    Designation: "",
    TelephoneNo: "",
    NIC_no: "",
    salary_scale: "",
    Private_Addr: "",
    Email: "",
    Vip: "",
    Status: "",
    Common_exception: "",
    Errormsg: "",
    Logged: false,
  });

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("User must be used within userprovider");
  }
  return context;
};
