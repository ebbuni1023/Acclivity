"use strict";

//Build each individual stock node
const Stocks = (stock) => {

    return (
        <Container className="stock-container">
            <Row>
                <Col><p>{stock.symbol}</p></Col>
                <Col><p>{stock.name}</p></Col>
                <Col><p>{stock.price}</p></Col>
                <Col><p>{stock.interval}</p></Col>
                <Col><p>{stock.dividend_amount}</p></Col>
                <Col><p>{stock.dividend_yield}</p></Col>
                <Col><p>{stock.payout_schedule}</p></Col>
                <Col><p>{stock.sector}</p></Col>
            </Row>
        </Container>
    );
}

//Container for all stock components on page
const StocksContainer = () => {

    const [stocks, setStocks] = React.useState([]);
    const stocksArr = [];
    const sectors = {};

    React.useEffect(() =>{
        fetch('/api/get-all-stocks')
        .then(response => response.json())
        .then(data => {
            setStocks(data)
        });
    }, []);

    for(const stock of stocks) {
        const stockNode =  <Stocks
                                symbol={stock.symbol}
                                name={stock.name}
                                sector={stock.sector}
                                dividend_yield={stock.dividend_yield}
                                dividend_amount={stock.dividend_amount}
                                payout_schedule={stock.payout_schedule}
                                price={stock.stock_price}
                                interval={stock.payout_ratio}
                            />
        if(!sectors[stock.sector]) {
            sectors[stock.sector] = [stockNode]
        }
        else {
            sectors[stock.sector].push(stockNode)
        }
    }

    for(const sector in sectors) {
        console.log('sector: ', sectors)
        stocksArr.push(
        <Row className={"sector"}>
            <Row className="sector-title"><p>{sector}</p></Row>
            <Container>{sectors[sector]}</Container>
        </Row>
        );
    }

    return (
        <Col>
        <h3>Financial</h3>
        <Container>{stocksArr}</Container>
        </Col>
    )

}