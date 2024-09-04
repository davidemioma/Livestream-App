"use server";

import prismadb from "../prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../data/auth";
import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  TrackSource,
  type CreateIngressOptions,
} from "livekit-server-sdk";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL || "",
  process.env.LIVEKIT_API_KEY || "",
  process.env.LIVEKIT_API_SECRET || "",
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL || "");

const resetIngress = async (hostIdentity: string) => {
  try {
    const ingresses = await ingressClient.listIngress({
      roomName: hostIdentity,
    });

    const rooms = await roomService.listRooms([hostIdentity]);

    for (const room of rooms) {
      await roomService.deleteRoom(room.name);
    }

    for (const ingress of ingresses) {
      if (ingress.ingressId) {
        await ingressClient.deleteIngress(ingress.ingressId);
      }
    }
  } catch (error) {
    console.log("Error resetting ingress", error);

    throw new Error("Failed to reset ingress");
  }
};

export const createIngress = async (ingressType: IngressInput) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    //Reset previous ingress
    await resetIngress(currentUser.id);

    const options: CreateIngressOptions = {
      name: currentUser.username,
      roomName: currentUser.id,
      participantName: currentUser.username,
      participantIdentity: currentUser.id,
    };

    if (ingressType === IngressInput.WHIP_INPUT) {
      options.bypassTranscoding = true;
    } else {
      options.video = {
        source: TrackSource.CAMERA,
        // @ts-ignore
        preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      };

      options.audio = {
        source: TrackSource.MICROPHONE,
        // @ts-ignore
        preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
      };
    }

    const ingress = await ingressClient.createIngress(ingressType, options);

    if (!ingress || !ingress.url || !ingress.streamKey) {
      throw new Error("Failed to create ingress");
    }

    // Update current user stream in Db.
    await prismadb.stream.update({
      where: {
        userId: currentUser.id,
      },
      data: {
        ingressId: ingress.ingressId,
        streamKey: ingress.streamKey,
        serverUrl: ingress.url,
      },
    });

    revalidatePath(`/u/${currentUser.username}/keys`);

    return { success: true };
  } catch (error) {
    console.log("Error creating ingress", error);

    throw new Error("Failed to create ingress");
  }
};
