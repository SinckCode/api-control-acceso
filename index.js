const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/access', require('./routes/accessRoutes'));
app.use('/api/parking/status', require('./routes/parkingRoutes'));
app.use('/api/access_logs', require('./routes/logsRoutes'));

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
