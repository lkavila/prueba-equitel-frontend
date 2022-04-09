
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const milisecondsDay = 1000 * 60 * 60 * 24;
const milisecondsHour = milisecondsDay / 24;
const milisecondsMinute = milisecondsHour / 60;
const milisecondsSeconds = milisecondsMinute / 60;

const getDate = (date: any) => {
    const tweetDate = new Date(date);
    const currentDate = new Date();
    const timeDiefferent = currentDate.getTime() - tweetDate.getTime();

    if (currentDate.getFullYear() > tweetDate.getFullYear()) {
        return `${monthNames[tweetDate.getMonth()]} ${tweetDate.getDay()}, ${tweetDate.getFullYear()}`

    } else if (timeDiefferent > milisecondsDay) {
        return `${monthNames[tweetDate.getMonth()]} ${tweetDate.getDate()}`

    } else if (timeDiefferent > milisecondsHour && timeDiefferent <= milisecondsDay) {
        return `${Math.round(timeDiefferent / milisecondsHour)}h`

    } else if (timeDiefferent > milisecondsMinute && timeDiefferent <= milisecondsHour) {
        return `${Math.round(timeDiefferent / milisecondsMinute)}m`

    } else if (timeDiefferent > milisecondsSeconds && timeDiefferent <= milisecondsMinute) {
        return `${Math.round(timeDiefferent / milisecondsSeconds)}s`

    } else {
        return '1s'
    }
}

export default getDate;