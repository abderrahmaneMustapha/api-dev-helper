import React from "react"
import { useLocation } from "react-router"

const Redirect = ()=>{
    
    const search =  useLocation().search
    const code = new URLSearchParams(search).get("code");
    console.log(code)
    const url = `http://localhost:10000/oauth/redirect?code=${code}`
   
    React.useEffect(()=>{
      fetch(url)
      .then(response => response.json())
      .then(data=> console.log(data))
    }, [url])
    return (
        <div>Redirecting ...</div>
    )
}
export default Redirect;