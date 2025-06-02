-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_details ENABLE ROW LEVEL SECURITY;

-- Products Policies
-- Everyone can view products
CREATE POLICY "Anyone can view products"
ON products FOR SELECT
TO public
USING (true);

-- Cart Policies
-- Users can only see their own cart items
CREATE POLICY "Users can view their own cart items"
ON cart FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own cart items
CREATE POLICY "Users can insert their own cart items"
ON cart FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own cart items
CREATE POLICY "Users can update their own cart items"
ON cart FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Users can delete their own cart items
CREATE POLICY "Users can delete their own cart items"
ON cart FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Orders Policies
-- Users can view their own orders
CREATE POLICY "Users can view their own orders"
ON orders FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own orders
CREATE POLICY "Users can insert their own orders"
ON orders FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Public can view orders by order_id (for tracking)
CREATE POLICY "Anyone can view order by order_id"
ON orders FOR SELECT
TO public
USING (true);

-- Bookings Policies
-- Users can view their own bookings
CREATE POLICY "Users can view their own bookings"
ON bookings FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own bookings
CREATE POLICY "Users can insert their own bookings"
ON bookings FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Contact Messages Policies
-- Anyone can insert contact messages
CREATE POLICY "Anyone can insert contact messages"
ON contact_messages FOR INSERT
TO public
WITH CHECK (true);

-- Payment Details Policies
-- Anyone can view payment details
CREATE POLICY "Anyone can view payment details"
ON payment_details FOR SELECT
TO public
USING (true);