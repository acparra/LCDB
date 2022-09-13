import express from 'express'
const cors = require('cors')
import authRouter from './routes/auth'
import storesRouter from './routes/stores'
import employeesRouter from './routes/employees'
import clientsRouter from './routes/clients'
import inventoryRouter from './routes/inventory'
import billsRouter from './routes/bills'

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("El servidor esta corriendo en el puerto: ", PORT)
})

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/stores', storesRouter)
app.use('/api/employees', employeesRouter)
app.use('/api/inventory', inventoryRouter)
app.use('/api/clients', clientsRouter)
app.use('/api/bills', billsRouter)

