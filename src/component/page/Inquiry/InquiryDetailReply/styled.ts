import styled from "styled-components";

export const InquiryDetailReplyStyled = styled.div`
    margin-top: 30px;

    Button {
        float: right;
        height: 40px;
        margin: 10px 2px;
        display: inline-flex;
        align-items: center;
    }
`;

export const InquiryDetailReplyStyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 17px;
    font-family: Arial;
    text-align: left;

    th,
    td {
        padding: 8px;
        border-bottom: 1px solid #ddd;
    }

    // th 태그의 배경색, 글자색, 텍스트 가운데 정렬
    th {
        background-color: #e9e1d4;
        color: #000;
        text-align: center;
    }

    // 마지막 tr의 높이 조절
    tr:last-child {
        height: 200px;
    }

    tr:last-child td {
        vertical-align: top;
    }

    .trTtile {
        height: 60px;
        vertical-align: center;
    }
`;
