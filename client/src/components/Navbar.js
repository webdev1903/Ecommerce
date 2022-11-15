import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState, useContext, useRef, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import PopOver from "./popover";
import styles from "./components.css";
import axios from "axios";
import AccountDetails from "./accountDetails";

export default function Navbar() {
  const [searchText, setSearchText] = useState("");
  const { state, dispatch } = useContext(AuthContext);
  const [searchData, setSearchData] = useState([]);
  const ref = useRef(null);
  const [accountBox, setAccountBox] = useState(false);

  useEffect(() => {
    debouncing(searchText);
  }, [searchText]);

  const getFirstName = () => {
    const userDetails = state.user;
    let Name = userDetails.name;
    const arr = Name.trim().split(" ");
    return arr[0];
  };
  const handleSearch = async (s) => {
    const res = await axios(`/products?title=${s}`);
    setSearchData(res.data);
    // console.log(res);
  };

  const debouncing = (s) => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      handleSearch(s);
    }, 500);
  };
  return (
    <Flex
      // display="sticky"
      justify="space-between"
      align="center"
      h="50px"
      border="3px solid"
      borderColor="teal.500"
    >
      <Flex
        h="100%"
        justify="center"
        align="center"
        p="20px"
        _hover={{ border: "2px solid", borderColor: "black.200", p: "18px" }}
      >
        <Link to="/">E-commerce</Link>
      </Flex>
      <Flex
        h="100%"
        justify="center"
        align="center"
        p="20px"
        _hover={{ border: "2px solid", borderColor: "black.200", p: "18px" }}
      >
        <Link to="/products">Products</Link>
      </Flex>
      <Box display={["none", "block", "block"]}>
        <InputGroup position="relative">
          <Input
            type="text"
            placeholder="search for your favourite products"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value, debouncing());
              // await debouncing();
            }}
            w="500px"
          />
          <InputRightElement size="xs">
            <Button
              colorScheme="blue"
              aria-label="Search database"
              onClick={handleSearch}
            >
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
        {searchData.length > 0 && searchText.length > 0 && (
          <PopOver data={searchData} />
        )}
      </Box>
      {!state.authStatus && (
        <Flex
          h="100%"
          p="20px"
          justify="center"
          align="center"
          _hover={{ border: "2px solid", borderColor: "black.200", p: "18px" }}
        >
          <Link to="/login">Signup/Login</Link>
        </Flex>
      )}
      {state.authStatus && (
        <Box
          display="relative"
          w="150px"
          _hover={{ border: "2px solid", borderColor: "black.200" }}
        >
          <Link to="/account">
            <Flex direction="column">
              <Text display={["none", "block", "block"]}>
                Hello, {getFirstName()}{" "}
              </Text>
              <Text>Account</Text>
            </Flex>
          </Link>
        </Box>
      )}
      {/* {accountBox && <AccountDetails />} */}
      <Link to="/cart">
        <Box p="20px">
          <Image src="./cart.png" alt="Cart" h={["10", "10", "10"]} />
        </Box>
      </Link>
    </Flex>
  );
}
