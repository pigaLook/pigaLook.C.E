import React from "react";
import './SoldProducts.css';

export const SoldProduct = () => {
    const products = [1, 2, 3, 4, 5, 6, 7, 6, 3,23]
    return(
        <div className="soldProduct">
            <div className="ProductSold">
                <div className="allSoldProducts">
                    {products.map((product, index)=>(
                        <div className="productImage">
                            product
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}