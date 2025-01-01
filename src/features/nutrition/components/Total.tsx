import { memo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "store";
import { supplements } from "../constants";
import questions from "../questions";
import CustomTableCell from "./CustomTableCell";

const Total = () => {
  const answers = useSelector(
    (state: RootState) => state.nutrition.current?.answers,
  );

  if (answers == null) return null;

  return (
    <>
      <CustomTableCell>总分</CustomTableCell>
      <CustomTableCell>如果合计超过7，建议补充</CustomTableCell>
      {supplements.map((s) => {
        const total = questions.reduce<number>((prev, q, index) => {
          const counted = q.supplements.includes(s);
          const isChecked = answers.at(index) ?? false;
          return counted && isChecked ? prev + 1 : prev;
        }, 0);
        return (
          <CustomTableCell key={s} align="center">
            {total}
          </CustomTableCell>
        );
      })}
    </>
  );
};

export default memo(Total);
