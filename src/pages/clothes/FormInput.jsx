const FormInput = ({id, label, placeholder}) => {

    return (
        <div className="form-floating mb-3">
            <input className="form-control"
                   type="text"
                   placeholder={placeholder}
                   id={id}
                   name={id}
                   value={id}
                   data-sb-validations="required"/>
            <label htmlFor={id}>
                {label} :
            </label>
            <div className="invalid-feedback" data-sb-feedback={`${id}:required`}>
                {label}은 필수로 입력해야 합니다.
            </div>
        </div>
    )
};

export default FormInput;