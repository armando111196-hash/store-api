import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

let products: Product[] = [
  { id: 1, name: "Camiseta básica", price: 15.5, stock: 40, category: "ropa" },
  { id: 2, name: "Taza de cerámica", price: 6.9, stock: 120, category: "hogar" }
];

app.get('/products', (req: Request, res: Response) => {
  res.status(200).json(products);
});

app.post('/products', (req: Request, res: Response) => {
  const { name, price, stock, category } = req.body;

  if (!name || price === undefined || price === null || price === '') {
    return res.status(400).json({ error: "El nombre y el precio son obligatorios" });
  }

  const parsedPrice = Number(price);
  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    return res.status(400).json({ error: "El precio debe ser un número mayor que 0" });
  }

  const newProduct: Product = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name,
    price: parsedPrice,
    stock: stock !== undefined ? stock : 0,
    category: category || ""
  };

  products.push(newProduct);
  return res.status(201).json(newProduct);
});

app.get('/products/:id', (req: Request, res: Response) => {
  const productId = parseInt(req.params.id as string);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  return res.status(200).json(product);
});

export default app;