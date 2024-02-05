import {  useQuery } from '@tanstack/react-query';
import useAxiosCart from '../useCart/useAxiosCart';

const useUsers = () => {
    const [axiosSecure] = useAxiosCart()
    const {refetch, data: users = []} = useQuery(['users'], async() =>{
            const res = await axiosSecure.get(`/users`)
            return res.data
        }
    )
    return [users, refetch]
};

export default useUsers;