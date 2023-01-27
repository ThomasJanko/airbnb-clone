import React, {useState, useEffect} from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { Calendar, DateRangePicker,   } from 'react-date-range';

export default function DatesPicker() {

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [nbNights, setNbNights] = useState()

  const selectionRange = {startDate: startDate, endDate: endDate, key: 'selection'}

  const handleSelect = (ranges) => {
    
    // console.log(ranges)
    
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    let nb =  Math.round(ranges.selection.endDate - ranges.selection.startDate)

    setNbNights((nb / (1000 * 60 * 60 * 24)))
  }
  return (
    <div className='flex flex-col mx-auto col-span-3' >
      <span className='ml-4'>{nbNights>0 && nbNights + ' nuits'} </span> 
        <DateRangePicker ranges={[selectionRange]} direction='vertical' minDate={new Date()} rangeColors={["#DF5B61"]} onChange={handleSelect}   />
    </div>
  )
}
