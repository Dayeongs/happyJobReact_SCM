import { useContext, useState } from "react";
import { Button } from "../../../common/Button/Button";
import { StorageSearchStyled } from "./styled";
import { StorageContext } from "../../../../api/provider/StorageProvider";

export const StorageSearch = () => {
    const { setSearchKeyword } = useContext(StorageContext);
    const [input, setInput] = useState<string>("");

    const handlerSearch = () => {
        setSearchKeyword(input);
    };

    return (
        <StorageSearchStyled style={{ marginTop: -55 }}>
            <label>창고 이름 </label>
            <input onChange={(e) => setInput(e.target.value)}></input>
            <Button onClick={handlerSearch}>검색</Button>
        </StorageSearchStyled>
    );
};
