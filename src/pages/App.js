import './App.css';
import React from 'react';
import store from '../store/store'
import {observer} from 'mobx-react'
import Table from "../components/Table";
import VueCreateRow from "../components/VueCreateRow";
import Loading from "../components/Loading";
import BottomRow from "../components/BottomRow";
import ReactPaginate from "react-paginate";
import Search from "../components/Search";


const App = observer(()=>{

    async function download(name,url){
        if( !store?.data[name] ){
            store.downloaded = true
            let response = await fetch(url);
            if (response.ok) {
                let json = await response.json();
                store.data[name] = new Array(...json)
                store.addJSON(store.data[name])
                store.downloaded = false
            }
            else {
                store.downloaded = false
                alert("Ошибка HTTP: " + response.status);
            }
        }
        else {
            store.addJSON(store.data[name])
        }
    }

    function small(){
        return download('small','http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
    }
    function big(){
        return download('big','http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
    }
    function openModalWindow() {
        store.opener()
    }
    function changePage(data) {
        store.pagination(data.selected * store.paginatAllItem)
    }
    return (
        <div className="App">
            {store.vueCreateRow && <VueCreateRow/>}

            <Search/>
            <div>
                <button onClick={small}>Скачать маленькую</button>
                <button onClick={big}>Скачать большую</button>
            </div>
            <div>
                <button onClick={openModalWindow}>Добавить строку</button>
            </div>
            <Table/>

            {store.items.length > 0 && <ReactPaginate
                pageCount={store.paginatAllPages}
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}

                previousLabel={'Prev'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                onPageChange={changePage}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />}

            {store.rowShow.visible && <BottomRow/>}
            {store.downloaded && <Loading/>}
        </div>
    )
})

export default App;
