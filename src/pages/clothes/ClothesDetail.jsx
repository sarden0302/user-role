import {useEffect, useState} from "react";
import apiClothesService from "./apiClothesService";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import apiService from "../posts/apiService";

const ClothesDetail = () => {
    const {id} = useParams();
    const [cloth, setCloth] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        console.log("cId : " , id)
        apiClothesService.getClothesById(id, setCloth);
    }, [id]);

    const handleEdit = () => {
        navigate(`/clothes/edit/${id}`);
    }

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0"
                                                   src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt="..."/>
                    </div>
                    <div className="col-md-6">
                        <div className="small mb-1">{cloth?.cbrand}</div>
                        <h1 className="display-5 fw-bolder">{cloth?.cname}</h1>
                        <p className="lead">{cloth?.ccategory}</p>
                        <p className="lead">{cloth?.ccolor}</p>
                        <p className="lead">{cloth?.cgender}</p>
                        <p className="lead">{cloth?.cmaterial}</p>
                        <p className="lead">{cloth?.cregisterDate}</p>
                        <p className="lead">{cloth?.cseason}</p>
                        <p className="lead">{cloth?.csize}</p>
                        <p className="lead">{cloth?.cstock}</p>
                        <div className="d-flex">
                            <button className="btn btn-warning"
                                    type="button"
                                    onClick={handleEdit}>
                                <i className="bi-cart-fill me-1">수정</i>

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ClothesDetail;