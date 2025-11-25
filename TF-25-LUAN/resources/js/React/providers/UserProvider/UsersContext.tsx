import { createContext } from "react";
import { UsersContextValues } from "./users.types";

const UsersContext = createContext<UsersContextValues | undefined>(undefined);

export default UsersContext;