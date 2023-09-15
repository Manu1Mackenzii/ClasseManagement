export default() => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_URL
    },
    wordpress: {
        apiUrl: process.env.WP_API_URL,
        username: process.env.WP_API_USERNAME,
        password: process.env.WP_API_PASSWORD,
    }
});