import ReactModal from "react-modal";
import styled from "styled-components";

export const LoginModalStyled = styled(ReactModal)`
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
        width:700px;
        display: flex;
        align-items: center;
        padding: 16px;
        font-size: 20px;
        margin-right: auto;
    }

    .category {
        height:30px;
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

    select,
    input[type='text'], [type='password'], [type='date'] {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 70%;
    }

    .font_red {
        color: red;
    }

    td .width_150 {
        width:150px;
    }

    .btn-group > button {
        background-color: #3bb2ea;
        width: unset;
        height: 51px;
        border: none;
        color: white;
        padding-top: 15px
        padding-bottom: 15px;
        padding-left: 10px;
        padding-right: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px #999;

        &:hover {
            background-color: #45a049;
        }

        &:active {
            background-color: #3e8e41;
            box-shadow: 0 2px #666;
            transform: translateY(2px);
        }

    }

    .title {
        width:100%;
        text-align:center;
        padding: 20px 0;
        font-size:20px;
    }
`;

export const LoginModalTableStyled = styled.table`

    margin-bottom: auto;

    table {
        width:700px;     
    }

    tr:last-child td{
        border-bottom:0px;
    }

    th,
    td {
        padding: 8px;
        border-bottom: 1px solid #ddd;
        text-align: left;
    }

    th {
        background-color: #2676bf;
        color: #ddd;
        text-align: center;
    }

    .select {
        width:100%;
        text-align:center;
        padding-bottom:20px;
    }

    .select > select {
        width:500px;
    }

    button {
        background-color: #3bb2ea;
        width: unset;
        height: 51px;
        border: none;
        color: white;
        padding-top: 15px
        padding-bottom: 15px;
        padding-left: 10px;
        padding-right: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px #999;

        &:hover {
            background-color: #45a049;
        }

        &:active {
            background-color: #3e8e41;
            box-shadow: 0 2px #666;
            transform: translateY(2px);
        }
    }
`;