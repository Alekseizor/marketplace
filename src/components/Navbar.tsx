import React from "react";


export function Navbar() {
    return (
        <>
        <div className="line">МегаМаркет</div>
        <div className="container content offset-md-0">
            <div className="row">
        <div className="col-md-2 offset-md-0">
            <div className="list-group">
                <a href="#" className="inscription">Молочная продукция</a>
                <a href="#" className="list-group-item">Овощи</a>
                <a href="#" className="list-group-item">Макароны, крупы</a>
                <a href="#" className="list-group-item">Мясо</a>
                <a href="#" className="list-group-item">Выпечка и хлеб</a>
                <a href="#" className="list-group-item">Соусы</a>
                <a href="#" className="list-group-item">Колбасы</a>
                <a href="#" className="list-group-item">Сладости</a>
            </div>
        </div>
        </div>
            </div>
        </>
    )
}