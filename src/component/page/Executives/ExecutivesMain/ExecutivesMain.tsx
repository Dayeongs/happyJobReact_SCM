import { useLocation } from "react-router-dom";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { Protal } from "../../../common/potal/Portal";
import {
  StyledTable,
  StyledTd,
  StyledTh,
} from "../../../common/styled/StyledTable";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { IExecutiveList } from "../../../../models/interface/executiveSales/executiveSalesModel";

export interface IExecutiveListJsonResponse {
  list: IExecutiveList[];
  salesPage: number;
}

export const ExecutiveMain = () => {
  const { search } = useLocation();
  const [executivesList, setExecutivesList] = useState<IExecutiveList[]>([]);
  const [salesTolalPage, setSalesTolalPage] = useState<number>(0); //총페이지
  const [currentpageParm, setCurrentPageParam] = useState<number>(); //현재페이지

  //0은 자바스크립트처럼 값이 할당 되면 a의 타입이 정해지고
  //number는 제네릭 타입 자바와 동일함
  /*const [a, functionToChangeA ] = useState(0);
  const [a, functionToChangeA ] = useState<number>(0);
  */

  //document.()와 같은거
  useEffect(() => {
    searchExecutiveList();
  }, [search]);

  const searchExecutiveList = (cpage?: number) => {
    cpage = cpage || 1;
    const searchParam = new URLSearchParams(search);

    searchParam.append("currentPage", cpage.toString());
    searchParam.append("pageSize", "5");
    console.log(searchParam);

    axios
      .post("/executives/salesListJson.do", searchParam)
      .then((res: AxiosResponse<IExecutiveListJsonResponse>) => {
        console.log(res.data.list);
        setExecutivesList(res.data.list);
        setSalesTolalPage(res.data.salesPage);
        setCurrentPageParam(cpage);
      });
  };
  return (
    <>
      현재페이지 : {currentpageParm} , 총 row 수 {salesTolalPage}
      <StyledTable>
        <thead>
          <tr>
            <StyledTh size={15}>고객명</StyledTh>
            <StyledTh size={30}>매출</StyledTh>
            <StyledTh size={30}>미수금</StyledTh>
            <StyledTh size={30}>총액</StyledTh>
          </tr>
        </thead>
        <tbody>
          {executivesList.length > 0 ? (
            executivesList.map((a, i) => {
              console.log(a);
              return (
                <tr key={a.cust_id}>
                  <StyledTd>{a.cust_name}</StyledTd>
                  <StyledTd>{a.sales}원</StyledTd>
                  <StyledTd>{a.accounts_receivable}원</StyledTd>
                  <StyledTd>{a.total_sum}원</StyledTd>
                </tr>
              );
            })
          ) : (
            <tr>
              <StyledTd colSpan={4}>데이터가 없습니다.</StyledTd>
            </tr>
          )}
        </tbody>
      </StyledTable>
      <PageNavigate
        totalItemsCount={salesTolalPage}
        onChange={searchExecutiveList}
        itemsCountPerPage={5}
        activePage={currentpageParm as number}
      ></PageNavigate>
    </>
  );
};
