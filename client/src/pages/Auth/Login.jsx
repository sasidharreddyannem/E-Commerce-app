import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate,useLocation } from "react-router-dom"
import "../../styles/AuthStyles.css";
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../../context/auth';

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth,setAuth]=useAuth();
    const location=useLocation();
    
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
       try{
           const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
              
               email,
               password,
              
             });
           if(res.data.success){
               toast.success(res.data.message)
               setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token
               })
               localStorage.setItem("auth",JSON.stringify(res.data));
               navigate(location.state||'/')
           }else{
               toast.error(res.data.message)
           }
        
       }catch(err){
           console.log(err);
           toast.error('something went wrong')
       }
     }
   


  return (
    <Layout title="Register - Ecommer App">
    <div className="form-container" >
      <form onSubmit={handleSubmit}>
        <h4 className="title">LOGIN FORM</h4>
       
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Your Email "
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your Password"
            required
          />
        </div>
        
        <div className='mb-3'>
        <button type="submit" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
          Fogot Password
        </button>
        </div>
        <button type="submit" className="btn btn-primary">
          LOGIN
        </button>
      </form>
    </div>
  </Layout>
  )
}

export default Login