import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { Protal } from "../../../common/potal/Portal";
import { useRecoilState } from "recoil";
import { userInfoModalState } from "../../../../stores/modalState";
import { UserInfoModal } from "../../Management/UserInfo/UserInfoModal";
import { useLocation } from "react-router-dom";

// 직원 리스트
export interface IUserInfoList {
    loginID: string;
    name: string;
    user_type: string;
    hp: string;
    email: string;
}

export interface IUserInfoListResponse {
    userInfoList: IUserInfoList[];
    userInfoListCount: number;
}

export const UserInfoList = () => {
    const { search } = useLocation();
    const [userInfoList, setUserInfoList] = useState<IUserInfoList[]>([]);
    const [userInfoListCount, setUserInfoListCount] = useState<number>(0);
    const [modal, setModal] = useRecoilState<boolean>(userInfoModalState);
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    const [loginID, setLoginID] = useState<string | undefined>("");

    useEffect(() => {
        searchUserInfoList();
    }, [search]);

    const searchUserInfoList = (cpage?: number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append("cpage", cpage.toString());
        searchParam.append("pageSize", "5");

        axios.post("/management/userInfoListJson", searchParam).then((res: AxiosResponse<IUserInfoListResponse>) => {
            setUserInfoList(res.data.userInfoList);
            setUserInfoListCount(res.data.userInfoListCount);
            setCurrentParam(cpage);
        });
    };

    const handlerModal = (loginID?: string) => {
        setModal(!modal);
        setLoginID(loginID);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchUserInfoList();
    };

    return (
        <>
            {/* 총 개수 : {userInfoListCount} 현재 페이지 : {currentParam} */}
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={20}>직원ID</StyledTh>
                        <StyledTh size={20}>직원명</StyledTh>
                        <StyledTh size={20}>직책</StyledTh>
                        <StyledTh size={20}>직원연락처</StyledTh>
                        <StyledTh size={20}>직원이메일</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {userInfoList.length > 0 ? (
                        userInfoList?.map((a) => {
                            return (
                                <tr
                                    key={a.loginID}
                                    onClick={() => {
                                        handlerModal(a.loginID);
                                    }}
                                >
                                    <StyledTd>{a.loginID}</StyledTd>
                                    <StyledTd>{a.name}</StyledTd>
                                    <StyledTd>
                                        {a.user_type === "A"
                                            ? "임원"
                                            : a.user_type === "B"
                                            ? "고객"
                                            : a.user_type === "C"
                                            ? "SCM 관리자"
                                            : a.user_type === "D"
                                            ? "배송 담당자"
                                            : a.user_type === "E"
                                            ? "구매 담당자"
                                            : ""}
                                    </StyledTd>
                                    <StyledTd>{a.hp}</StyledTd>
                                    <StyledTd>{a.email}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={5}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate
                totalItemsCount={userInfoListCount}
                onChange={searchUserInfoList}
                itemsCountPerPage={5}
                activePage={currentParam as number}
            ></PageNavigate>
            {modal ? (
                <Protal>
                    <UserInfoModal loginID={loginID} onSuccess={postSuccess} setLoginID={setLoginID}></UserInfoModal>
                </Protal>
            ) : null}
        </>
    );
};
