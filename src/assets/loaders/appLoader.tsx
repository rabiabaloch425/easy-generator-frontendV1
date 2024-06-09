import { Box, Image, keyframes } from '@chakra-ui/react';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AppLoader = () => {
    return (
        <Box position="relative" display="flex" justifyContent="center" alignItems="center">
            <Box
                position="absolute"
                animation={`${spin} 1s linear infinite`}
                borderRadius="full"
                h="32"
                w="32"
                borderTop="4px solid"
                borderBottom="4px solid"
                borderColor="orange.500"
            />
            <Image
                src="https://assets.easygenerator.com/fragment/auth-page/2024.05.10.master-f15c2cf9ab/fe2d0604cd7c37cb56fba71cae72c2e6.svg"
                borderRadius="full"
                h="28"
                w="28"
            />
        </Box>
    );
}

export default AppLoader;
