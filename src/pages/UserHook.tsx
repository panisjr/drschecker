import { useContext } from "react";
import Swal from "sweetalert2";
import { UserContext } from "./UserContext"; 

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