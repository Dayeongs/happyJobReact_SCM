import ReactModal from "react-modal";
import styled from "styled-components";

export const InquiryReplyModalStyled = styled(ReactModal)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    span {
        color: #f00;
    }

    button {
        height: 40px;
        margin-top: 20px;
        display: inline-flex;
        align-items: center;
    }

    .header {
        display: flex;
        align-items: center;
        padding: 16px;
        font-size: 20px;
        margin-right: auto;
    }

    .wrap {
        display: flex;
        min-width: 304px;
        padding: 20px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 12px;
        background: #fff;
        flex-direction: column;
    }

    input[type="text"],
    textarea {
        padding: 8px 12px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 90%;
        font-family: Arial;
        font-size: 17px;
        line-height: 1.5;
    }

    textarea {
        height: 200px;
    }

    select {
        padding: 8px 12px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 90%;
        font-size: 15px;
        color: #495057;
    }
`;

export const InquiryReplyModalTableStyled = styled.table`
    margin: 0px 5px;
    border-collapse: collapse;
    margin-bottom: auto;
    width: 700px;
    height: 200px;
    border-bottom: 1px solid #ddd;

    th,
    td {
        padding: 8px;
        border: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #2676bf;
        color: #ddd;
    }
`;
