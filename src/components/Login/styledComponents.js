import styled from 'styled-components'

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.isDark ? '#212121' : '#ffffff')};
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px #000;
  width: 90%;
  max-width: 500px;
  padding: 40px 25px;
  border-radius: 12px;
  background: ${props => (props.isDark ? '#000' : '#fff')};
  color: ${props => (props.isDark ? '#ffffff' : '#000')};
`
export const WebImage = styled.img`
  width: 170px;
  align-self: center;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    width: 200px;
  }
`
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`

export const Label = styled.label`
  color: ${props =>
    props.isDark ? '#ffffff' : `${props.check ? '#000' : '#475569'}`};
  font-weight: ${props => (props.check ? '500' : '500')};
`

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0px 10px;
  margin-top: 10px;
  border: 1px solid #d7dfe9;
  border-radius: 5px;
  outline: none;
  background: transparent;
  color: ${props => (props.isDark ? '#ffffff' : '#000')};
`

export const ShowPasswordContainer = styled.div`
  display: flex;
  align-items: center;
`

export const CheckBox = styled.input`
  height: 10px;
`

export const ErrorMsg = styled.p`
  color: #ff0b37;
  margin: 0;
  font-weight: 500;
  margin-top: 10px;
`

export const LoginButton = styled.button`
  width: 100%;
  margin-top: 12px;
  padding: 7px 0px 7px 0px;
  border-radius: 8px;
  border: none;
  background-color: #3b82f6;
  color: #ffffff;
  font-weight: 500;
  font-family: 'Roboto';
  font-size: 15px;
  cursor: pointer;
`

// export const nm = styled.nm``
