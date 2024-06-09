import { Box, Image } from "@chakra-ui/react"

interface HideIconProps {
    handleClick: () => void;
}

const HideIcon = ({handleClick}: HideIconProps) => {
    return(
        <Box onClick={handleClick}>
        <Image src="/hide.png" alt="view" width="1rem" height="1rem" mt={"5px"} cursor={"pointer"} />

        </Box>
    )
}

export default HideIcon;