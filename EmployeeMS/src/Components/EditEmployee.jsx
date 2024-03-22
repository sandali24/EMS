import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



const EditEmployee = () => {

const {id} = useParams()

const [employee, setEmployee] = useState({
    name: '',
    email: '',
    // password: '',
    salary: '',
    address: '',
    category_id: '',
    // image: '',
});

const [category, setCategory] = useState([])
const navigate = useNavigate()

useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
        .then(result => {
            if (result.data.Status) {
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/employee/'+id)
        .then(result => {
            setEmployee({
                ...employee,
                name: result.data.Result[0].name,
                email: result.data.Result[0].email,
                address: result.data.Result[0].address,
                salary: result.data.Result[0].salary,
                category_id: result.data.Result[0].category_id,
            })
        }).catch(err => console.log(err))
}, [])

const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3000/auth/edit_employee/'+id, employee)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/employee')
        } else {
           alert(result.data.Error) 
        }
    }).catch(err => console.log(err))
}


  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
    <div className='p-3 rounded w-50 border'>
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
            <div className='col-12'>
                <label for="inputName" className="form-lable">Name</label>
                <input type="text"
                    className="form-control rounded-0"
                    id="inputName"
                    placeholder="Enter Name"
                    value={employee.name}
                    onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                     />
            </div>
            <div className='col-12'>
                <label for="inputEmail4" className="form-lable">Email</label>
                <input type="email"
                    className="form-control rounded-0"
                    id="inputEmail4"
                    placeholder="Enter Email"
                    autoComplete="off"
                    value={employee.email}
                    onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                     />
            </div>
            {/* <div className='col-12'>
                <label for="inputPassword4" className="form-lable">Password</label>
                <input type="password"
                    className="form-control rounded-0"
                    id="inputPassword4"
                    placeholder="Enter Password"
                    onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
                    
                />
            </div> */}
            <div className='col-12'>
                <label for="inputSalary" className="form-lable">Salary</label>
                <input type="text"
                    className="form-control rounded-0"
                    id="inputSalary"
                    placeholder="Enter Salary"
                    autoComplete="off"
                    value={employee.salary}
                    onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                    
                />
            </div>
            <div className='col-12'>
                <label for="inputAddress" className="form-lable">Address</label>
                <input type="text"
                    className="form-control rounded-0"
                    id="inputAddress"
                    placeholder="Enter Address"
                    autoComplete="off"
                    onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                    value={employee.address}
                   
                />
            </div>
            <div className='col-12'>
                <label for="category" className="form-lable">Category</label>
                <select name="category" id="category" className="form-select"
                onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
                {category.map(c => {
                        return <option value={c.id} >{c.name}</option>
                    })}
                </select>
            </div>
            {/* <div className='col-12 mb-3'>
                <label for="inputGroupFile01" className="form-lable">Select Image</label>
                <input type="file"
                    className="form-control rounded-0"
                    id="inputGroupFile01"
                    name="image"
                    onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
                    
                />
            </div> */}
            <div className="col-12">
                <button type="submit" className='btn btn-success w-100'>Edit Employee</button>
            </div>
        </form>
    </div>
</div>
  )
}

export default EditEmployee