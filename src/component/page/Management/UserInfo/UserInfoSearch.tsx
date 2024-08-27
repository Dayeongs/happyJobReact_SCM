import { ChangeEvent, useRef, useState } from "react";
import { Button } from "../../../common/Button/Button";
import { SearchStyled } from "./styled";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoModalState } from "../../../../stores/modalState";

export const UserInfoSearch = () => {
    const searchUserWord = useRef<HTMLInputElement>(null);
    const [modal, setModal] = useRecoilState<boolean>(userInfoModalState);
    const [selectedUser, setSelectedUser] = useState<string>("");
    const navigate = useNavigate();

    const handlerSearch = () => {
        const query: string[] = [];
        !searchUserWord.current?.value || query.push(`searchUserWord=${searchUserWord.current?.value}`);
        !selectedUser || query.push(`selectedUser=${selectedUser}`);
        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/management/userInfo.do${queryString}`);
    };

    const handlerModal = () => {
        setModal(!modal);
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedUser(e.target.value);
    };

    return (
        <SearchStyled>
            <select value={selectedUser} onChange={handleChange}>
                <option value={""} disabled>
                    선택해주세요
                </option>
                <option value={"loginID"}>직원ID</option>
                <option value={"name"}>직원명</option>
                <option value={"user_type"}>직책</option>
                <option value={"hp"}>직원연락처</option>
                <option value={"email"}>직원이메일</option>
            </select>
            <input ref={searchUserWord}></input>
            <Button onClick={handlerSearch}>검색</Button>
            <Button onClick={handlerModal}>직원등록</Button>
        </SearchStyled>
    );
};
