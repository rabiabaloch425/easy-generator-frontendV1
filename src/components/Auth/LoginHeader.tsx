import React from 'react';
import { Button, Grid, GridItem, Text } from '@chakra-ui/react';
import AppLogo from '../../assets/logo';
import { useNavigate } from 'react-router-dom';

interface LoginHeaderProps {
    subHeading?: string;
    buttonText?: string;
    redirectRoute?: string;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ subHeading, buttonText, redirectRoute }) => {
    const navigate = useNavigate();
    return (
        <Grid paddingX={{
            base: "1rem",
            md: "3rem"
        }} paddingY={"1rem"} templateColumns="repeat(12, 1fr)">
            <GridItem colSpan={6}>
                <AppLogo />
            </GridItem>
            <GridItem colSpan={6} display={"flex"} justifyContent={"end"} alignItems={"center"}>
                <Text textColor={"#848fa3"} fontSize={"14px"} display={{
                    base: "none",
                    md: "block",
                }}>{subHeading}</Text>
                <Button
                    borderRadius={"20em"}
                    paddingX={"48px"}
                    marginLeft={'16px'}
                    fontWeight={600}
                    border={"1px solid #eaedf1"}
                    height={"42px"}
                    _hover={{ bgColor: "#fff", borderColor: "#000000" }}
                    textColor={'#363e4e!important'}
                    fontSize="14px"
                    variant="outline"
                    onClick={() => {
                        navigate(redirectRoute || '/')
                    }}
                >
                    {buttonText}
                </Button>
            </GridItem>
        </Grid>
    );
};

export default LoginHeader;
