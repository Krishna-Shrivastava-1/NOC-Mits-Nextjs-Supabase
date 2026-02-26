import "dotenv/config";
import { pool } from "../lib/database.js";

async function runMigration() {
  const query = `
create extension if not exists "pgcrypto";

-- users Table
    create table if not exists users (
 id uuid primary key references auth.users(id) on delete cascade,
  name varchar(255) ,
  role text not null default 'student' check (role in ('student','teacher','tp_admin')),
  rollnum varchar(255) unique,
  department varchar(255),
  departmentcoordinator varchar(255) unique,
  branch varchar(255),
  coordinator boolean default false,
  createdat timestamptz default current_timestamp
);


 -- NOC Table
   create table if not exists noc_requests (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references users(id) on delete cascade,
  companyname varchar(255) not null,
  createdat timestamptz default current_timestamp,
  yearofstudy integer not null,
  semester integer not null,
  sessionhalf varchar(25) not null,
  sessionyear varchar(25) not null,
  duration integer not null,
  location varchar(255) not null,
  startdate date not null,
  enddate date not null,
  worktype text not null check (worktype in ('remote','hybrid','onsite')),
  stipend varchar(20) default 'none',
  offerletteruri text not null,
  roleincompany varchar(255) not null,
  jobdescription text not null,
  companyrecievername varchar(255) not null,
  companyrecieverdesignation varchar(255) not null,
  nocstatusdepartment text default 'pending',
  nocstatustandp text default 'pending',
  allowededit boolean default false,
  department VARCHAR(20) default none,
  comment varchar(255)
);

    `;

  try {
    await pool.query(query);
    console.log("Tables created");
  } catch (error) {
    console.log(error.message);
  } finally {
    await pool.end();
  }
}
runMigration();
