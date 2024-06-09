import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Text } from '@chakra-ui/react';
import useUser from '../../hooks/useUser';

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { user } = useUser();


  return (
    <Box bgColor={'#0093E9'} bgGradient='linear-gradient(90deg,#2cbd9a 0%, #65c86d)!important' display={'flex'} justifyContent={'center'} alignItems={'center'} h={'100vh'}>
      <Box textAlign={'center'} minH={'300px'} padding={'2em'} background={'white'} borderRadius={'16px'} boxShadow={'0px 10px 15px -3px rgba(0,0,0,0.1);'}>
        <Text fontSize={'2xl'}>
          Hey, {user?.name}
        </Text>
        <Text fontSize={'3xl'}>
          Welcome to the Dashboard 
        </Text>


        <Button onClick={() => {
          logout();
          navigate('/');

        }} type="submit" colorScheme="blue" marginTop={'2em'} textColor={"#ffffff"} fontSize={"16px"} bgGradient='linear-gradient(90deg,#2cbd9a 0%, #65c86d)!important' height={"60px"} borderRadius={'30px'} _hover={{ bgGradient: 'linear-gradient(90deg,#2cbd9a 0%, #65c86d)!important' }}
          width={{
            base: "300px",
            md: "420px"
          }}>Log Out</Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
