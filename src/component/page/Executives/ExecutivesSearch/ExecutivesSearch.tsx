import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../common/Button/Button";
import { ExecutivesSearchStyled } from "./styled";

export const ExecutiveSearch = () => {
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const title = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { search } = useLocation();

  //새로고침 해도 가능하도록
  useEffect(() => {
    if (
      title.current?.value === "" ||
      startDate?.length === 0 ||
      endDate?.length === 0
    ) {
      navigate(`/react/executives/sales.do`);
    }
  }, [search]);

  // 유효성 검사를 useEffect 안에서 실행
  useEffect(() => {
    if (startDate || endDate) {
      validateDateRange();
    }
  }, [startDate, endDate]);

  // 유효성 검사 함수
  const validateDateRange = () => {
    const today = new Date();

    // 시작일이 현재 날짜보다 이후일 때 경고
    if (startDate) {
      const stDate = new Date(startDate);
      if (stDate > today) {
        alert("시작일은 현재 날짜보다 이전이어야 합니다.");
        setStartDate(""); // 시작일 초기화
        return false;
      }
    }
    // 종료일이 현재 날짜보다 이후일 때 경고
    if (endDate) {
      const edDate = new Date(endDate);
      if (edDate > today) {
        alert("종료일은 현재 날짜보다 이전이어야 합니다.");
        setEndDate(""); // 종료일 초기화
        return false;
      }
    }

    // 종료일이 시작일보다 이전일 때 경고
    if (startDate && endDate) {
      const stDate = new Date(startDate);
      const edDate = new Date(endDate);
      if (edDate < stDate) {
        alert("종료일은 시작일보다 이후여야 합니다.");
        setEndDate(""); // 종료일 초기화
        return false;
      }
    }

    return true;
  };

  const handlerSearch = () => {
    // 검색 버튼을 누르면, 조회가 된다.
    const query: string[] = [];
    !title.current?.value || query.push(`searchTitle=${title.current?.value}`);
    !startDate || query.push(`startDate=${startDate}`);
    !endDate || query.push(`endDate=${endDate}`);

    const queryString = query.length > 0 ? `?${query.join("&")}` : "";
    navigate(`/react/executives/sales.do${queryString}`);
  };

  return (
    <ExecutivesSearchStyled>
      <input ref={title}></input>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <Button onClick={handlerSearch}>검색</Button>
    </ExecutivesSearchStyled>
  );
};
