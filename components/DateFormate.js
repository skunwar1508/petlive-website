import React from 'react'
import Moment from 'react-moment'

const DateFormate = ({ date,  formate}) => {
  return (
    <Moment format={formate || "DD MMMM YYYY"}>{date}</Moment>
  )
}

export default DateFormate
