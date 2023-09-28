//Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { db } from "@/db";

export default function handler(req, res) {
  const { email, password } = req.body;


  const sql = `SELECT * FROM admin WHERE email = ${email} AND password = ${password}`;

  const admin = { email, password };
  db.checkAdmin(admin);
}
