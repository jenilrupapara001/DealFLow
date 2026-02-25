const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Lead = require('../models/Lead');
const Deal = require('../models/Deal');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('--- SEEDING STARTED ---');

        // 1. Clear existing data
        await User.deleteMany({});
        await Lead.deleteMany({});
        await Deal.deleteMany({});
        console.log('Database cleared!');

        // 2. Create Users
        const admin = await User.create({
            name: 'Demo Admin',
            email: 'admin@dealflow.com',
            password: 'password123',
            role: 'admin'
        });

        const manager = await User.create({
            name: 'Sales Manager',
            email: 'manager@dealflow.com',
            password: 'password123',
            role: 'manager'
        });

        console.log('Users created!');

        // 3. Create Leads
        const sources = ['LinkedIn', 'CSV', 'Manual'];
        const statuses = ['new', 'contacted', 'in-progress', 'closed'];
        const countries = ['US', 'UK', 'UAE', 'Other'];

        const leads = [];
        for (let i = 0; i < 20; i++) {
            leads.push({
                name: `Lead ${i + 1}`,
                email: `lead${i + 1}@example.com`,
                phone: `+1 555-010${i}`,
                company: `Company ${String.fromCharCode(65 + i)}`,
                source: sources[Math.floor(Math.random() * sources.length)],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                region: countries[Math.floor(Math.random() * countries.length)],
                assignedTo: admin._id,
                userId: admin._id
            });
        }
        const createdLeads = await Lead.insertMany(leads);
        console.log('20 Leads created!');

        // 4. Create Deals (Historical Data for Analytics)
        const stages = ['proposal', 'negotiation', 'closed-won', 'closed-lost'];
        const currentYear = new Date().getFullYear();

        const deals = [];
        for (let month = 0; month < 12; month++) {
            const count = Math.floor(Math.random() * 5) + 3; // 3-8 deals per month
            for (let j = 0; j < count; j++) {
                const stage = stages[Math.floor(Math.random() * stages.length)];
                deals.push({
                    dealValue: Math.floor(Math.random() * 50000) + 5000,
                    stage: stage,
                    leadId: createdLeads[Math.floor(Math.random() * createdLeads.length)]._id,
                    userId: admin._id,
                    createdAt: new Date(currentYear, month, Math.floor(Math.random() * 28) + 1)
                });
            }
        }
        await Deal.insertMany(deals);
        console.log(`${deals.length} Deals created across 12 months!`);

        console.log('--- SEEDING COMPLETED SUCCESSFULLY ---');
        console.log('Admin Email: admin@dealflow.com | Password: password123');
        process.exit();
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
