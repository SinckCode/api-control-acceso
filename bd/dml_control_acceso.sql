USE control_acceso;

-- Insertar usuarios de prueba
INSERT INTO users (name, rfid_uid, role) VALUES
('Juan Pérez', 'UID12345678', 'empleado'),
('Ana López', 'UID98765432', 'empleado'),
('Carlos Ruiz', 'UID55555555', 'invitado');

-- Insertar logs de acceso (opcional, solo si quieres ver algo en access_logs)
INSERT INTO access_logs (user_id, rfid_uid, result, notes, assigned_space) VALUES
(1, 'UID12345678', 'granted', 'Acceso permitido', NULL),
(2, 'UID98765432', 'granted', 'Acceso permitido', NULL),
(NULL, 'UID00000000', 'denied', 'Usuario no registrado', NULL);

-- Actualizar estado de parking (por si quieres probar cambios)
UPDATE parking_status
SET is_occupied = 0, is_heat_detected = 0, updated_at = CURRENT_TIMESTAMP
WHERE id = 1;

-- Insertar usuario de auth (guardia que inicia sesión en la App MAUI)
INSERT INTO auth_users (name, email, password, rol) VALUES
('Guardia Principal', 'guardia@control.com', '$2b$10$BMK6JTGkEDuJhH7roOJ/ceymgpfo4cNnyqRLaav3UvQLzOeh0VRk6', 'guardia');
