import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { TextField } from '@mui/material';
import { editUserApi } from '../Service/commonApi';
import { base_url } from '../Service/baseUrl';

function ProfileComponent() {
    const [useProfile, setUseProfile] = useState({
      email:JSON.parse(localStorage.getItem("ExistingUser")).email,
      username: JSON.parse(localStorage.getItem("ExistingUser")).username,
      Adress: JSON.parse(localStorage.getItem("ExistingUser")).Adress || "Please Add Your Adress Details",
        profileImage:JSON.parse(localStorage.getItem("ExistingUser")).image || '',
      });
const [preview,setPreview] =useState("")
      const [editMode, setEditMode] = useState(false);
      // const 
      //   '';
        const handleEditClick = () => {
            setEditMode(true);
            // setUseProfile({
            //   ...useProfile,
            //   image: useProfile.profileImage,
            // });
          };
        
          const handleSaveClick = async() => {
            setEditMode(false);
            const {email,username,Adress, profileImage} =useProfile
            const reqbody = new FormData()
            reqbody.append('email',email)
            reqbody.append('username',username)
            reqbody.append('Adress',Adress)
            reqbody.append('profileImage',profileImage)

            const reqHeader={
              "content-type":"multipart/form-data",
      "Authorization":`Bearer ${sessionStorage.getItem("token")}`
            }
            const response = await editUserApi(reqbody,reqHeader)
            if(response.status===200){
              localStorage.setItem("ExistingUser",JSON.stringify(response.data))
              console.log(response.data);
              setUseProfile({...useProfile,
                email:JSON.parse(localStorage.getItem("ExistingUser")).email,
                username:JSON.parse(localStorage.getItem("ExistingUser")).username,
                Adress: JSON.parse(localStorage.getItem("ExistingUser")).Adress || '',
                profileImage:JSON.parse(localStorage.getItem("ExistingUser")).image || ''
              })
            }

           
            // Save logic can be added here (e.g., make an API call to save changes)
          };
      const handleInputChange = (field, value) => {
        setUseProfile({ ...useProfile, [field]: value });
      };
  console.log(useProfile.Adress);  
  console.log(useProfile.profileImage);  
  return (
   
    <Card sx={{ maxWidth: '225' }}>
    <CardContent>
      <div className='w-full flex justify-between'>
        <h6 className='font-bold'>My Profile</h6>
        {editMode ? (
          <Button onClick={handleSaveClick}>Save</Button>
        ) : (
          <Button onClick={handleEditClick}>Edit</Button>
        )}
      </div>

      
        <div className='flex justify-center items-center mt-4'>
        {editMode ? (
            <label htmlFor='projects' className='text-center'>
              <input
                type='file'
                id='projects'
                className='hidden'
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  setUseProfile({
                    ...useProfile,
                    profileImage: selectedFile,
                  });
                  setPreview(URL.createObjectURL(selectedFile));
                }}
              />
              <img src={ preview?preview:`${base_url}/uploads/${useProfile.profileImage}`} alt=''width={"20px"} height={"30px"} className='w-3/4 h-36 object-cover' />
            </label>
          ) : (
            <img src={useProfile.profileImage ? `${base_url}/uploads/${useProfile.profileImage}`:"https://t3.ftcdn.net/jpg/00/53/01/86/360_F_53018621_KQbIttjKsgF4LIH6JwpACBSdTHgepTLz.jpg"} width={"80px"} height={"80px"}  alt='No phoot' className='  object-cover' />
          )}
        </div>
      

      {editMode ? (
        <>
          <div className='mb-3 w-full'>
            <TextField
              id='standard-basic'
              variant='standard'
              placeholder='Username'
              value={useProfile.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              fullWidth
            />
          </div>
          <div className='mb-3  w-full'>
          <Input
  placeholder='Address'
  value={useProfile.Adress}
  onChange={(e) => handleInputChange('Adress', e.target.value)}
  sx={{ color: useProfile.Adress === "" ? '#D9DDDC' : '#000000' }}
  fullWidth
/>
          </div>
          <div className='mb-3  w-full'>
            <Input
              placeholder='Email'
              value={useProfile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              fullWidth
            />
          </div>
        </>
      ) : (
        <>
          <h6 className='py-1 my-2 border shadow rounded-lg px-5  text-sm text-center font-bold' > {useProfile.username}</h6>
          <h6 className='py-1 my-2 border shadow rounded-lg px-5  text-sm text-center font-bold' > {useProfile.Adress}</h6>
          <h6 className='py-1 my-2 border shadow rounded-lg px-5  text-sm text-center font-bold'> {useProfile.email}</h6>
        </> 
      )}
    </CardContent>
  </Card>
  )
}

export default ProfileComponent