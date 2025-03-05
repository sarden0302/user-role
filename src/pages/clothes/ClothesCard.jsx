import {Link} from "react-router-dom";

const ClothesCard = ({id, name, price, image, onDelete}) => {

    return (
        <div className="col-3 mb-5" key={id}>
            <div className="card h-100">
                <img className="card-img-top" src={`${image}`}
                     alt="Fancy Cloth"/>
                <div className="card-body p-4 text-center">
                    <h5 className="fw-bolder">
                        <Link to={`/clothes/${id}`} className="text-decoration-none">{name}</Link>
                    </h5>
                    {price.toLocaleString()}원
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                        <button className="btn btn-outline-dark mt-auto"
                                onClick={() => {
                                    onDelete(id)
                                }}
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ClothesCard;