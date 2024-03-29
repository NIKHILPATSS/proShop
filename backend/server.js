import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import path from 'path';
import fs from 'fs'
import morgan from 'morgan';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

console.log('process.env.NODE_ENV',process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
	console.log("HERE",__dirname)
	fs.access(path.join(__dirname, '/frontend/build'), function(error) {
		if (error) {
		  console.log("Directory does not exist.")
		} else {
		  console.log("Directory exists.")
		}
	})
	console.log(path.join(__dirname, '/frontend/build'))
	app.use(express.static(path.join(__dirname, '/frontend/build')));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	);
} else {
	app.get('/', (req, res) => {
		res.send('API is running');
	});
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
	)
);
