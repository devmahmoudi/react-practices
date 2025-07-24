import { formatDistanceToNow, parseISO } from "date-fns-jalali";

const ShowDate = ({timestamp}) => {
    let ago = ''

    if(timestamp){
        const date = parseISO(timestamp)

        const time = formatDistanceToNow(date)

        ago = `${time} قبل`
    }

    return (
        <small>
             {ago} &ensp;
        </small>
    )
}

export default ShowDate;