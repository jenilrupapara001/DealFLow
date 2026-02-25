const restrictInDemo = (req, res, next) => {
    if (process.env.DEMO_MODE === 'true') {
        const restrictedMethods = ['DELETE', 'PUT', 'PATCH'];
        const isDestructive = restrictedMethods.includes(req.method);

        // Allow some PUT/PATCH for basic interaction if needed, 
        // but strictly block DELETE and User updates.
        if (req.method === 'DELETE' || req.originalUrl.includes('/api/users/profile')) {
            return res.status(403).json({
                message: 'This action is disabled in Demo Mode to protect the system data. In a full version, you would have complete control!'
            });
        }
    }
    next();
};

module.exports = restrictInDemo;
