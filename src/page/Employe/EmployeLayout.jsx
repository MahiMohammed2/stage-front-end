import axios from 'axios';
import React, { useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFileEarmarkArrowDownFill, BsFileEarmarkArrowUpFill, BsFillPersonFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { HiUserAdd } from 'react-icons/hi';
import { RiAdminFill } from 'react-icons/ri';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const EmployeLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const affiche = async () => {
            const accesToken = localStorage.getItem("accessToken_emp");
            if (accesToken == "undefined" || accesToken === null || accesToken === 0) {
                navigate('/employe/login')
            }
            await axios({
                method: "get",
                url: "http://localhost:8000/api/employe/",
                headers: {
                    "Accept": "application/json",
                    "Authorization": 'Bearer ' + accesToken
                }
            })
        }
        affiche();
    }, []);
    const logout = () => {
        const accesToken = localStorage.getItem("accessToken_emp");
        if (accesToken == "undefined" || accesToken === null || accesToken === 0) {
            navigate('/employe/login')
        }
        axios({
            method:'delete',
            url: 'http://localhost:8000/api/employe/logout',
            headers:{
                "Accept": "application/json",
                "Authorization": 'Bearer ' + accesToken
            }
        })
        
        localStorage.removeItem("accessToken_emp");
        navigate('/employe/login')
    }
  return (

    <div className='container'>
            <nav className='navbar'>
                <div className='left-side'>

                    <img className='logo-royal-maroc' src='../royal-maroc.png' />
                    <h5>Bureau d'order</h5>
                    <div className='search-bar'>
                        <AiOutlineSearch className='logo-search' />
                        <input type="text" className='search' placeholder='Rechrcher des fichier avec le : numero, interet, employer' />
                    </div>
                </div>
                <div className='right-side'>
                    <NavLink to='/employe'><FaUserCircle className='logo-profile' /></NavLink>
                    <button onClick={()=>logout()}>Logout</button>
                </div>
            </nav>

            <div className='grid-container'>
                <nav className='left-bar'>
                    <NavLink to="/employe/addArriver"><button className='btn-add'><HiUserAdd className='logo-icon'/> Ajouter un arriver</button></NavLink>
                    <NavLink to='/employe/arriver' className='childrens'><BsFileEarmarkArrowDownFill className='logo-icon'/>Arriver</NavLink>
                    <NavLink to='/employe/depart' className='childrens'><BsFileEarmarkArrowUpFill className='logo-icon'/>Depart</NavLink>
                </nav>
                <Outlet/>
            </div>

        </div>
  )
}

export default EmployeLayout