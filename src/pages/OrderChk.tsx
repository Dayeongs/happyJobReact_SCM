import { OrderChkProvider } from "../api/provider/OrderChkProvider";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { OrderChkMain } from "../component/page/Work/OrderChk/OrderChkMain/OrderChkMain";
import { OrderChkSearch } from "../component/page/Work/OrderChk/OrderChkSearch/OrderChkSearch";

export const OrderChk = () => {
    return (
        <>
            <OrderChkProvider>
                <ContentBox>발주서현황</ContentBox>
                <OrderChkSearch></OrderChkSearch>
                <OrderChkMain></OrderChkMain>
            </OrderChkProvider>
        </>
    );
};
