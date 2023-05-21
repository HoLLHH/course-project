import React from 'react'
import "../css/bootstrap.css"
import "../css/style.css"
import MyCarousel from './MyCarousel'


export default function Header() {

    return(
        <div className="container">
            <div className="row mt-5">
                <div className="col-12">
                    <MyCarousel/>
                </div>
            </div>
        </div>
    )
}
