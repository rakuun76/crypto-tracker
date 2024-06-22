import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { isDarkAtom } from "../atom";

const Checkbox = styled.input`
  width: 50px;
  height: 24px;
  &::before {
    content: "";
    text-align: center;
    line-height: 24px;
    width: 50px;
    height: 24px;
    display: block;
    position: absolute;
    border-radius: 12px;
    background-color: #2f3640;
    box-shadow: 0 0 16px 3px rgba(0 0 0 / 10%);
    transition: all 0.3s ease-in;
    cursor: pointer;
  }
  &::after {
    content: "";
    display: block;
    position: relative;
    width: 20px;
    height: 20px;
    top: 2px;
    left: 3px;
    border-radius: 50%;
    background: white;
    transition: all 0.3s ease-in;
  }
  &:checked {
    &::before {
      background-color: white;
    }
    &::after {
      background-color: #585d6d;
      left: calc(100% - 23px);
    }
  }
`;

function ToggleBtn() {
  const [isDark, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <Checkbox type="checkbox" checked={!isDark} onClick={toggleDarkAtom} />
  );
}

export default ToggleBtn;
