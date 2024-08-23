import { FC, createContext, useState } from "react";

interface Context {
    searchKeyword: object;
    setSearchKeyword: (keyword: object) => void;
}

const defaultValue: Context = {
    searchKeyword: {},
    setSearchKeyword: () => {},
};

export const ProductContext = createContext(defaultValue);

export const ProductProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    return <ProductContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</ProductContext.Provider>;
};
