import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import apiProductService from "./apiProductService";

const ProductCard = ({id}) => {
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        apiProductService.getProductsById(id,  setProduct);
    }, []);

    const handleDetail = () => {
        navigate(`/products/${id}`);
    }

    return (
        <div className="col mb-5">
            <div className="card h-100">
                <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                     alt="Fancy Product"/>
                <div className="card-body p-4 text-center">
                    <h5 className="fw-bolder">
                        <Link to={`/products/${id}`} className="text-decoration-none">{product?.productName}</Link>
                    </h5>
                    {product?.productPrice.toLocaleString()}원
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                        <button className="btn btn-outline-dark mt-auto"
                            onClick={handleDetail}>이동하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductCard;