-- Seed payment details

-- First, clear existing payment details
DELETE FROM payment_details;

-- Insert default payment details
INSERT INTO payment_details (bank_name, account_number, account_holder_name) VALUES
('United Bank Of Africa', '2325812076', 'Daramola Irewole');