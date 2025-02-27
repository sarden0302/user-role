import {useEffect, useState} from "react";
import apiProductService from "./apiProductService";
import {Link} from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductList = () => {

    const [products, setProducts] = useState([]);
    /*
        Uncaught (in promise) TypeError: errCallback is not a function
        at apiProductService.js:5:1
        errCallback -> 함수가 아니면 문제가 발생
        err 의 경우 매개변수 이름으로 전달받아서 작성 x -> .catch() (기능) 안에 작성할 것

         AI 학습의 도움을 받을 경우
         기능명칭 :
            function (callback, errCallback) {
                // 기능 작성
            }

            ===> 여기서 errCallback 의 경우 백엔드에서 문제가 발생했을 때 해결해야할 문제
                매개변수 명칭으로 받아오지 않음

        바른 예제
        기능명칭 :
            function (keyword) {
                // 메인기능명칭을 호출할 경우 수행할 기능 작성
            }
     */

    useEffect(() => {
        apiProductService.getProducts(setProducts);
    }, []);

    const handleDelete = ({productId}) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            apiProductService.deleteProduct(productId);
        }
    };

    return (
        <div className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {products.map(product => {
                        return (
                            <ProductCard id={product.productId}
                                         name="Fancy Product"
                                         price="$40.00"
                                         image="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"/>
                        )}
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;