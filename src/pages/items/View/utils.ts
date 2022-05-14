import dayjs from "dayjs";

const DateFormat = 'YYYY/MM/DD-HH:MM';

export const formatDate = (d: string | Date) => dayjs(d).format(DateFormat);
