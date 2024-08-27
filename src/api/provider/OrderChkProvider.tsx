import { FC, createContext, useState } from "react";

interface Context {
    searchKeyword: object;
    setSearchKeyword: (keyword: object) => void;
}

const defaultValue: Context = {
    searchKeyword: {},
    setSearchKeyword: () => {},
};

export const OrderChkContext = createContext(defaultValue);

export const OrderChkProvider: FC<{
    children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    return (
        <OrderChkContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </OrderChkContext.Provider>
    );
};
