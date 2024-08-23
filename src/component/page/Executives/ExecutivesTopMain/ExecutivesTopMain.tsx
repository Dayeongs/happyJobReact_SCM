import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  StyledTable,
  StyledTd,
  StyledTh,
} from "../../../common/styled/StyledTable";

export interface IExecutiveTopList {
  //이거는 래퍼객체
  //accounts_receivable: String;

  accounts_receivable: string;
  cust_id: number;
  cust_name: string;
  sales: string;
  total_sum: string;
}

export interface IExecutiveTopListJsonResponse {
  list: IExecutiveTopList[];
  salesPage: number;
}

export const ExecutivesTopMain = () => {
  const [orderBy, setOrderby] = useState<string>("sales"); //sales setOrderby => orderby를 변경하는 함수 ("sales") => 초기값
  const [executivesTopList, setExecutivesTopList] = useState<
    IExecutiveTopList[]
  >([]);

  //원화 포메팅
  /*
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("ko-KR").format(value) + "원";
  };
  */
  const formatCurrency = (value: string): string => {
    const numberValue = parseFloat(value);
    return new Intl.NumberFormat("ko-KR").format(numberValue) + "원";
  };

  //document.()와 같은거
  useEffect(() => {
    console.log(orderBy);
    searchExecutiveTopList();
  }, [orderBy]);

  // 2번째 인자 { orderBy} => 요청본문(body)에 포함시키겠다는 말
  // {orderBy} vs "orderBy"
  // 1. { orderBy } : map 형식의 '객체'를 보내겠다
  // {orderBy} => { key(orderBy) : value(OrderBy} 이해가 쉽게 다른 value값인 예시로는
  // {orderBy} => { key(orderBy) : value(mydata} orderby(key) - mydata(value) 넘기겠다

  // "orderBy" => 단일 문자열만 넘기겠다

  const searchExecutiveTopList = () => {
    axios
      .post("/executives/salesTopListJson.do", { orderBy })
      .then((res: AxiosResponse<IExecutiveTopListJsonResponse>) => {
        console.log("res.data.list");
        console.log(res.data.list);

        setExecutivesTopList(res.data.list);
      });
  };

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh size={15}>고객명</StyledTh>
            <StyledTh
              size={30}
              onClick={() => {
                setOrderby("sales");
              }}
            >
              매출▼
            </StyledTh>
            <StyledTh
              onClick={() => {
                setOrderby("accounts_receivable");
              }}
              size={30}
            >
              미수금▼
            </StyledTh>
            <StyledTh
              onClick={() => {
                setOrderby("total_sum");
              }}
              size={30}
            >
              총액▼
            </StyledTh>
          </tr>
        </thead>
        <tbody>
          {executivesTopList.length > 0 ? (
            executivesTopList.map((a, i) => {
              if (i <= 9) {
                // 콘솔 로그는 map 함수 내부에서 호출
                console.log("여기가 a애들임");
                console.log(a);
                return (
                  <tr key={a.cust_id}>
                    <StyledTd>
                      {"[" + (i + 1) + "]  "}
                      {a.cust_name}
                    </StyledTd>
                    <StyledTd>{formatCurrency(a.sales)}</StyledTd>
                    <StyledTd>{formatCurrency(a.accounts_receivable)}</StyledTd>
                    <StyledTd>{formatCurrency(a.total_sum)}</StyledTd>
                  </tr>
                );
              }
            })
          ) : (
            <tr>
              <StyledTd colSpan={4}>데이터가 없습니다.</StyledTd>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </>
  );
};
