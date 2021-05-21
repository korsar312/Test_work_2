import React from 'react';
import store from '../store/store'
import {observer} from 'mobx-react'


const Row = observer((props)=>{
    let row = props.row
    let stopWord = [
        'address',
        'description'
    ]
    function stopWords(a) {
        return stopWord.includes(a)
    }
    function renderTopRow(){
        store.cellEditorShow(row)
    }
    return (
        <tr>
            {Object.entries(row).map(i=>{
                if (!stopWords(i[0])){
                    return <th onClick={renderTopRow}>{i[1]}</th>
                }
                return null
            })}
        </tr>
    )
})
export default Row;
