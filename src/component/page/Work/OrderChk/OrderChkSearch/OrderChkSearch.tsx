import { useContext, useState } from "react";
import { Button } from "../../../../common/Button/Button";
import { OrderChkSearchStyled } from "./styled";
import { OrderChkContext } from "../../../../../api/provider/OrderChkProvider";
import {
    defaultSearchValue,
    ISearch,
} from "../../../../../models/interface/Work/WorkModel";

export const OrderChkSearch = () => {
    // 업체, 제품
    const [input, setInput] = useState<ISearch>(defaultSearchValue);
    const { setSearchKeyword } = useContext(OrderChkContext);
    const today = new Date();
    const year = today.getFullYear();
    const month = ("00" + (today.getMonth() + 1).toString()).slice(-2);
    const day = ("00" + today.getDate().toString()).slice(-2);

    // 검색버튼 조회
    const handlerSearch = () => {
        setSearchKeyword(input);
    };

    return (
        <OrderChkSearchStyled>
            <select
                defaultValue="company"
                onChange={(e) =>
                    setInput({ ...input, searchSelect: e.currentTarget.value })
                }
            >
                <option value={"company"}>업체</option>
                <option value={"product"}>제품</option>
            </select>
            <input
                onChange={(e) =>
                    setInput({ ...input, searchTitle: e.currentTarget.value })
                }
            ></input>
            기간
            <input
                type="date"
                defaultValue={`${year}-${month}-01`}
                onChange={(e) =>
                    setInput({ ...input, searchStDate: e.target.value })
                }
            ></input>
            <input
                type="date"
                defaultValue={`${year}-${month}-${day}`}
                onChange={(e) =>
                    setInput({ ...input, searchEdDate: e.target.value })
                }
            ></input>
            <Button paddingtop={5} paddingbottom={5} onClick={handlerSearch}>
                검색
            </Button>
        </OrderChkSearchStyled>
    );
};
