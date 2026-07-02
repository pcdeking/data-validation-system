const express = require('express');
const sequelize = require('./config/database');

const VerifiedRecord = require('./models/VerifiedRecord');
const DuplicateRecord = require('./models/DuplicateRecord');
const AuditLog = require('./models/AuditLog');

const recordRoutes = require('./routes/recordRoutes');
const FalsePositiveRecord =
require('./models/FalsePositiveRecord');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/records', recordRoutes);

app.get('/health', (req, res) => {

    res.status(200).json({
        status: 'UP',
        service: 'data-validation-api'
    });

});

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Data Validation System Running'
//   });
// });

sequelize.authenticate()
    .then(async () => {
        console.log('✅ Database Connected Successfully');

        await sequelize.sync({ alter: true });

        console.log('✅ Database Tables Synced');
    })
    .catch((err) => {
        console.error('❌ Database Connection Failed:', err);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
