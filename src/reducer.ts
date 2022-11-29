export const success = "Success"

export function reducer(state : any, action: { type: any; products: any; }) {
    switch (action.type) {
        case success:
            return {
                products: action.products
            }
        default:
            return state
    }
}