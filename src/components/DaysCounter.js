import React from 'react'
import dayjs from 'dayjs'

const DaysCounter = ({ setDate, setTime }) => {
    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)


    const RelativeEventDate = new Date(`${setDate} ${setTime}`)
    const TimeToEvent = dayjs(RelativeEventDate).fromNow()
    // console.log(TimeToEvent);

    return (
        <div>
            <h1>{TimeToEvent}</h1>
        </div>
    )
}

export default DaysCounter