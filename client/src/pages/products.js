import {
  Grid,
  Box,
  GridItem,
  Image,
  Text,
  Button,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useSearchParams, useParams } from "react-router-dom";
import Footer from "../components/footer";

const maintainPage = (value) => {
  value = +value;
  if (typeof value === "number" && value <= 0) {
    value = 1;
  }
  if (!value) {
    value = 1;
  }
  return value;
};

export default function Product() {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  let initPage = maintainPage(searchParams.get("page"));
  const [page, setPage] = useState(initPage);
  const [filter, setFilter] = useState("");
  const totalPages = useRef(null);
  const { state, dispatch } = useContext(AuthContext);

  console.log("works");

  useEffect(() => {
    handleData(page, filter);
  }, [page, filter]);

  useEffect(() => {
    setSearchParams({ page, filter });
  }, [page, filter]);

  const handleData = async (page = 1, filter) => {
    if (filter == "") {
      const res = await axios.get(`/products?page=${page}&limit=8`);
      // console.log(res);
      setData(res.data.products);
      totalPages.current = res.data.pages;
    } else {
      const res = await axios.get(
        `/products?page=${page}&limit=8&filter=${filter}`
      );
      // console.log(res);
      setData(res.data.products);
      totalPages.current = res.data.pages;
    }
  };

  return (
    <Box>
      <Select
        placeholder="Sort By"
        w="fit-content"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="low">Price low to high</option>
        <option value="high">Price high to low</option>
        <option value="rating">Rating</option>
        <option value="popular">Popularity</option>
        <option value="latest">Latest</option>
      </Select>
      <Grid
        templateColumns={["repeat(1,1fr)", "repeat(2,1fr)", "repeat(4,1fr)"]}
        align="center"
        justify="space-between"
      >
        {data.map((e) => (
          <GridItem key={e.id}>
            <ProductCard
              image={e.image}
              price={e.price}
              title={e.title}
              ratings={e.rating[0]}
              _id={e._id}
            />
          </GridItem>
        ))}
      </Grid>
      <Box>
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          PREV
        </Button>
        <Button>{page}</Button>
        <Button
          disabled={page === totalPages.current}
          onClick={() => setPage((prev) => prev + 1)}
        >
          NEXT
        </Button>
      </Box>
      <Footer />
    </Box>
  );
}
