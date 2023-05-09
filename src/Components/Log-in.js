import React, {useState} from "react";
import './Log-In.css';
import axios from "axios";

export const LoginPage = ({setIsLoggedIn, setUser}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('')

    const [ename, setEname] = useState('')
    const [epassword, setEpassword] = useState('')

    const [ncolor, setNcolor] = useState('')
    const [pcolor, setPcolor] = useState('')

    const handleLogin = async () => {
        if(phoneNumber.length > 0){
            setEname('')
            setNcolor('green')
        }else{
            setEname('Input a phone Number')
            setNcolor('red')
        }
        if(password.length < 6){
            setEpassword('Your password cannot be less than 6 digits')
            setPcolor('red')
        }else{
            setEpassword('')
            setPcolor('green')
        }
        if(ename === '' && epassword === ''){
            await axios.post("https://localhost:445/api/v1/users/login", {phoneNumber: phoneNumber, password: password})
            .then((response)=> {
                if(response.status === 200){
                    console.log(response.data)
                    setUser(response.data)
                    setIsLoggedIn(true)
                }else{
                    setUser({})
                    setIsLoggedIn(false)
                }
            })
            .catch((err)=> console.log({error: err.message}))
        }
    }
    return(
        <div className="LoginPage">
            <div className="loginContainer">
                <input style={{borderColor : ncolor}} required onChange={(e)=> setPhoneNumber(e.target.value)} value={phoneNumber} type='text' placeholder="input your phoneNumber"/>
                <p id="error">{ename}</p>
                <input style={{borderColor : pcolor}} required type='password' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="input your password"/>
                <p id="error">{epassword}</p>
                <input type='button' value='submit' onClick={handleLogin}/>
            </div>
        </div>
    )
}