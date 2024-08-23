import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { ExecutiveMain } from "../component/page/Executives/ExecutivesMain/ExecutivesMain";
import { ExecutiveSearch } from "../component/page/Executives/ExecutivesSearch/ExecutivesSearch";

export const Executive = () => {
  return (
    <>
      <ContentBox>매출현황</ContentBox>
      <ExecutiveSearch />
      <ExecutiveMain />
    </>
  );
};
