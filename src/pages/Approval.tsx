import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { ApprovalOrderList } from "../component/page/Executives/Approval/ApprovalOrderList";
import { ApprovalReturnList } from "../component/page/Executives/Approval/ApprovalReturnList";

export const Approval = () => {
    return (
        <>
            <ContentBox>발주승인</ContentBox>
            <br />
            <ApprovalOrderList />
            <br />
            <br />
            <br />
            <br />
            <ContentBox>반품입금승인</ContentBox>
            <br />
            <ApprovalReturnList />
        </>
    );
};
