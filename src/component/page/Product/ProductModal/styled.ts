import ReactModal from "react-modal";
import styled from "styled-components";

export const ProductModalStyled = styled(ReactModal)`
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
        padding: 16px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 12px;
        background: #fff;
        flex-direction: column;
    }

    textarea,
    input[type="text"],
    input[type="number"] {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 90%;
        font-size: 14px;
        font-family: Arial, sans-serif;
        line-height: 1.5;
    }

    textarea {
        height: 100px;
    }

    .btn-group {
        margin-top: 10px;
    }

    Button {
        height: 40px;
        padding: 10px 20px;
        display: inline-flex;
        align-items: center;
    }

    input[id="itemPrice"],
    input[id="totalPrice"] {
        width: 84%;
    }

    span {
        margin-left: 6px;
    }
`;

export const ProductModalTableStyled = styled.table`
    border-collapse: collapse;
    border: 1px solid #ddd;
    margin-bottom: auto;
    width: 550px;

    th,
    td {
        padding: 8px;
        border-bottom: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #2676bf;
        color: #ddd;
    }
`;
