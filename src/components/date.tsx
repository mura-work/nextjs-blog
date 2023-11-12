import { parseISO, format } from "date-fns";

type paramsType = {
  dateString: string;
};

export const Date = ({ dateString }: paramsType) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
