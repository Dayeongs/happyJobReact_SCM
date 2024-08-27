import { useContext, useState } from "react";
import { Button } from "../../../common/Button/Button";
import { InquirySearchStyled } from "./styled";
import { InquiryContext } from "../../../../api/provider/InquiryProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";

export const InquirySearch = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const { setSearchKeyword } = useContext(InquiryContext);
    const [input, setInput] = useState<{
        searchTitle?: string;
        searchStDate?: string;
        searchEdDate?: string;
    }>({
        searchTitle: "",
        searchStDate: "",
        searchEdDate: "",
    });

    const handlerSearch = () => {
        setSearchKeyword(input);
    };

    const handlerModal = () => {
        setModal(!modal);
    };

    return (
        <InquirySearchStyled style={{ marginTop: -55 }}>
            <label>제목 </label>
            <input onChange={(e) => setInput({ ...input, searchTitle: e.currentTarget.value })}></input>
            <label>기간 </label>
            <input type="date" onChange={(e) => setInput({ ...input, searchStDate: e.currentTarget.value })}></input>~{" "}
            <input type="date" onChange={(e) => setInput({ ...input, searchEdDate: e.currentTarget.value })}></input>
            <Button onClick={handlerSearch}>검색</Button>
            <Button onClick={handlerModal}>등록</Button>
        </InquirySearchStyled>
    );
};
