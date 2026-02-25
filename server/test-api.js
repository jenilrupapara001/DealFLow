const axios = require('axios');

const testApi = async () => {
    try {
        // 1. Health Check
        const health = await axios.get('http://localhost:5001/');
        console.log('✅ API Health Check:', health.data);

        // 2. Register User (Example)
        console.log('⏳ Attempting to register test user...');
        const register = await axios.post('http://localhost:5001/api/users', {
            name: 'Test Admin',
            email: 'admin@dealflow.com',
            password: 'password123',
            role: 'admin'
        }).catch(err => {
            return { data: { message: err.response?.data?.message || err.message }, status: err.response?.status };
        });

        console.log(`👤 Registration Stats: ${register.status}`);
        console.log('👤 Registration Response:', JSON.stringify(register.data, null, 2));

    } catch (err) {
        console.error('❌ API Test Failed:', err.message);
    }
};

testApi();
