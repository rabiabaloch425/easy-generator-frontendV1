import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, FormLabel, Input, Text, useToast, Grid, GridItem, Box, InputRightElement, InputGroup } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoginHeader from '../../components/Auth/LoginHeader';
import Carousel from '../../components/Carousel/Carousel';
import ViewIcon from '../../assets/view';
import HideIcon from '../../assets/hide';

const ImagesArray = [
  'https://i.ibb.co/5ctvFNg/Screenshot-1.png',
  'https://i.ibb.co/dpfxmMV/Screenshot-5.png',
  'https://i.ibb.co/nbrpKC6/Screenshot-4.png',
]
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();
  const [error, setError] = React.useState<string | null>(null);
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      navigate('/dashboard');
      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials. Please try again.');
      toast({
        title: 'Login Error',
        description: 'Invalid credentials. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Grid templateColumns={{
      base: "repeat(1, 1fr)",
      md: "repeat(12, 1fr)",
    }} minH="100vh">

      <GridItem colSpan={7} >
        <LoginHeader subHeading="Don’t have an account?" buttonText="Signup" redirectRoute="/register" />
        <Text fontSize={"32px"} fontWeight={600} mt={'1em'} textAlign={'center'} textColor={"#363e4e"} mb={'32px'}>Welcome back</Text>

        <Box width="100%" display="flex" alignItems="center" justifyContent="center">


          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form >
                <Field name="email">
                  {({ field }: { field: any; }) => (
                    <FormControl>
                      <FormLabel textColor={"#848fa3"}>Email</FormLabel>
                      <Input {...field} type="email" placeholder="Email" width={{
                        base: "300px",
                        md: "420px"
                      }} height={'48px'} outline={'none'} />
                      <ErrorMessage name="email" render={(msg) => <Text color="red">{msg}</Text>} />
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field }: { field: any; }) => (
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
                      <ErrorMessage name="password" render={(msg) => <Text color="red">{msg}</Text>} />
                    </FormControl>
                  )}
                </Field>
                {error && <Text color="red">{error}</Text>}
                <Button type="submit" colorScheme="blue" isLoading={isSubmitting} marginTop={'2em'} textColor={"#ffffff"} fontSize={"16px"} bgGradient='linear-gradient(145deg,#4e82fb,#5ebeff)!important' height={"60px"} borderRadius={'30px'} width={{
                  base: "300px",
                  md: "420px"
                }}
                  _hover={{ bgGradient: 'linear-gradient(145deg,#4e82fb,#5ebeff)!important' }}
                >Log in</Button>
              </Form>
            )}
          </Formik>
        </Box>
      </GridItem>

      <GridItem colSpan={5} display={{
        base: "none",
        md: "block",

      }} >
        <Box bgGradient='linear-gradient(145deg,#4e82fb,#5ebeff)!important' height="100%">
          <Carousel ImagesArray={ImagesArray} type="login" />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Login;
