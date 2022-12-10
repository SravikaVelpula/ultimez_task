import Form from 'react-bootstrap/Form';
function InputField(props){
    const {type, value, name, placeholder, onChangeEvent, mbSize, id, isValid , apiError} = props;
    return(
        <Form.Group className={`mb-${mbSize}`} controlId={id}>
            <Form.Control type={type} name={name} value={value} placeholder={placeholder} onChange={onChangeEvent} />
            {apiError && apiError !== undefined ? <span className='red'>{apiError}</span> : null}
            {!isValid && isValid !== undefined ? <span className='red'>{"Mandatory  field"}</span> : null}
        </Form.Group>
    );
}

export default InputField;