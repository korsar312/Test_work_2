import './Loading.css';
import React from 'react';
import {observer} from 'mobx-react'


const Loading = observer(()=>{

    return (
        <div className="LoadingWrapper">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
})

export default Loading;
