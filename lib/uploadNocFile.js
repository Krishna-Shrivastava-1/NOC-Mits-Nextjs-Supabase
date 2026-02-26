export async function uploadNocFile(file, userId, supabase) {
  if (!file) return null

 const filePath = `${userId}/${Date.now()}.pdf`

  const { error } = await supabase.storage
    .from("noc-files")
    .upload(filePath, file, {
      upsert: true
    })

  if (error) {
    throw new Error(error.message)
  }

  const { data } = supabase.storage
    .from("noc-files")
    .getPublicUrl(filePath)

  return {
    path: filePath,          // 🔥 important for deletion
    publicUrl: data.publicUrl
  }
}