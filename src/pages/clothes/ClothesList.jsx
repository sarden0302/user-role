import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import apiClothesService from "./apiClothesService";

const ClothesList = () => {

    const [clothes, setClothes] = useState([]);


    useEffect(() => {
        apiClothesService.getAllClothes(setClothes);
    }, []);

    return (
        <div className="-container">

            <ul>
                {clothes.length > 0 ? (
                    clothes.map((cloth) => (
                        <li key={cloth.cid}>
                            <h3>{cloth.cname}</h3>
                            <p>{cloth.ccategory}</p>
                            <Link to={`/clothes/${cloth.cid}`}>이동하기</Link>
                        </li>
                    ))
                ) : (
                    <p>게시물이 없습니다.</p>
                )}
            </ul>
        </div>
    )
};

export default ClothesList;