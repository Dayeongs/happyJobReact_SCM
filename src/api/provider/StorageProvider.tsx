import { FC, createContext, useState } from "react";

interface Context {
    searchKeyword: string;
    setSearchKeyword: (searchKeyword: string) => void;
}

const defaultValue: Context = {
    searchKeyword: "",
    setSearchKeyword: () => {},
};

export const StorageContext = createContext(defaultValue);

export const StorageProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState("");
    return <StorageContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</StorageContext.Provider>;
};
