import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };

        case "FETCH_SUCCESS":
            return { ...state, products: action.payload, loading: false };

        case "FETCH_FAIL":
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

function HomeScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        loading: true,
        error: false,
        products: [],
    });
    // const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            try {
                const result = await axios.get("/api/products");
                dispatch({ type: "FETCH_SUCCESS", payload: result.data });
            } catch (error) {
                dispatch({ type: "FETCH_FAIL", payload: error });
            }

            // setProducts(result.data);
        };
        fetchData();
    }, []);
    return (
        <div>
            <h1>list product</h1>
            <div className="products">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <Row>
                        {products.map((product) => (
                            <Col sm={6} md={4} lg={3} className="mb-3" key={product.slug}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </div>
    );
}

export default HomeScreen;
