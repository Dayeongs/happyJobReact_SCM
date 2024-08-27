import { FC, createContext, useState } from "react";

interface Context {
    searchKeyword: object;
    setSearchKeyword: (keyword: object) => void;
}

const defaultValue: Context = {
    searchKeyword: {},
    setSearchKeyword: () => {},
};

export const InquiryContext = createContext(defaultValue);

export const InquiryProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    return <InquiryContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</InquiryContext.Provider>;
};
