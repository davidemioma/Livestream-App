"use server";

import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "../data/auth";
import { AccessToken } from "livekit-server-sdk";
import { getUserById, isBlockedByUser } from "../data/user";

export const createViewerToken = async (hostIdentity: string) => {
  try {
    let self;

    // Set self to either current user or guest
    try {
      self = await getCurrentUser();
    } catch (err) {
      const id = uuidv4();

      const username = `guest#${Math.random() * 10000}`;

      self = { id, username };
    }

    // Get the host
    const host = await getUserById(hostIdentity);

    if (!host) {
      throw new Error("User not found");
    }

    // check if the host blocked the current user
    const isBlocked = await isBlockedByUser(host.id);

    if (isBlocked) {
      throw new Error("User is blocked");
    }

    // Check if current user is same as host
    const isHost = self.id === host.id;

    // Create the token and create room
    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY || "",
      process.env.LIVEKIT_API_SECRET || "",
      {
        identity: isHost ? `host-${self.id}` : self.id,
        name: self.username,
      },
    );

    token.addGrant({
      room: host.id,
      roomJoin: true,
      canPublish: false,
      canPublishData: true,
    });

    return await Promise.resolve(token.toJwt());
  } catch (err) {
    console.log("Failed to create viewer token", err);

    throw new Error("Failed to create viewer token");
  }
};
