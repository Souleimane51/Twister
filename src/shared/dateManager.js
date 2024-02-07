// Libraries
import dayjs, { locale } from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import relativeTime from 'dayjs/plugin/relativeTime';


function date( dateGiven ) {

    // Extends
    dayjs.extend(calendar);
    dayjs.extend(relativeTime);

    // Variables
    const time = dayjs(dateGiven);
    const timeToCalculate = time.unix()
    const Currentdate = dayjs(new Date).unix();
    let date;

    // Date calculation
    const period = (Currentdate - timeToCalculate) / 60;


    // Condition
    if (period <= 300) {
        return date = dayjs().to(dayjs(time));
    }
    else {
        return (
            date = dayjs(time).calendar(null, {
                sameDay: '[Today at] h:mm', // The same day ( Today at 2:30 AM )
                lastDay: '[Yesturday at] h:mm ', // The day before ( Yesterday at 2:30 AM )
                lastWeek: '[Last] dddd', // Last week ( Last Monday at 2:30 AM )
                sameElse: 'DD MMMM YYYY' // Everything else ( 17/10/2011 )
            })
        );
    }

}

export default date;




