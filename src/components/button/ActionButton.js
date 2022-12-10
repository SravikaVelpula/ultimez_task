import { Button } from 'react-bootstrap';

function ActionButton(props){
    const { title, type} = props;
    return(
        <div className='action-btn'>
            <Button type={type}>{title ? title : "Button"}</Button>
        </div>
    );
}

export default ActionButton;