"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

import { AssociateObject, AssociateType } from "../types/AssociateType";
import { EventObject } from "../types/EventType";
import { YearResponseType, YearType } from "../types/YearType";
import { UserObject, UserType } from "../types/UserType";

type Workspace = {
  title: string;
  action: any;
  children: ReactNode;
};

type InfoModalMessage = {
  status: number;
  message: string;
};

interface ContextProps {
  backEndURL: string;
  setBackendURL: Dispatch<SetStateAction<string>>;
  user: UserType | undefined;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
  backOfficeUsers: UserObject[];
  setBackOfficeUsers: Dispatch<SetStateAction<UserObject[]>>;
  workspaceIsActive: boolean;
  setWorkspaceIsActive: Dispatch<SetStateAction<boolean>>;
  workspace: Workspace;
  setWorkspace: Dispatch<SetStateAction<Workspace>>;
  backdrop: boolean;
  setBackdrop: Dispatch<SetStateAction<boolean>>;
  activeItem: string;
  setActiveItem: Dispatch<SetStateAction<string>>;
  associatesData: AssociateObject[];
  setAssociatesData: Dispatch<SetStateAction<AssociateObject[]>>;
  associatesWorkData: AssociateObject[];
  setAssociatesWorkData: Dispatch<SetStateAction<AssociateObject[]>>;
  infoModalMessage: InfoModalMessage;
  setInfoModalMessage: Dispatch<SetStateAction<InfoModalMessage>>;
  eventArray: EventObject[];
  setEventArray: Dispatch<SetStateAction<EventObject[]>>;
  yearData: YearResponseType[];
  setYearData: Dispatch<SetStateAction<YearResponseType[]>>;
  eventData: EventObject[];
  setEventData: Dispatch<SetStateAction<EventObject[]>>;
}

const GlobalContext = createContext<ContextProps>({
  backEndURL: "",
  setBackendURL: (): string => "",
  user: {
    accessToken: undefined,
    email: undefined,
    name: undefined,
    profilePhoto: undefined,
    uid: undefined,
  },
  setUser: (): void => {},
  backOfficeUsers: [],
  setBackOfficeUsers: (): UserObject[] => [],
  workspaceIsActive: false,
  setWorkspaceIsActive: (): boolean => false,
  workspace: {
    title: "",
    action: null,
    children: null,
  },
  setWorkspace: (): void => {},
  backdrop: false,
  setBackdrop: (): boolean => false,
  activeItem: "",
  setActiveItem: (): string => "",
  associatesData: [],
  setAssociatesData: (): AssociateObject[] => [],
  associatesWorkData: [],
  setAssociatesWorkData: (): AssociateObject[] => [],
  infoModalMessage: { status: 500, message: "" },
  setInfoModalMessage: (): void => {},
  eventArray: [],
  setEventArray: (): EventObject[] => [],
  yearData: [],
  setYearData: (): YearResponseType[] => [],
  eventData: [],
  setEventData: (): EventObject[] => [],
});

export const GlobalContextProvider = ({ children }: any) => {
  const [backEndURL, setBackendURL] = useState<string>(
    "http://localhost:8000/"
  );
  const [user, setUser] = useState<UserType>();
  const [workspaceIsActive, setWorkspaceIsActive] = useState<boolean>(false);
  const [workspace, setWorkspace] = useState<Workspace>({
    title: "",
    action: null,
    children: null,
  });
  const [backdrop, setBackdrop] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("");
  const [associatesData, setAssociatesData] = useState<AssociateObject[]>([]);
  const [associatesWorkData, setAssociatesWorkData] = useState<
    AssociateObject[]
  >([]);
  const [infoModalMessage, setInfoModalMessage] = useState<InfoModalMessage>({
    status: 200,
    message: "Carregando...",
  });
  const [eventArray, setEventArray] = useState<EventObject[]>([]);
  const [yearData, setYearData] = useState<YearResponseType[]>([]);
  const [eventData, setEventData] = useState<EventObject[]>([]);
  const [backOfficeUsers, setBackOfficeUsers] = useState<UserObject[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        backEndURL,
        setBackendURL,
        user,
        setUser,
        backOfficeUsers,
        setBackOfficeUsers,
        workspaceIsActive,
        setWorkspaceIsActive,
        workspace,
        setWorkspace,
        backdrop,
        setBackdrop,
        activeItem,
        setActiveItem,
        associatesData,
        setAssociatesData,
        infoModalMessage,
        setInfoModalMessage,
        associatesWorkData,
        setAssociatesWorkData,
        eventArray,
        setEventArray,
        yearData,
        setYearData,
        eventData,
        setEventData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
