import './Table.css';
import React from 'react';
import store from '../store/store'
import {observer} from 'mobx-react'
import Row from "./Row";


const Table = observer((props)=>{

    function sortBy(e) {
        store.sort(e.target.dataset.name)
    }
    return (
        <table className="table">
                <thead>
                <tr>
                    {store.items.length > 0 && Object.keys(store.items[0]).map(i=>   {if(i !=='address'&&i !=='description' ){return <th key={i} data-name={i} onClick={sortBy} className="title">{i}</th>}}   )}
                </tr>
                </thead>

                <tbody>
                    {store.items.length > 0 && store.paginat.map(i=><Row row={i}/>)}
                </tbody>
        </table>
    )
})
export default Table;
