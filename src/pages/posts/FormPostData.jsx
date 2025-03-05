const FormPostData = ({id, label, placeholder, value, onChange}) => {

    return (
        <div className="formPostData-container">
            <label htmlFor={id}>{label} : </label>
            <input
                className="form-control"
                id={id}
                name={id}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    )
};

export default FormPostData;