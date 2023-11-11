import { memo } from "react";

const CountryFlag = ({
  countryCode,
  fontSize,
}: {
  countryCode: string;
  fontSize?: string | number;
}) => {
  return (
    <span
      style={{ fontSize, margin: 5 }}
      className={`fi fi-${countryCode.toLowerCase()}`}
    />
  );
};

export default memo(CountryFlag);
