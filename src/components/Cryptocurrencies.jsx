import React, { useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'


const CryptoCurrencies = ({simplified}) => {
  const count = simplified? 10 : 100;
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
 
  useEffect (() => {
    
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm));
    setCryptos(filteredData)
  },[cryptosList, searchTerm]);
  
  if(isFetching) return 'Loading ...';
  
  return (
    <>
    {!simplified &&(
      <div className='search-crypto'>
      <Input  placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)}/>

    </div>
    )}
    
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currecny)=>(
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currecny.uuid}>
            <Link key={currecny.uuid} to={`/crypto/${currecny.uuid}`}>
              <Card 
              title={`${currecny.rank}. ${currecny.name}`}
              extra={<img className='crypto-image' src={currecny.iconUrl}/>}
              hoverable
              >
                <p>Price: {millify(currecny.price)}</p>
                <p>Market Cap: {millify(currecny.marketCap)}</p>
                <p>Daily Change: {millify(currecny.change)}</p>

              </Card>
            
            </Link>
          </Col>
        ))}

      </Row>
    </>
  )
}

export default CryptoCurrencies