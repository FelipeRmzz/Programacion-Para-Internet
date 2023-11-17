import express from "express";
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import indexRoutes from './routes/index.js';

const app = express();
//obtenemos la ruta actual
const __dirname = dirname(fileURLToPath(import.meta.url));

//establecemos que pueda utilizar view engine para usar ejs(HTML con mas cosas)
app.set('views', join(__dirname, 'views'));//donde estan los views
app.set('view engine', 'ejs');

//para usar los get que importamos de el archivo index en la carpeta routes
app.use(indexRoutes);

app.use(express.static(join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server listening on port ',3000);
})
