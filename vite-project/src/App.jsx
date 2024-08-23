
import './App.css'
import { useState } from 'react'
import * as yup from 'yup'

function App() {


  const[formData,setFormData]=useState({
    firstname:"",
    lastname:"",
    email:"",
    message:"",
    querytype:"",
    consent: false,
  })
  const [errorsObject, setErrorsObject]=useState({})
  const [successMsg, setSuccessMsg] = useState(false)

const userSchema= yup.object().shape({
  firstname: yup.string().required("This field is required"),
  lastname: yup.string().required("This field is required "),
  email: yup.string().email("Please enter a valid email address" ).required("This field is required"),
  message: yup.string().required("This field is required "),
  querytype:yup.string().oneOf(["General Enquiry","Support Request"],"Please select a query type").required(),
  consent:yup.boolean().oneOf( [true], "To sumbit this form,please consent to being contacted" ).required(),
})


async function testvalidation() {
  try{
    const response = await userSchema.validate(formData,{
      abortEarly:false
    })
    // console.log(response,"is valid object")
    setErrorsObject({})
    return true
  }catch(err){
    var errors={}
    err.inner.forEach((error)=>{
      //console.log('${error.path} : ${error.message}')
      errors[error.path] = error.message 
    }
    )
   
    setErrorsObject(errors)
    return false
//console.log(errorsObject)
//console.log(errors.firstname) 
  }
}
    




 async function handleOnFormSubmit(event){
  event.preventDefault()
 const isValid=await testvalidation()
 if (isValid){
 
  setSuccessMsg(true)
   setTimeout(() => {
    setSuccessMsg(false);
  }, 3000);
  setFormData({
    firstname:"",
    lastname:"",
    email:"",
    message:"",
    querytype:"",
    consent: false,
  })
 }
  
 }

 function handleonChange(event){
  const keyName=event.target.name
  let keyValue = event.target.value
  const type = event.target.type

  if (type ==="checkbox"){
    keyValue = event.target.checked
  }

  setFormData({
    ...formData,
    [keyName]:keyValue,
  })
 }

  return (

<>
<div className={  `success-message ${successMsg ? "" : "hidden" }`} >
  <div >
    <img src="./images/icon-success-check.svg" alt=""/>
    <h4>Message Sent!</h4>
   
    </div>
  <p> Thanks for completing the form. We'll be in touch soon!</p>
    </div>

<div className="form-section">
    <h2>Contact Us</h2>
    <form onSubmit={handleOnFormSubmit} noValidate>

      <div className="row">

        <div className="input-field">
          
        <label htmlFor="firstname">First Name <span className="required">*</span></label>
          
          <input type="text" id="firstname" name='firstname' onChange={handleonChange} value={formData.firstname} ></input>
      
           {errorsObject.firstname &&( <span className="required-error"  > {errorsObject.firstname } </span>)}
        </div>
    
       
        <div className="input-field">

          <label htmlFor="lastname">Last Name <span className="required">*</span></label>
          <input type="text" id="lastname" name='lastname' onChange={handleonChange} value={formData.lastname} ></input>
        
          {errorsObject.lastname &&( <span className="required-error"  > {errorsObject.lastname} </span>)}
         
        </div>
       
      </div>

      <div className="input-field">

        <label htmlFor="email">Email Address <span className="required">*</span></label>
        
        <input type="email" id="email"  name='email'  onChange={handleonChange} value={formData.email} ></input>
        {/* <span className="required-error">This field is required</span>
        <span className="error-message">Please enter a valid email address</span> */}
        {errorsObject.email &&(  <span className="required-error">  {errorsObject.email} </span>  )
       
        }
     
      </div>
     
      <div className="input-field ">

        <label htmlFor="querytype" id="querytype">Query Type <span className="required">*</span></label>

        <div className="row radio-inputs">

          <div  className={` radio-btn ${formData.querytype==="General Enquiry" && " radio-selected"}  ` }>

            <input type="radio" id="generalenquiry" name="querytype" value="General Enquiry" onChange={handleonChange} 
            checked={formData.querytype==="General Enquiry"}>
            </input>
            <label htmlFor="generalenquiry">General Enquiry</label>
          </div>

          <div className={`radio-btn ${formData.querytype === "Support Request" && "radio-selected"}`} >
            
            <input type="radio" id="supportrequest" name="querytype" value="Support Request" onChange={handleonChange}
             checked={formData.querytype === "Support Request"} ></input>
            
            <label htmlFor="supportrequest">Support Request</label>
          </div>

        </div>
        
        {errorsObject.querytype &&  (<span className="required-error">{errorsObject.querytype} </span>)
       
      }
      </div>

      <div className="input-field">

        <label htmlFor="message">Message <span className="required">*</span></label>
        <textarea id="message" rows="5"   name='message'  onChange={handleonChange} value={formData.message}  ></textarea>
        
        {errorsObject.message && <span className="required-error"> {errorsObject.message}</span> }
       
      
      
      </div>
     
      <div className="input-field">

        <div className="consent-checkbox">

          <input type="checkbox" id="consent" name='consent' onChange={handleonChange} checked={formData.consent}></input>
          
          <label htmlFor="consent">I consent to being contacted by the team
          <span className="required">*</span>
          </label>
        
        </div>
        {errorsObject.consent && <span className="required-error"> {errorsObject.consent}</span>}
      </div>
      <button type="submit"  className="submit-btn">Submit</button>

    </form>
  </div>
 
</>


  )
}

export default App
