import React from 'react';
import store from '../store/store'
import {observer} from 'mobx-react'


const BottomRow = observer(()=>{
    let row = store.rowShow.obj
    let stopWord = [
        'id',
        'lastName',
        'description',
        'email',
        'phone'
    ]
    let rename = [
        ['firstName', 'Выбран пользователь'],
        ['address','Адрес проживания:'],
        ['city','Город:'],
        ['streetAddress','Адрес проживания:'],
        ['state','Провинция/штат:'],
        ['zip','Индекс:'],
    ]

    function run(e){
        let arr = rename.flat()

        return Object.entries(e).map((i,ind)=>{
            if (!stopWords(i[0])){
                let a = i[0]
                let b = i[1]
                if(typeof b === 'object'){
                    return run(b)
                }
                if(a === 'firstName'){
                    b += (' ' + e.lastName)
                }
                a = arr[arr.indexOf(a)+1]
                return <div key={a}>{a} <b>{b}</b></div>
            }
            return null
        })
    }

    let stopWords = (a) => stopWord.includes(a)

    return (

        <div className="BottomRow">
            {run(row)}
            <div>Описание: <textarea value={row.description}></textarea></div>
        </div>

    )
})
export default BottomRow;
