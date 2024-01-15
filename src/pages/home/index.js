import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';

export default function Home() {

    const [data, setData] = useState([])

    const [page, setPage] = useState(1)
    const itemPage = 10

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${itemPage}&offset=${itemPage * (page - 1)}`).then(res => {
            setData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [page])

    return (
        <>
            <h1>Home</h1>

            {data.results.length > 0 && data.results.map(item => (
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={item.url}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}

            <Stack spacing={2}>
                <Pagination onChange={(e, page) => { setPage(page) }} count={data?.count / 10} variant="outlined" shape="rounded" />
            </Stack>

        </>
    )
}