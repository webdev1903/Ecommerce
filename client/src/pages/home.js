import { useState, useEffect, useContext } from "react";
import { Box, Image, Grid, GridItem, Text, Button } from "@chakra-ui/react";
import Popover from "../components/popover";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import axios from "axios";
import Footer from "../components/footer";
import Skeleton from "react-loading-skeleton";
import { Loading, Error } from "../context/AuthContext/action";
import { Link } from "react-router-dom";

export default function Home() {
  const [slidingImage, setSlidingImage] = useState("prod1.jpg");
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState([]);

  // console.log(data);
  useEffect(() => {
    carousel();
    handleData();
  }, []);
  if (state.loading) {
    return <h1>...Loading</h1>;
    // return (
    //   <Box>
    //     <Box w="100%">
    //       <Skeleton w="100%" h="600px" />
    //     </Box>
    //     <Grid
    //       top="350px"
    //       templateColumns={["repeat(2,1fr)", "repeat(3,1fr)", "repeat(5,1fr)"]}
    //       justifyContent="space-between"
    //       gap={1}
    //       align="center"
    //     >
    //       <GridItem h="300px">
    //         <Image />
    //         <Text>
    //           <Skeleton />
    //         </Text>
    //         <Button>
    //           <Skeleton />
    //         </Button>
    //         <Button>
    //           <Skeleton />
    //         </Button>
    //       </GridItem>
    //       <GridItem h="300px">
    //         <Image />
    //         <Text>
    //           <Skeleton />
    //         </Text>
    //         <Button>
    //           <Skeleton />
    //         </Button>
    //         <Button>
    //           <Skeleton />
    //         </Button>
    //       </GridItem>
    //       <GridItem h="300px">
    //         <Image />
    //         <Text>
    //           <Skeleton />
    //         </Text>
    //         <Button>
    //           <Skeleton />
    //         </Button>
    //         <Button>
    //           <Skeleton />
    //         </Button>
    //       </GridItem>
    //       <GridItem h="300px">
    //         <Image />
    //         <Text>
    //           <Skeleton />
    //         </Text>
    //         <Button>
    //           <Skeleton />
    //         </Button>
    //         <Button>
    //           <Skeleton />
    //         </Button>
    //       </GridItem>
    //     </Grid>
    //     <Button>
    //       <Skeleton />
    //     </Button>
    //     <Box>
    //       <Skeleton />
    //     </Box>
    //   </Box>
    // );
  }

  const handleData = async () => {
    const res = await axios.get(`/products?page=1&limit=5`);
    setData(res.data.products);
    dispatch({ type: Loading });
  };

  const carousel = () => {
    dispatch({ type: Loading });
    const arr = [
      "prod1.jpg",
      "prod2.jpg",
      "prod3.jpg",
      "prod4.jpg",
      "prod5.jpg",
    ];
    let i = 1;
    const id = setInterval(() => {
      if (i == 4) {
        i = 0;
      }
      setSlidingImage(arr[i]);
      i++;
    }, 3000);
  };
  const trimTitle = (title) => {
    const newT = title.split(" ");
    const rT = newT[0] + " " + newT[1] + " " + newT[2] + "...";
    return rT;
  };
  return (
    <>
      <Box>
        <Box position="relative">
          <Image
            src={slidingImage}
            alt="broken image"
            w="100%"
            h="100%"
            objectPosition="left"
          ></Image>
        </Box>
        <Grid
          display={["none", "grid", "grid"]}
          position="absolute"
          top={["200px", "250px", "350px"]}
          // display={["none", "block", "block"]}
          templateColumns={["repeat(2,1fr)", "repeat(3,1fr)", "repeat(5,1fr)"]}
          justifyContent="space-between"
          gap={1}
          align="center"
        >
          {data.length > 0 &&
            data.map((e) => (
              <GridItem
                key={e.id}
                h="300px"
                // border="1px solid"
                // borderColor="black"
                backgroundColor="white"
              >
                <Image src={e.image} h="60%" w="80%" />
                <Text>{trimTitle(e.title)}</Text>
                <Button>Price : Rs.{e.price}</Button>
                <Button>
                  Rating : {e.rating[0].rate} ({e.rating[0].count})
                </Button>
              </GridItem>
            ))}
        </Grid>
        <Link to="/products">
          <Button>Shop for all products</Button>
        </Link>
        <Footer />
      </Box>
    </>
  );
}
