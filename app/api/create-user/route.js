// import { createClient } from "@supabase/supabase-js";

// export async function POST(req) {
//   const body = await req.json();
//   const { email, password, name, role, department,branch,enrollmentnumber } = body;
// console.log("BODY:", body);

//   const supabaseAdmin = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.SUPABASE_SERVICE_ROLE_KEY
//   );

//   const { data, error } = await supabaseAdmin.auth.admin.createUser({
//     email,
//     password,
//     user_metadata: {
//       role,
//       name,
//     },
//   });

//   if (error) {
//     return Response.json({ error: error.message }, { status: 400 });
//   }

//   await supabaseAdmin.from("users").upsert([{
//     id: data.user.id,
//     name,
//     role,
//     department,
//     branch,
//     enrollmentnumber
//   }]);

//   return Response.json({ success: true });
// }



import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  const body = await req.json();
  const { email, password, name, role, department, branch, enrollmentnumber } = body;

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // 1️⃣ Create Auth User
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
     email_confirm: true,
    user_metadata: {
      role,
      name,
    },
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  // 2️⃣ Insert into users table
  const { error: insertError } = await supabaseAdmin
    .from("users")
    .insert({
      id: data.user.id,
      name,
      role,
      department,
      branch: role === "student" ? branch : null,
      rollnum: role === "student" ? enrollmentnumber : null,
    });

  if (insertError) {
    return Response.json({ error: insertError.message }, { status: 400 });
  }

  return Response.json({ success: true });
}
