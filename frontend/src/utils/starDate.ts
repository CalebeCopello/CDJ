import dayjs from 'dayjs';


export function startDate($date: Date, $use: boolean, $time:boolean = false) {
    let format: string = `YYYY-MM-DD ${$time ? "@ HH:mm" : ''}`
	if (!$use) {
        return dayjs($date).format(format);
	}
    format = `YYMM.DD ${$time ? "@ HH:mm" : ''}`
    return dayjs($date).format(format)
}
