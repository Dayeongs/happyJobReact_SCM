import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { Protal } from "../../../common/potal/Portal";
import { useRecoilState } from "recoil";
import { custInfoModalState } from "../../../../stores/modalState";
import { CustInfoModal } from "../../Management/UserInfo/CustInfoModal";
import { useLocation } from "react-router-dom";

// 기업고객 리스트
export interface ICustInfoList {
    cust_id: number;
    cust_name: string;
    cust_person: string;
    cust_person_ph: string;
    cust_email: string;
}

export interface ICustInfoListResponse {
    custInfoList: ICustInfoList[];
    custInfoListCount: number;
}

export const CustInfoList = () => {
    const { search } = useLocation();
    const [custInfoList, setCustInfoList] = useState<ICustInfoList[]>([]);
    const [custInfoListCount, setCustInfoListCount] = useState<number>(0);
    const [modal, setModal] = useRecoilState<boolean>(custInfoModalState);
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    const [custId, setCustId] = useState<number | undefined>();

    useEffect(() => {
        searchCustInfoList();
    }, [search]);

    const searchCustInfoList = (cpage?: number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append("cpage", cpage.toString());
        searchParam.append("pageSize", "5");

        axios.post("/management/custInfoListJson", searchParam).then((res: AxiosResponse<ICustInfoListResponse>) => {
            setCustInfoList(res.data.custInfoList);
            setCustInfoListCount(res.data.custInfoListCount);
            setCurrentParam(cpage);
        });
    };

    const handlerModal = (custId?: number) => {
        setModal(!modal);
        setCustId(custId);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchCustInfoList();
    };

    return (
        <>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={25}>기업고객명</StyledTh>
                        <StyledTh size={25}>담당자명</StyledTh>
                        <StyledTh size={25}>담당자연락처</StyledTh>
                        <StyledTh size={25}>담당자이메일</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {custInfoList.length > 0 ? (
                        custInfoList?.map((a) => {
                            return (
                                <tr
                                    key={a.cust_id}
                                    onClick={() => {
                                        handlerModal(a.cust_id);
                                    }}
                                >
                                    <StyledTd>{a.cust_name}</StyledTd>
                                    <StyledTd>{a.cust_person}</StyledTd>
                                    <StyledTd>{a.cust_person_ph}</StyledTd>
                                    <StyledTd>{a.cust_email}</StyledTd>
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
                totalItemsCount={custInfoListCount}
                onChange={searchCustInfoList}
                itemsCountPerPage={5}
                activePage={currentParam as number}
            ></PageNavigate>
            {modal ? (
                <Protal>
                    <CustInfoModal custId={custId} onSuccess={postSuccess} setCustId={setCustId}></CustInfoModal>
                </Protal>
            ) : null}
        </>
    );
};
