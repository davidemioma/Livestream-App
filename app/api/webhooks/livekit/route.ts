import prismadb from "@/lib/prisma";
import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY || "",
  process.env.LIVEKIT_API_SECRET || "",
);

export async function POST(req: Request) {
  const body = await req.text();

  const headerPayload = headers();

  const authorization = headerPayload.get("Authorization");

  if (!authorization) {
    return new Response("Unauthorized", { status: 401 });
  }

  const event = await receiver.receive(body, authorization);

  if (event.event === "ingress_started") {
    await prismadb.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: true,
      },
    });
  }

  if (event.event === "ingress_ended") {
    await prismadb.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: false,
      },
    });
  }

  return new Response("", { status: 200 });
}
