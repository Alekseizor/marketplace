import {deleteCart} from "../modules";


export function DeleteFromCart(uuid: string) {

    const url = `cart/${uuid}`

    function Delete() {
        deleteCart(url)
    }


    return (
        <>
            <button type="button" className="btn btn-outline-danger" onClick={() => Delete()}>Удалить из корзины</button>
        </>
    );

}