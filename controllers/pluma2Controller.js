// controllers/pluma2Controller.js
let pluma2State = 'closed';

const openPluma2 = (req, res) => {
    pluma2State = 'open';
    res.status(200).json({ success: true, message: 'Pluma 2 abierta' });
};

const closePluma2 = (req, res) => {
    pluma2State = 'closed';
    res.status(200).json({ success: true, message: 'Pluma 2 cerrada' });
};

const getPluma2Status = (req, res) => {
    res.status(200).json({ success: true, state: pluma2State });
};

module.exports = {
    openPluma2,
    closePluma2,
    getPluma2Status
};
