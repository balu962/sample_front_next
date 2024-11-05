import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';
import Link from 'next/link';

const BlogOwner = () => {
    return (
        <Card style={{ width: '100%', marginBottom: '20px' }}>
            <Link href="/">
            <CardMedia
                component="img"
                height="140"
                image="/images/test.png"
            />
            <CardContent>
                <Typography variant="h6" color='#000000'>
                    블로그 주인
                </Typography>
                <Typography variant="body2" color='#101010'>
                    하고 싶은 말
                </Typography>
            </CardContent>
            </Link>
        </Card>
    );
};

export default BlogOwner;