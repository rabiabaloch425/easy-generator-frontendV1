import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, FormLabel, Input, Box, Text, Grid, GridItem, useToast, InputGroup, InputRightElement, } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import LoginHeader from '../../components/Auth/LoginHeader';
import Carousel from '../../components/Carousel/Carousel';
import ViewIcon from '../../assets/view';
import HideIcon from '../../assets/hide';


const ImagesArray = [
  "https://i.ibb.co/xXtYzHz/Screenshot-6.png",
  "https://i.ibb.co/5R6X7GD/Screenshot-7.png",
  "https://i.ibb.co/ctDLwNX/Screenshot-8.png"
]

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    try {
      await register(values.name, values.email, values.password);
      toast({
        title: 'Registration Successful',
        description: 'You have successfully registered.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error: any) {
      console.log('Registration component error:', error);
      const errorMessage = error.toString();
      setError(errorMessage);
      toast({
        title: 'Registration Error',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }

  };

  return (
    <Grid templateColumns={{
      base: "repeat(1, 1fr)",
      md: "repeat(12, 1fr)",
    }} minH="100vh">

      <GridItem colSpan={7} >
        <LoginHeader subHeading="Already have an account?" buttonText="Login" redirectRoute="/" />
        <Text fontSize={"32px"} fontWeight={600} mt={'1em'} textAlign={'center'} textColor={"#363e4e"} mb={'32px'}>Create Your Account</Text>

        <Box width="100%" display="flex" alignItems="center" justifyContent="center">
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="name">
                  {({ field }: { field: any }) => (
                    <FormControl>
                      <FormLabel textColor={"#848fa3"}>Name</FormLabel>
                      <Input {...field} placeholder="Name" width={{
                        base: "300px",
                        md: "420px"
                      }} height={'48px'} outline={'none'} />
                      <ErrorMessage name="name" render={(msg) => <Text color="red.500">{msg}</Text>} />
                    </FormControl>
                  )}
                </Field>
                <Field name="email">
                  {({ field }: { field: any }) => (
                    <FormControl>
                      <FormLabel marginTop={"1em"} textColor={"#848fa3"}>Email</FormLabel>
                      <Input {...field} type="email" placeholder="Email" width={{
                        base: "300px",
                        md: "420px"
                      }} height={'48px'} outline={'none'} />
                      <ErrorMessage name="email" render={(msg) => <Text color="red.500">{msg}</Text>} />
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field }: { field: any }) => (
                    <FormControl>
                      <FormLabel marginTop={"1em"} textColor={"#848fa3"}>Password</FormLabel>
                      <InputGroup size='md'>
                        <Input
                          {...field} placeholder="Password" width={{
                            base: "300px",
                            md: "420px"
                          }} type={show ? 'text' : 'password'}
                          height={'48px'} outline={'none'}
                        />
                        <InputRightElement width='4.5rem'>
                          {
                            show ? <ViewIcon handleClick={handleClick} /> : <HideIcon handleClick={handleClick} />
                          }

                        </InputRightElement>
                      </InputGroup>
                      <ErrorMessage name="password" render={(msg) => <Text color="red.500">{msg}</Text>} />
                    </FormControl>
                  )}
                </Field>
                {error && <Text color="red.500">{error}</Text>}
                <Button type="submit" colorScheme="blue" isLoading={isSubmitting} marginTop={'2em'} textColor={"#ffffff"} fontSize={"16px"} bgGradient='linear-gradient(90deg,#2cbd9a 0%, #65c86d)!important' height={"60px"} borderRadius={'30px'} _hover={{ bgGradient: 'linear-gradient(90deg,#2cbd9a 0%, #65c86d)!important' }}
                  width={{
                    base: "300px",
                    md: "420px"
                  }}>Register</Button>
              </Form>
            )}
          </Formik>

        </Box>
      </GridItem>

      <GridItem colSpan={5} display={{
        base: "none",
        md: "block",

      }} >
        <Box bgGradient='linear-gradient(90deg,#2cbd9a 0%, #65c86d)!important' height="100%">
          <Carousel ImagesArray={ImagesArray} type="register" />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Register;
