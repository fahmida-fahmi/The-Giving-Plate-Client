import { Link } from 'react-router-dom';
import { FaCircleUser, FaCartPlus } from "react-icons/fa6";
import './header.css'
import Swal from 'sweetalert2';
import useAuth from '../../../pages/Hooks/useAuth/useAuth';
import useCart from '../../../pages/Hooks/useCart/useCart';

const Header = () => {
    const { user, logOut } = useAuth()

    const [cart] = useCart()

    console.log(cart?.length);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You want to exit?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Logged Out!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='fixed top-0 z-10 w-full' style={{ background: 'rgba(21, 21, 21, 0.50)' }}>
            <div className='w-11/12 mx-auto flex justify-between uppercase py-3 '>
                <div className='text-white  cinzel'>
                    <h1 className='text-3xl'>The Giving Plate</h1>
                    
                </div>
                <div className='flex items-center inter '>
                    <ul className='flex'>
                        <li className='text-lg'><Link>Home</Link></li>
                        <li className='text-lg'><Link to='/contactUs'>contact us</Link></li>
                        <li className='text-lg'><Link to='/dashboard/'>dashboard</Link></li>
                        <li className='text-lg'><Link to='/ourMenu'>our menu</Link></li>
                        <li className='text-lg'><Link to='https://serving-smiles-client.vercel.app/'>Our Program </Link></li>
                        {/* <li className='text-lg'><Link to='/ourShop'>our shop</Link></li> */}
                    </ul>
                    <div className='w-10 relative'>
                        <Link to='/dashboard/myCart'>
                            <FaCartPlus className='text-2xl relative '></FaCartPlus>
                            <p className='absolute left-5 bottom-3 text-yellow-50'> {cart?.length || 0}</p>
                        </Link>
                    </div>
                    {
                        user
                            ?
                            <button className='text-lg mx-5 font-bold uppercase' onClick={handleSignOut}>sign out</button>
                            :
                            <button className='text-lg mx-5 font-bold uppercase'>
                                <Link to='/login'>log in </Link>
                            </button>

                    }
                    {
                        user
                            ?
                            user.photoURL
                                ?
                                <img className='w-10 rounded-full mx-3' src={user.photoURL} alt="" />
                                :
                                <p className='text-lg'>{user.displayName}</p>
                            :
                            <FaCircleUser className='text-3xl'></FaCircleUser>




                    }
                </div>
            </div>
        </div>
    );
};

export default Header;