export interface Order {
    id: number;
    customer_name: string;
    customer_email: string;
    order_date: date;
    amount_in_cents: number;
    status: 'completed' | 'pending';
    created_at: date;
    updated_at: date;
}