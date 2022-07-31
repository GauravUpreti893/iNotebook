import React, { useContext } from 'react'
import ProgressContext from '../Context/Progress/ProgressContext';
import './Spinner.css'
export default function Spinner() {
    const context = useContext(ProgressContext);
    const { loading } = context;
    return (
        loading && <div id="spinnerbigcontainer">
            <div id="spinnercontainer">
                <div className='ball'></div>
                <div className='shape'></div>
            </div>
        </div>
    )
}
