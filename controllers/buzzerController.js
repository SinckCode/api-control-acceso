let buzzerState = false;

const playBuzzer = (req, res) => {
    buzzerState = true;
    res.status(200).json({ success: true, message: '🔔 Buzzer activado' });
};

const getBuzzerStatus = (req, res) => {
    res.status(200).json({ success: true, buzzer: buzzerState });
    buzzerState = false; // Reiniciar después de leer
};

module.exports = {
    playBuzzer,
    getBuzzerStatus
};
