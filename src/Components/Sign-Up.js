import React,{useState} from "react";
import './SignUp.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () =>{
    const [name , setName] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [phoneNumber , setPhoneNumber] = useState('')

    const [ename, setEname] = useState('')
    const [epassword, setEpassword] = useState('')
    const [econfirm, setEconfirm] = useState('')
    const [ephoneNumber, setEphoneNumber] = useState('')

    const [ncolor, setNcolor]=useState('')
    const[pcolor, setPcolor] = useState('')
    const[ccolor, setCcolor]=useState(null)
    const[phcolor, setphcolor]=useState('')

    let navigate = useNavigate();

    const validate = () => {
        if(phoneNumber.length < 10 || phoneNumber.length > 10){
            setEphoneNumber("Use a valid number")
            setphcolor('red')
        }else{setEphoneNumber(''); setphcolor('green')}

        if(name.length > 5){
            setEname(''); setNcolor('green')
        }else{setEname('The name should be more than 5 characters'); setNcolor('red')}

        if(password.length < 6 || password.length > 10){
            setEpassword("The password should be 6 - 10 characters"); setPcolor('red');
        }else{setEpassword(''); setPcolor('green')}

        if(confirmPassword === password){
            setEconfirm(''); setCcolor('green');
        }else{setEconfirm("The passwords are not equal"); setCcolor('red')}
    }

    const handleSubmit = async() =>{
        validate()
        if(password.length > 6 && confirmPassword === password){
            console.log("Iko Shwari")
            await axios.post("https://localhost:445/api/v1/users/register", { name: name, password: password, phoneNumber: phoneNumber})
                .then((response) => {
                    console.log(response)
                    if(response.status === 201){
                        navigate('/dashboard')
                    }else{
                        alert(response.data.message)
                    }
                })
                .catch((error) => {
                    console.error({err: error.message});
            });
        }else{alert("Kindly try again after a few minutes")}

    }

    return(
        <div className="SignUpPage">
            <div className="SignUpContainer">
               <div className="SignUpForm">
                        <input required value={phoneNumber} onChange={(event)=>{setPhoneNumber(event.target.value)}} style={{borderColor: phcolor}} type="text" placeholder="input your phone number"/>
                        <p id="error">{ephoneNumber}</p>
                        <input required value={name} onChange={(event)=>{setName(event.target.value)}} style={{borderColor: ncolor}} type='text' placeholder="input your name" />
                        <p id="error">{ename}</p>
                        <input required value={password} onChange={(event)=>{setPassword(event.target.value)}} style={{borderColor: pcolor}}  type='password' placeholder="input your password" />
                        <p id="error">{epassword}</p>
                        <input required value={confirmPassword} onChange={(event)=>{setConfirmPassword(event.target.value)}} style={{borderColor: ccolor}}  type='password' placeholder="confirm the above password" />
                        <p id="error">{econfirm}</p>
                        <input type='button' onClick={()=>handleSubmit()} value='submit'/>
               </div>
            </div>
        </div>
    )
}