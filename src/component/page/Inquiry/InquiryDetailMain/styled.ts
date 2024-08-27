import styled from "styled-components";

export const InquiryDetailMainStyled = styled.div`
    Button {
        float: right;
        height: 40px;
        margin: 10px 2px;
        display: inline-flex;
        align-items: center;
    }

    input[type="text"],
    textarea {
        padding: 8px 12px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 97%;
        font-family: Arial;
        font-size: 17px;
        line-height: 1.5;
    }

    textarea {
        height: 150px;
    }

    select {
        padding: 8px 12px;
        margin: 5px 0;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 90%;
        font-size: 15px;
    }
`;

export const InquiryDetailMainStyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0px 0px 0px;
    font-size: 17px;
    font-family: Arial;
    text-align: left;

    th,
    td {
        padding: 8px;
        border: 1px solid #ddd;
        text-align: center;
    }

    // th 태그의 배경색, 글자색
    th {
        background-color: #e9e1d4;
        color: #000;
    }

    tr:last-child {
        height: 200px;
    }
`;
