import axiosInstance from '../../api/axiosInstance'

const userApi = {
    fetchUser: () => axiosInstance.get('api/auth/user/'),
} 

export default userApi 
