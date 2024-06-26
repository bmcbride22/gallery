import { db } from "~/server/db";
import { type NextRequest, NextResponse } from "next/server";

import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { insertUserSchema, users } from "~/server/db/schema";

export async function POST(req: NextRequest) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  console.log("Webhook received");
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const body = JSON.stringify(await req.json());
  console.log("Webhook body:", body);

  // Create a new Svix instance with your secret.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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

  // Get the ID and type or throw
  if (!evt.data.id || !evt.type) {
    return new NextResponse("Error occured -- no event data or type", {
      status: 400,
    });
  }
  const clerkId = evt.data.id;
  const eventType = evt.type;
  console.log(`Webhook with and ID of ${clerkId} and type of ${eventType}`);
  if (eventType === "user.created" || eventType === "user.updated") {
    const firstName = evt.data.first_name;
    const lastName = evt.data.last_name;
    const name = firstName + " " + lastName;
    const primary_email_address_id = evt.data.primary_email_address_id;
    // UserJSON.email_addresses is an array of EmailAddressJSON
    const emailObject = evt.data.email_addresses?.find((email) => {
      return email.id === primary_email_address_id;
    });
    if (!emailObject) {
      return new NextResponse("Error occured -- no email on profile", {
        status: 400,
      });
    }
    const email = emailObject.email_address;
    const user = insertUserSchema.parse({
      clerkId,
      email,
      name: name || "",
    });
    await db.insert(users).values(user).onConflictDoUpdate({
      target: users.clerkId,
      set: user,
    });
  }

  return new NextResponse("", { status: 200 });
}
