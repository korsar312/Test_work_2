import './VueCreateRow.css';
import React from 'react';
import store from '../store/store'
import {observer} from 'mobx-react'


const VueCreateRow = observer(()=>{
    let names = {
        id:{
            name: 'id',
            valid: "num",
            trueForm: false,
            placeholde: '123',
        },
        firstName:{
            name: 'firstName',
            valid: "str",
            trueForm: false,
            placeholde: 'Artem',
        },
        lastName:{
            name: 'lastName',
            valid: "str",
            trueForm: false,
            placeholde: 'Makeev',
        },
        email:{
            name: 'email',
            valid: "email",
            trueForm: false,
            placeholde: 'Kochebnic@gmail.com',
        },
        phone:{
            name: 'phone',
            valid: "phone",
            trueForm: false,
            placeholde: '8(916)758-54-09',
        },
    }
    function validator(e){
        if(validation(e.target.value, e.target.dataset.valid)){
            e.target.style.background = 'white'
            names[e.target.dataset.name].trueForm = true
        }
        else{
            e.target.style.background = 'red'
            names[e.target.dataset.name].trueForm = false
        }
    }
    function validation(symb, validType){
        switch (validType) {
            case 'num':
                let num = /^([0-9]{1,16})$/;
                if(num.test(symb) === true) {
                    return true;
                }
                break;
            case 'str':
                let str = /^([A-Za-zА-Яа-я]{1,16})$/;
                if(str.test(symb) === true) {
                    return true;
                }
                break;
            case 'email':
                let email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if(email.test(symb) === true) {
                    return true;
                }
                break;
            case 'phone':
                let phone = /^[\d]{1}\([\d]{2,3}\)[\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/
                if(phone.test(symb) === true) {
                    return true;
                }
                break;
            default:
                return false
        }
    }

    function createObj() {
        if(validForm(names)){
            let obj = {}
            document.querySelectorAll('.inputForm').forEach(o=>{
                obj[o.dataset.name] = o.value
            })
            store.addItem(obj)
            closeModalWindow()
        }
        else {alert('введите корректные данные')}
    }
    function validForm(n){
        for(let i in n){
            if(n[i].trueForm !== true){
                return false
            }

        }
        return true
    }
    function closeModalWindow() {
        store.opener()
    }
    return (
        <div className="createRowWrapper">

            <div onClick={closeModalWindow} className="back">
            </div>

            <form>
                {Object.values(names).map(e=>{
                    return <div>    <div>{e.name}</div><div><input onChange={validator} placeholder={e.placeholde} className="inputForm" data-name={e.name} data-valid={e.valid}/></div>  </div>
                })}

                <button type="button" onClick={createObj}>Добавить</button>
            </form>

        </div>

    )
})

export default VueCreateRow;
