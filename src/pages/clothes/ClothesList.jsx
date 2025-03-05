import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import apiClothesService from "./apiClothesService";
import ClothesCard from "./ClothesCard";

const ClothesList = () => {

    const [clothes, setClothes] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        apiClothesService.getAllClothes(setClothes);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            // apiService 에서 deletePost 메서드 호출
            apiClothesService.deleteClothes(id);
            // 게시물이 삭제된 상태
            navigate("/clothes"); // main 으로 이동하기
        }
    }

    return (
        <div className="row mt-5">
            {clothes.length > 0 ? (
                clothes.map((cloth, index) => (
                    <ClothesCard
                        key={cloth.cid}
                        id={cloth.cid}
                        name={cloth.cname}
                        price={cloth.cprice}
                        image="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                        onDelete={handleDelete}
                    />
                ))
            ) : (
                <p>게시물이 없습니다.</p>
            )}
        </div>
    )
};

export default ClothesList;