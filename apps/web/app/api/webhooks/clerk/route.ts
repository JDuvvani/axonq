/* eslint-disable @typescript-eslint/no-explicit-any */
import { env as clientEnv } from "@/env/client";
import { env as serverEnv } from "@/env/server";
import { apiFetch } from "@/lib/apiClient";
import {
  CreateUserDTO,
  GetUserByClerkIdDTO,
  IUser,
  UpdateUserDTO,
} from "@axon/types";
import { WebhookEvent } from "@clerk/nextjs/server";
import axios, { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: NextRequest) {
  const headers = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };

  if (
    !headers["svix-id"] ||
    !headers["svix-timestamp"] ||
    !headers["svix-signature"]
  ) {
    return new NextResponse("Missing Svix headers", { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(serverEnv.CLERK_WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (err: any) {
    console.error("Error verifying webhook", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    try {
      const {
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        primary_email_address_id,
      } = evt.data;

      const primaryEmail = email_addresses.find(
        (email) => email.id === primary_email_address_id
      );

      if (!primaryEmail) {
        return new NextResponse("No primary email found", { status: 400 });
      }

      let input: CreateUserDTO = {
        clerkId: id,
        name: `${first_name} ${last_name}`.trim(),
        email: primaryEmail.email_address,
        imageUrl: image_url,
      };

      if (evt.data.unsafe_metadata.token) {
        input = { ...input, token: evt.data.unsafe_metadata.token };
      }

      await axios.post(`${clientEnv.NEXT_PUBLIC_API_URL}/api/v1/users`, input);
    } catch (err: any) {
      console.error("Error creating user in database", err);
      return new NextResponse("Error creating user in database", {
        status: 400,
      });
    }
  }

  if (eventType === "user.updated") {
    const {
      id,
      image_url,
      first_name,
      last_name,
      email_addresses,
      primary_email_address_id,
    } = evt.data;

    const primaryEmail = email_addresses.find(
      (email) => email.id === primary_email_address_id
    )?.email_address;

    if (!primaryEmail) {
      return new NextResponse("No primary email found", { status: 400 });
    }

    const userId: GetUserByClerkIdDTO = { clerkId: id };
    const options: AxiosRequestConfig = {
      method: "post",
      data: userId,
    };

    const res = await apiFetch(
      `${clientEnv.NEXT_PUBLIC_API_URL}/api/v1/users/clerk`,
      options
    );
    const user: IUser = res.data;

    if (!user)
      return new NextResponse("User not found in database", { status: 404 });

    const name = `${first_name ? first_name : ""} ${
      last_name ? last_name : ""
    }`.trim();

    if (
      image_url === user.imageUrl &&
      primaryEmail === user.email &&
      name === user.name
    ) {
      return new NextResponse("", { status: 200 });
    }

    const input: UpdateUserDTO = {
      name,
      email: primaryEmail,
      imageUrl: image_url,
    };

    for (const key in input) {
      if (
        input[key as keyof UpdateUserDTO] === user[key as keyof UpdateUserDTO]
      ) {
        delete input[key as keyof UpdateUserDTO];
      }
    }

    await apiFetch(`${clientEnv.NEXT_PUBLIC_API_URL}/api/v1/users/${user.id}`, {
      method: "put",
      data: input,
    });
  }

  return new NextResponse("Webhook recieved successfully", { status: 200 });
}
