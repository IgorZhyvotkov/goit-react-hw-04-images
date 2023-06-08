
import { ButtonSt } from "./Button.styled";

const Button = ({onBtnClick}) => {
 return (
  <ButtonSt type="button" onClick={onBtnClick} >Load more</ButtonSt>
 )
}

export default Button;
