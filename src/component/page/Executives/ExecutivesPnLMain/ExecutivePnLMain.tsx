import axios from "axios";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Chart.js에서 필요한 컴포넌트 등록
Chart.register(...registerables);

export const ExecutivePnLMain = () => {
    const { search } = useLocation();
    const chartRef = useRef<Chart | null>(null);
    // Error: Canvas is already in use. Chart with ID '0' must be destroyed before the canvas can be reused.

    const getchart = () => {
        // 검색용 날짜
        const searchParam = new URLSearchParams(search);

        axios.post("/executives/chart.do", searchParam).then((res) => {
            console.log(res.data); // 14개

            // 월과 데이터를 배열로 변환 => res.data에 들어와 있는 애들을 꺼내야 함
            const months = res.data.map((item: any) => item.month); // data에서 반복자 돌려서 (item 임시변수) => month 꺼내기
            const total_obtain = res.data.map((item: any) => item.total_obtain || 0); // 없으면 0으로, 발주액 꺼내기
            const total_order = res.data.map((item: any) => item.total_order || 0); // 수주액 꺼내기
            const ExcepteIncome = res.data.map((item: any) => (item.total_obtain || 0) - (item.total_order || 0)); // 예상수입액

            // 기존 차트가 있다면 삭제
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Canvas 요소 가져오기
            const canvas = document.querySelector("#myChart") as HTMLCanvasElement | null;
            if (canvas) {
                const ctx = canvas.getContext("2d"); // 이거를 해 줘야지 mixed차트

                if (ctx) {
                    chartRef.current = new Chart(ctx, {
                        type: "bar",
                        data: {
                            labels: months, // 월
                            datasets: [
                                {
                                    label: "수주액",
                                    data: total_obtain, // 가격
                                    backgroundColor: "hsl(0.3turn 60% 45% / .7)",
                                    borderColor: "hsl(0.3turn 60% 45% / .7)",
                                    borderWidth: 1,
                                },
                                {
                                    label: "발주액",
                                    data: total_order, // 가격
                                    backgroundColor: "rgba(255, 99, 132, 1)",
                                    borderColor: "rgba(255, 99, 132, 1)",
                                    borderWidth: 1,
                                },
                                {
                                    type: "line",
                                    label: "예상수입액",
                                    data: ExcepteIncome, // 예상수입액
                                    backgroundColor: "rgb(31 120 50);",
                                    borderColor: "rgb(31 120 50);",
                                    borderWidth: 1,
                                },
                            ],
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        },
                    });
                }
            }
        });
    };

    useEffect(() => {
        getchart();
    }, [search]);

    return (
        <div>
            <canvas id="myChart"></canvas>
        </div>
    );
};
