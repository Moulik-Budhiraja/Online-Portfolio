"use server";

import { prisma } from "@/db";

type ActivityData = {
  userId?: string;
  path: string;
  ip?: string;
  userAgent?: string;
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
};

export async function logActivity(data: ActivityData) {
  await prisma.activity.create({
    data: {
      userId: data.userId,
      path: data.path,
      ip: data.ip,
      userAgent: data.userAgent,
      country: data.country,
      region: data.region,
      city: data.city,
      timezone: data.timezone,
    },
  });
}
