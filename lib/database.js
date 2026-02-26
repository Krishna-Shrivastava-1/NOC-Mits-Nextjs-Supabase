import dotenv from 'dotenv'
import pkg from 'pg'
dotenv.config()
const {Pool} = pkg

// console.log(process.env.SUPABASE_DATABASE_URI);

export const pool = new Pool({
    connectionString:process.env.SUPABASE_DATABASE_URI,
    ssl:{
        rejectUnauthorized:false
    }
})
