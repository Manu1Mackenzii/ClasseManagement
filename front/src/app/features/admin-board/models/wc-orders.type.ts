export type WcOrderType = {
    order_id: string,
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    stripe_customer_id: string;
    payment_method: string;
    order_status: string;
    date_created: string;
    product_id: string;
    variation_id: string;
    product_name: string;
    quantity: string;
    subtotal: string;
    total: string;
    tax: string;
    payment_options: string;
    class_level: string;
    class_day_hour: string;
    item_type: string;
    order_total: string,
    order_total_tax: string,
    coupons_discount: string,
    coupons_discount_tax: string,
    coupons: string,
    formule_duo: string,
    stripe_product_meta: string,
    stripe_subscription_meta: string
}