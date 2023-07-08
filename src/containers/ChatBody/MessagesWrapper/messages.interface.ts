import type { PersonType } from "@/containers/GuildsList/guild";
export type AttachmentType = {
      /**
       * @description name of file attached
       */
      filename: string;
      /**
       * @description description for the file (max 1024 characters)
       */
      description?: string;
      /**
       * @description the attachment's media type
       */
      content_type?: string;
      /**
       * @description size of file in bytes
       */
      size: number;
      // /**
      //  * @description source url of file
      //  */
      // url: string;
      // /**
      //  * @description a proxied url of file
      //  */
      // proxy_url: string;
      /**
       * @description height of file (if image)
       */
      height?: number;
      /**
       * @description width of file (if image)
       */
      width?: number;
      /**
       * @description whether this attachment is ephemeral
       */
      ephemeral?: boolean;
      /**
       * @description the duration of the audio file (currently for voice messages)
       */
      duration_secs?: number;
      /**
       * @description base64 encoded bytearray representing a sampled waveform (currently for voice messages)
       */
      waveform?: string;
};

export type MessagesType = {
      id: string; //	id of the channel the message was sent in
      channel_id: string; //	id of the channel the message was sent in
      author: Partial<PersonType>; //	user object	the author of this message (not guaranteed to be a valid user, see below)
      content: string; //	string	contents of the message
      timestamp: number; // timestamp	when this message was sent
      edited_timestamp?: number; // timestamp	when this message was edited (or null if never)
      tts: boolean; //	whether this was a TTS message
      mention_everyone: boolean; //	whether this message mentions everyone
      mentions: any[]; // of user objects	users specifically mentioned in the message
      mention_roles: any[]; // of role object ids	roles specifically mentioned in this message
      mention_channels?: any[]; //	array of channel mention objects	channels specifically mentioned in this message
      attachments: AttachmentType[]; //	array of attachment objects	any attached files
      //  embeds: any[]; //	array of embed objects	any embedded content
      //  reactions?: any[]; //	array of reaction objects	reactions to the message
      nonce: number | string; //	integer or string	used for validating a message was sent
      pinned: boolean; //	whether this message is pinned
      //  webhook_id?: string; // //	snowflake	if the message is generated by a webhook, this is the webhook's id
      type: number; //	type of message
      //  activity?: any; //	message activity object	sent with Rich Presence-related chat embeds
      //  application?: any; //	partial application object	sent with Rich Presence-related chat embeds
      //  application_id?: string; //	snowflake	if the message is an Interaction or application-owned webhook, this is the id of the application
      message_reference?: string; //	message reference object	data showing the source of a crosspost, channel follow add, pin, or reply message
      flags?: number; //	integer	message flags combined as a bitfield
      referenced_message?: Partial<MessagesType>; //	?message object	the message associated with the message_reference
      //  interaction?: any; //	message interaction object	sent if the message is a response to an Interaction
      //  thread?: any; //	channel object	the thread that was started from this message, includes thread member object
      // components?: any[]; //	array of message components	sent if the message contains components like buttons, action rows, or other interactive components
      //  sticker_items?: MessageStickerItemType[]; //	array of message sticker item objects	sent if the message contains stickers
      position?: number; //	integer	A generally increasing integer (there may be gaps or duplicates) that represents the approximate position of the message in a thread, it can be used to estimate the relative position of the message in a thread in company with total_message_sent on parent thread
      //  role_subscription_data?: RoleSubscriptionDataType; //	role subscription data object	data of the role subscription purchase or renewal that prompted this ROLE_SUBSCRIPTION_PURCHASE message
};

export type MessageStickerItemType = {
      id: string; //	id of the sticker
      name: string; //	name of the sticker
      format_type: STICKER_FORMAT_TYPES; //	type of sticker format
};
export enum STICKER_FORMAT_TYPES {
      PNG = 1,
      APNG = 2,
      LOTTIE = 3,
      GIF = 4,
}
export type RoleSubscriptionDataType = {
      role_subscription_listing_id: string; //	the id of the sku and listing that the user is subscribed to
      tier_name: string; //	the name of the tier that the user is subscribed to
      total_months_subscribed: number; //	the cumulative number of months that the user has been subscribed for
      is_renewal: boolean; //	whether this notification is for a renewal rather than a new purchase
};
