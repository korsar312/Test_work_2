import React from 'react';
import store from '../store/store'
import {observer} from 'mobx-react'


const Search = observer((props)=>{

    function recurs(e){
        let arr = []
        function f(e) {
            if (typeof e === 'object') {
                for (let i in e) {
                    f(e[i])
                }
            }
            else{
                String(e)
                if(typeof e === 'string'){e = e.toLowerCase()}
                arr.push(e)
            }
            return arr
        }
        return f(e)
    }

    function search(e) {
        store.clearFilter()
        let word = e.target.value.toLowerCase()
        store.items.forEach(i=>{
            for(let e in i){
               for(let elem of recurs(i[e])) {
                   if(String(elem).includes(word)) {
                       store.addFilter(i)
                       return
                   }
               }
            }
        })
        store.pagination(store.paginatPage)
    }

    return (
        <div className="Search">
            <input placeholder="Поиск..." a onChange={search}/>
        </div>
    )
})
export default Search;
