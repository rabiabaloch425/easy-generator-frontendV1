import { Box, Image } from "@chakra-ui/react"

interface ViewIconProps {
    handleClick: () => void;
}

const ViewIcon = ({handleClick}: ViewIconProps) => {
    return(
        <Box onClick={handleClick}>
        <Image src="/view.png" alt="view" width="1rem" height="1rem" mt={"5px"} cursor={"pointer"} />

        </Box>
    )
}

export default ViewIcon;