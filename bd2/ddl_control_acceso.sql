CREATE DATABASE IF NOT EXISTS control_acceso;
USE control_acceso;

-- Tabla users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    rfid_uid VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('empleado', 'invitado') NOT NULL
);

-- Tabla access_logs
CREATE TABLE IF NOT EXISTS access_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    rfid_uid VARCHAR(100) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    result ENUM('granted', 'denied') NOT NULL,
    notes TEXT,
    assigned_space VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabla parking_status
CREATE TABLE IF NOT EXISTS parking_status (
    id INT PRIMARY KEY DEFAULT 1,
    is_occupied BOOLEAN NOT NULL,
    is_heat_detected BOOLEAN NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE parking_status ADD COLUMN is_reserved BOOLEAN DEFAULT 0;


-- Insertar un registro inicial
INSERT IGNORE INTO parking_status (id, is_occupied, is_heat_detected) VALUES (1, 0, 0);


CREATE TABLE IF NOT EXISTS auth_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('guardia', 'admin') DEFAULT 'guardia',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);