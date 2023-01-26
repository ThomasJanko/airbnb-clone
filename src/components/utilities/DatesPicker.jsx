import React, {useState, useEffect} from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { Calendar, DateRangePicker  } from 'react-date-range';

export default function DatesPicker() {

  const [startDate, setStartDtae] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const selectionRange = {startDate: startDate, endDate: endDate, key: 'selection'}

  const handleSelect = (ranges) => {
    setStartDtae(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    console.log(ranges.selection)
  }
  return (
    <div className='flex flex-col mx-auto col-span-3' >
        <DateRangePicker ranges={[selectionRange]} direction='vertical' minDate={new Date()} rangeColors={["#DF5B61"]} onChange={handleSelect}   />
    </div>
  )
}
