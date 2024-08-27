import { ContentBox } from '../component/common/ContentBox/ContentBox';
import { OrderCompanyMain } from '../component/page/OrderCompany/OrderCompanyMain/OrderCompanyMain';


export const OrderCompany = () => {
    return (
        <>
            <ContentBox>발주업체관리</ContentBox>
            <br></br>
            <OrderCompanyMain/>
        </>
    );
};
