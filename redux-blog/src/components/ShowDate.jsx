import { formatDistanceToNow, parseISO } from "date-fns-jalali";

const ShowDate = ({timestamp}) => {
    let ago = ''

    if(timestamp){
        const date = parseISO(timestamp)

        const time = formatDistanceToNow(date)

        age = `${time} قبل`
    }

    return (
        <span>
             {ago}
        </span>
    )
}

export default ShowDate;