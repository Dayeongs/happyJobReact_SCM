import { ChangeEvent, useRef, useState } from "react";
import { Button } from "../../../common/Button/Button";
import { SearchStyled } from "./styled";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { custInfoModalState } from "../../../../stores/modalState";

export const CustInfoSearch = () => {
    const searchCustWord = useRef<HTMLInputElement>(null);
    const [modal, setModal] = useRecoilState<boolean>(custInfoModalState);
    const [selectedCust, setSelectedCust] = useState<string>("");
    const navigate = useNavigate();

    const handlerSearch = () => {
        const query: string[] = [];
        !searchCustWord.current?.value || query.push(`searchCustWord=${searchCustWord.current?.value}`);
        !selectedCust || query.push(`selectedCust=${selectedCust}`);
        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/management/userInfo.do${queryString}`);
    };

    const handlerModal = () => {
        setModal(!modal);
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCust(e.target.value);
    };

    return (
        <SearchStyled>
            <select value={selectedCust} onChange={handleChange}>
                <option value={""} disabled>
                    선택해주세요
                </option>
                <option value={"cust_name"}>기업고객명</option>
                <option value={"cust_person"}>담당자명</option>
                <option value={"cust_person_ph"}>담당자연락처</option>
                <option value={"cust_email"}>담당자이메일</option>
            </select>
            <input ref={searchCustWord}></input>
            <Button onClick={handlerSearch}>검색</Button>
            <Button onClick={handlerModal}>기업고객등록</Button>
        </SearchStyled>
    );
};
