import "server-only";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function seed() {
  const hashedPassword = await bcrypt.hash("AdminPassword123!", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin user seeded.");
}

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect();
//   });
