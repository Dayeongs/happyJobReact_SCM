import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { OrderMain } from "../component/page/Business/Order/OrderMain/OrderMain";
import { OrderSearch } from "../component/page/Business/Order/OrderSearch/OrderSearch";

export const BusinessOrder= () => {

    
    return (
        <>
            <ContentBox>발주 현황</ContentBox>
            <OrderSearch />
            <OrderMain />
        </>
    );
};