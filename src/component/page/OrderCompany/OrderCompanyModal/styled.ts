import ReactModal from 'react-modal';
import styled from 'styled-components';

export const OrderCompanyModalStyled = styled(ReactModal)`
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

    .title {
        width:100%;
        text-align:center;
        padding: 20px 0;
        font-size:20px;
    }

    .bottom {
        margin-top:20px;
    }

    .btn-group {
        width:100%;
        text-align:center;
    }

    select,
    input[type='text'] {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    select{
        width:150px;
        margin-left:10px;
    }

`;