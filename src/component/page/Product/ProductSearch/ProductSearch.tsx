import { useContext, useState } from "react";
import { ProductContext } from "../../../../api/provider/ProductProvider";
import { ProductSearchStyled } from "./styled";
import { Button } from "../../../common/Button/Button";

export const ProductSearch = () => {
    const { setSearchKeyword } = useContext(ProductContext);
    const [input, setInput] = useState<{
        search_type: string;
        search_title: string;
    }>({
        search_type: "",
        search_title: "",
    });

    const handlerSearch = () => {
        setSearchKeyword(input);
    };

    return (
        <ProductSearchStyled>
            <select defaultValue={""} onChange={(e) => setInput({ ...input, search_type: e.currentTarget.value })}>
                <option value="">선택</option>
                <option value={"equipment_type"}>장비</option>
                <option value={"item_name"}>제품명</option>
                <option value={"manufac"}>제조사</option>
            </select>
            <input onChange={(e) => setInput({ ...input, search_title: e.target.value })}></input>
            <Button onClick={handlerSearch}>검색</Button>
        </ProductSearchStyled>
    );
};
