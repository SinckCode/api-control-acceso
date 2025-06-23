let plumaState = 'closed'; // estado actual de la pluma (simulado)

const openPluma = (req, res) => {
    plumaState = 'open';
    res.status(200).json({ success: true, message: 'Pluma abierta' });
};

const closePluma = (req, res) => {
    plumaState = 'closed';
    res.status(200).json({ success: true, message: 'Pluma cerrada' });
};

const getPlumaStatus = (req, res) => {
    res.status(200).json({ success: true, state: plumaState });
};

module.exports = {
    openPluma,
    closePluma,
    getPlumaStatus
};
