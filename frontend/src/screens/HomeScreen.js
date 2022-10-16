import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";

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
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            try {
                const result = await axios.get("/api/products");
                dispatch({ type: "FETCH_SUCCESS", payload: result.data });
            } catch (error) {
                dispatch({ type: "FETCH_FAIL", payload: error });
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <Helmet>
                <title>amazona</title>
            </Helmet>
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
