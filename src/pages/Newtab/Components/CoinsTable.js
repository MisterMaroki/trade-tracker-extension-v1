import {
  Container,
  LinearProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CoinList } from '../../Content/config/api';
import { CryptoState } from '../CryptoContext';

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const { currency } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const data = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  return (
    <Container style={{ paddingTop: 20 }}>
      <Typography
        variant="h6"
        style={{ margin: 15, fontWeight: 'bold', fontFamily: 'Karla' }}
      >
        By Market Cap
      </Typography>

      <TextField
        variant="outlined"
        label="Search for a coin..."
        style={{ marginBottom: 20, width: '100%' }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer>
        {loading ? (
          <LinearProgress />
        ) : (
          <Table>
            <TableHead style={{ backgroundColor: 'whitesmoke' }}>
              <TableRow style={{ borderRadius: '10px' }}>
                {['Coin', 'Price', '24h Change', 'Market Cap'].map(
                  (head, index) => (
                    <TableCell
                      style={{
                        fontWeight: 700,
                        borderRadius:
                          index === 0
                            ? '10px 0 0 10px'
                            : index === 3
                            ? '0 10px 10px 0'
                            : '0',
                      }}
                      key={head}
                      align={head === 'Coin' ? '' : 'right'}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default CoinsTable;
