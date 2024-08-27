import { InquiryProvider } from "../api/provider/InquiryProvider";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { InquiryMain } from "../component/page/Inquiry/InquiryMain/InquiryMain";
import { InquirySearch } from "../component/page/Inquiry/InquirySearch/InquirySearch";

export const Inquiry = () => {
    return (
        <InquiryProvider>
            <ContentBox>1:1 문의</ContentBox>
            <InquirySearch />
            <InquiryMain />
        </InquiryProvider>
    );
};
