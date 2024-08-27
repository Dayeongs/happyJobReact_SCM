import { useEffect, useState } from "react";
import { Button } from "../../../common/Button/Button";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { OrderCompanyMainStyled } from "./styled";
import { Protal } from "../../../common/potal/Portal";
import { OrderCompanyModal } from "../OrderCompanyModal/OrderCompanyModal";
import { OrderCompanyDetailModal } from "../OrderCompanyModal/OrderCompanyDetailModal ";

export interface IOrderCompanyList{
    company_seq: number;
    company_name: string;
}

export interface IOrderCompanyListJsonResponse {
    listCount: number;
    orderCompanyList: IOrderCompanyList[];
}


export const OrderCompanyMain = () => {
    const { search } = useLocation();
    const [orderCompanyList, setOrderComapnyList] = useState<IOrderCompanyList[]>([]);
    const [listCount, setListCount] = useState<number>(0);
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    const [registModal, setRegistModal] = useState<boolean>(false);
    const [detailModal, setDetailModal] = useState<boolean>(false);
    const [companySeq, setCompanySeq] = useState<number>(0);

    useEffect(() => {
        searchOrderCompanyList();
    }, [search]);

    const searchOrderCompanyList = (cpage?: number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append('cpage', cpage.toString());
        searchParam.append('pageSize', '5');

        axios.post('/management/orderCompanyListJson.do', searchParam).then((res: AxiosResponse<IOrderCompanyListJsonResponse>) => {
            setOrderComapnyList(res.data.orderCompanyList);
            setListCount(res.data.listCount);
            setCurrentParam(cpage);
        });
    };

    const handlerDetailModal = (seq: number) => {
        setDetailModal(!detailModal);
        setCompanySeq(seq);
    };

    const handlerRegistModal = () => {
        setRegistModal(!registModal);
    };

    return(
        <>
            <OrderCompanyMainStyled>
                <div className="btn">
                    <Button onClick={handlerRegistModal}>업체 등록</Button>
                </div>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTh size={20}>업체번호</StyledTh>
                            <th>업체이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderCompanyList.length > 0 ? (
                            orderCompanyList?.map((a) => {
                                return (
                                    <tr key={a.company_seq} onClick={() => handlerDetailModal(a.company_seq)}>
                                        <StyledTd>{a.company_seq}</StyledTd>
                                        <StyledTd>{a.company_name}</StyledTd>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <StyledTd colSpan={2}>데이터가 없습니다.</StyledTd>
                            </tr>
                        )}
                    </tbody>
                </StyledTable>
            </OrderCompanyMainStyled>
            <PageNavigate
                totalItemsCount={listCount}
                onChange={searchOrderCompanyList}
                itemsCountPerPage={5}
                activePage={currentParam as number}
            ></PageNavigate>
            <Protal>
                {registModal ? (<OrderCompanyModal onSuccess={() => setRegistModal(false)}></OrderCompanyModal>) : null}
                {detailModal ? (<OrderCompanyDetailModal onSuccess={() => setDetailModal(false)} company_seq={companySeq}></OrderCompanyDetailModal>) : null}
            </Protal>
        </>
    );
};