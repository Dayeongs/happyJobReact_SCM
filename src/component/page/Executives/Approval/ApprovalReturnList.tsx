import { useEffect, useState } from "react";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import axios, { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { returnModalState } from "../../../../stores/modalState";
import { ApprovalReturnModal } from "./ApprovalReturnModal";
import { Protal } from "../../../common/potal/Portal";
import { ApprovalButtonStyled } from "./styled";

// 반품입금승인 리스트
export interface IReturnList {
    cust_name: string;
    item_name: string;
    adr: string;
    return_count: number;
    item_price: number;
    sum: number;
    return_order_date: string;
    return_processing_date: string;
    signYN: string;
    seq: number;
}

export interface IReturnListResponse {
    returnListCount: number;
    returnList: IReturnList[];
}

export const ApprovalReturnList = () => {
    const [returnList, setReturnList] = useState<IReturnList[]>([]);
    const [returnListCount, setReturnListCount] = useState<number>(0);
    const [returnModal, setReturnModal] = useRecoilState<boolean>(returnModalState);
    const [returnSeq, setReturnSeq] = useState<number>();
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    const [selectedOption, setSelectedOption] = useState<string | undefined>("");

    useEffect(() => {
        searchReturnList();
    }, []);

    const searchReturnList = (cpage?: number, signYN?: string) => {
        cpage = cpage || 1;
        signYN = signYN || "";
        const searchParam = new URLSearchParams();

        searchParam.append("cpage", cpage.toString());
        searchParam.append("pageSize", "5");
        searchParam.append("signYN", signYN);

        axios.post("/executives/returnApprovalJson", searchParam).then((res: AxiosResponse<IReturnListResponse>) => {
            setReturnList(res.data.returnList);
            setReturnListCount(res.data.returnListCount);
            setCurrentParam(cpage);
        });
    };

    const handlerEvent = (signYN?: string) => {
        setSelectedOption(signYN);
        searchReturnList(1, signYN);
    };

    const handlerModal = (seq?: number) => {
        setReturnModal(!returnModal);
        setReturnSeq(seq);
    };

    const postSuccess = () => {
        setReturnModal(!returnModal);
        searchReturnList();
    };

    return (
        <>
            <div className={"returnRadioBt"} style={{ textAlign: "right", marginRight: 10 }}>
                <label>
                    <input
                        type="radio"
                        name="returnRadio"
                        onChange={() => handlerEvent("")}
                        checked={selectedOption === ""}
                    />
                    전체
                </label>
                <label>
                    <input
                        type="radio"
                        name="returnRadio"
                        onChange={() => handlerEvent("Y")}
                        checked={selectedOption === "Y"}
                    />
                    승인
                </label>
                <label>
                    <input
                        type="radio"
                        name="returnRadio"
                        onChange={() => handlerEvent("N")}
                        checked={selectedOption === "N"}
                    />
                    미승인
                </label>
            </div>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={10}>고객명</StyledTh>
                        <StyledTh size={10}>제품명</StyledTh>
                        <StyledTh size={18}>주소</StyledTh>
                        <StyledTh size={12}>가격</StyledTh>
                        <StyledTh size={5}>개수</StyledTh>
                        <StyledTh size={15}>총 가격</StyledTh>
                        <StyledTh size={10}>반품신청일자</StyledTh>
                        <StyledTh size={10}>반품처리일자</StyledTh>
                        <StyledTh size={10}>승인여부</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {returnList.length > 0 ? (
                        returnList?.map((a) => {
                            return (
                                <tr>
                                    <StyledTd>{a.cust_name}</StyledTd>
                                    <StyledTd>{a.item_name}</StyledTd>
                                    <StyledTd>{a.adr}</StyledTd>
                                    <StyledTd>{a.item_price.toLocaleString()}원</StyledTd>
                                    <StyledTd>{a.return_count.toLocaleString()}</StyledTd>
                                    <StyledTd>{a.sum.toLocaleString()}원</StyledTd>
                                    <StyledTd>{a.return_order_date}</StyledTd>
                                    <StyledTd>{a.return_processing_date}</StyledTd>
                                    <StyledTd>
                                        <ApprovalButtonStyled>
                                            <button
                                                disabled={a.signYN === "Y"}
                                                onClick={() => handlerModal(a.seq)}
                                                className={a.signYN === "Y" ? "disabled-button" : "enabled-button"}
                                            >
                                                {a.signYN === "Y" ? "승인완료" : "승인대기"}
                                            </button>
                                        </ApprovalButtonStyled>
                                    </StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={9}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate
                totalItemsCount={returnListCount}
                onChange={searchReturnList}
                itemsCountPerPage={5}
                activePage={currentParam as number}
            ></PageNavigate>
            {returnModal ? (
                <Protal>
                    <ApprovalReturnModal
                        returnSeq={returnSeq}
                        onSuccess={postSuccess}
                        setReturnSeq={setReturnSeq}
                    ></ApprovalReturnModal>
                </Protal>
            ) : null}
        </>
    );
};
