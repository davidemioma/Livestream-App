import { Webhook } from "svix";
import prismadb from "@/lib/prisma";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { resetIngress } from "@/lib/actions/ingress";

export async function POST(req: Request) {
  // Get webhook secret
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();

  const svix_id = headerPayload.get("svix-id");

  const svix_timestamp = headerPayload.get("svix-timestamp");

  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();

  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get event type and id
  const { id } = evt.data;

  const eventType = evt.type;

  if (eventType === "user.created") {
    // Create user and stream in the database
    const user = await prismadb.user.create({
      data: {
        externalUserId: payload.data.id,
        imageUrl: payload.data.image_url,
        username: payload.data.username,
        email: payload.data.email_addresses[0].email_address,
        stream: {
          create: {
            name: `${payload.data.username}'s Stream`,
          },
        },
      },
    });
  }

  if (eventType === "user.updated") {
    //Check if user exists
    const currUser = await prismadb.user.findUnique({
      where: {
        externalUserId: payload.data.id,
      },
    });

    if (!currUser) {
      return new Response("User not found!", {
        status: 404,
      });
    }

    // Update user in the database
    await prismadb.user.update({
      where: {
        externalUserId: payload.data.id,
      },
      data: {
        imageUrl: payload.data.image_url,
        username: payload.data.username,
      },
    });
  }

  if (eventType === "user.deleted") {
    // Reset Ingress
    await resetIngress(payload.data.id);

    // Delete user in the database
    await prismadb.user.delete({
      where: {
        externalUserId: payload.data.id,
      },
    });
  }

  return new Response("", { status: 200 });
}
