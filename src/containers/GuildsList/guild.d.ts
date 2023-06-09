import type { ChannelType } from "@/components/ChannelsList/channels.interface";

export type ResponseGuildType = GuildType & { channels: ChannelType[] };
export type GuildType = {
      id: string; //	the guilds's id	identify
      name: string; //guild name (2-100 characters, excluding trailing and leading whitespace)
      icon?: string; //icon hash
      icon_hash?: string; //	icon hash, returned when in the template object
      splash?: string; //	splash hash
      discovery_splash?: string; //	discovery splash hash; only present for guilds with the "DISCOVERABLE" feature
      owner_id: string; //	id of owner
      afk_channel_id?: string; //	id of afk channel
      afk_timeout: number; //	afk timeout in seconds
      widget_enabled?: boolean; //	true if the server widget is enabled
      widget_channel_id?: string; //	the channel id that the widget will generate an invite to, or null if set to no invite
      verification_level: VERIFICATION_LEVEL; //	verification level required for the guild
      default_message_notifications: DEFAULT_MESSAGE_NOTIFICATIONS_LEVEL; //	default message notifications level
      explicit_content_filter: EXPLICIT_CONTENT_LEVEL; //	explicit content filter level
      roles: UserRolesType[]; // of role objects	roles in the guild
      emojis: any[]; // of emoji objects	custom guild emojis
      features: GuildFeaturesType[]; // of guild feature strings	enabled guild features
      mfa_level: MFA_LEVEL; //	required MFA level for the guild
      application_id: string; //	application id of the guild creator if it is bot-created
      system_channel_id: string; //	the id of the channel where guild notices such as welcome messages and boost events are posted
      system_channel_flags: SYSTEM_CHANNEL_FLAGS; //	system channel flags
      rules_channel_id: string; //	the id of the channel where Community guilds can display rules and/or guidelines
      max_presences?: number; //	the maximum number of presences for the guild (null is always returned, apart from the largest of guilds)
      max_members?: number; // 	the maximum number of members for the guild
      vanity_url_code?: string; //	the vanity url code for the guild
      description?: string; //	the description of a guild
      banner?: string; //	banner hash
      premium_tier: number; //	premium tier (Server Boost level)
      premium_subscription_count?: number; //	the number of boosts this guild currently has
      preferred_locale: string; //	the preferred locale of a Community guild; used in server discovery and notices from Discord, and sent in interactions; defaults to "en-US"
      public_updates_channel_id?: string; //	the id of the channel where admins and moderators of Community guilds receive notices from Discord
      max_video_channel_users?: number; //the maximum amount of users in a video channel
      max_stage_video_channel_users?: number; //the maximum amount of users in a stage video channel
      approximate_member_count?: number; //	approximate number of members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true
      approximate_presence_count?: number; //integer	approximate number of non-offline members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true
      welcome_screen?: WelcomeScreen; //	welcome screen object	the welcome screen of a Community guild, shown to new members, returned in an Invite's guild object
      nsfw_level: NSFW_LEVEL; //	guild NSFW level
      stickers?: StickerType[]; //	array of sticker objects	custom guild stickers
      premium_progress_bar_enabled: boolean; //	whether the guild has the boost progress bar enabled
      // safety_alerts_channel_id:
};
export type PersonType = {
      id: string; //	the user's id	identify
      password?: string; //	the user's password
      username: string; //	the user's username, not unique across the platform	identify
      avatar?: string; //	the user's avatar hash	identify
      bot?: boolean; //	whether the user belongs to an OAuth2 application	identify
      system?: boolean; //	whether the user is an Official Discord System user (part of the urgent message system)	identify
      mfa_enabled?: boolean; //	whether the user has two factor enabled on their account	identify
      banner?: string; //	the user's banner hash	identify
      accent_color?: string; //	the user's banner color encoded as an integer representation of hexadecimal color code	identify
      locale?: string; //	the user's chosen language option	identify
      verified?: boolean; //	whether the email on this account has been verified	email
      email?: string; //	the user's email	email
};

export type UserRolesType = {
      id: string; //	role id
      name: string; //	role name
      color: number; //	integer representation of hexadecimal color code
      hoist: boolean; //	if this role is pinned in the user listing
      icon?: string; //	role icon hash
      unicode_emoji?: string; //	role unicode emoji
      position: number; //	position of this role
      permissions: string; //	permission bit set
      managed: boolean; //	whether this role is managed by an integration
      mentionable: boolean; //	whether this role is mentionable
      tags?: RoleTagType; //	role tags object	the tags this role has
};
export type RoleTagType = {
      bot_id?: string; //	the id of the bot this role belongs to
      integration_id?: string; //	the id of the integration this role belongs to
      premium_subscriber?: null; //	whether this is the guild's Booster role
      subscription_listing_id?: string; //	the id of this role's subscription sku and listing
      available_for_purchase?: null; //	whether this role is available for purchase
      guild_connections?: null; //	whether this role is a guild's linked role
};
export type WelcomeChannel = {
      channel_id: string;
      description: string;
      emoji_id: string | null;
      emoji_name: string;
};
export type WelcomeScreen = {
      description: string;
      welcome_channels: WelcomeChannel[];
};
export type StickerType = {
      id: string; //	id of the sticker
      pack_id?: string; //	for standard stickers, id of the pack the sticker is from
      name: string; //	name of the sticker
      description?: string; //	description of the sticker
      tags: string; //	autocomplete/suggestion tags for the sticker (max 200 characters)
      asset?: string; //	Deprecated previously the sticker asset hash, now an empty string
      type: STICKER_TYPES_ENUM; //	type of sticker
      format_type: STICKER_FORMAT_TYPES; //	type of sticker format
      available?: boolean; //	whether this guild sticker can be used, may be false due to loss of Server Boosts
      guild_id?: string; //	id of the guild that owns this sticker
      user?: PersonType; // user object	the user that uploaded the guild sticker
      sort_value?: number; //	the standard sticker's sort order within its pack
};
export enum STICKER_TYPES_ENUM {
      STANDARD = 1, //an official sticker in a pack, part of Nitro or in a removed purchasable pack
      GUILD = 2, //a sticker uploaded to a guild for the guild's members
}
export enum STICKER_FORMAT_TYPES {
      PNG = 1,
      APNG = 2,
      LOTTIE = 3,
      GIF = 4,
}
export type GuildFeaturesType =
      | "ANIMATED_BANNER" //	guild has access to set an animated guild banner image
      | "ANIMATED_ICON" //	guild has access to set an animated guild icon
      | "APPLICATION_COMMAND_PERMISSIONS_V2" //	guild is using the old permissions configuration behavior
      | "AUTO_MODERATION" //	guild has set up auto moderation rules
      | "BANNER" //	guild has access to set a guild banner image
      | "COMMUNITY" //	guild can enable welcome screen, Membership Screening, stage channels and discovery, and receives community updates
      | "CREATOR_MONETIZABLE_PROVISIONAL" //	guild has enabled monetization
      | "CREATOR_STORE_PAGE" //	guild has enabled the role subscription promo page
      | "DEVELOPER_SUPPORT_SERVER" //	guild has been set as a support server on the App Directory
      | "DISCOVERABLE" //	guild is able to be discovered in the directory
      | "FEATURABLE" //	guild is able to be featured in the directory
      | "INVITES_DISABLED" //	guild has paused invites, preventing new users from joining
      | "INVITE_SPLASH" //	guild has access to set an invite splash background
      | "MEMBER_VERIFICATION_GATE_ENABLED" //	guild has enabled Membership Screening
      | "MORE_STICKERS" //	guild has increased custom sticker slots
      | "NEWS" //	guild has access to create announcement channels
      | "PARTNERED" //	guild is partnered
      | "PREVIEW_ENABLED" //	guild can be previewed before joining via Membership Screening or the directory
      | "RAID_ALERTS_DISABLED" //	guild has disabled alerts for join raids in the configured safety alerts channel
      | "ROLE_ICONS" //	guild is able to set role icons
      | "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE" //	guild has role subscriptions that can be purchased
      | "ROLE_SUBSCRIPTIONS_ENABLED" //	guild has enabled role subscriptions
      | "TICKETED_EVENTS_ENABLED" //	guild has enabled ticketed events
      | "VANITY_URL" //	guild has access to set a vanity URL
      | "VERIFIED" //	guild is verified
      | "VIP_REGIONS" //	guild has access to set 384kbps bitrate in voice (previously VIP voice servers)
      | "WELCOME_SCREEN_ENABLED"; //	guild has enabled the welcome screen

export enum SYSTEM_CHANNEL_FLAGS {
      SUPPRESS_JOIN_NOTIFICATIONS = 1 << 0, //	Suppress member join notifications
      SUPPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1, //	Suppress server boost notifications
      SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 1 << 2, //	Suppress server setup tips
      SUPPRESS_JOIN_NOTIFICATION_REPLIES = 1 << 3, //	Hide member join sticker reply buttons
      SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS = 1 << 4, //	Suppress role subscription purchase and renewal notifications
      SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES = 1 << 5, //	Hide role subscription sticker reply buttons
}
export enum DEFAULT_MESSAGE_NOTIFICATIONS_LEVEL {
      ALL_MESSAGES = 0, //	members will receive notifications for all messages by default
      ONLY_MENTIONS = 1, //	members will receive notifications only for messages that @mention them by default
}
export enum MFA_LEVEL {
      NONE = 0, //	guild has no MFA/2FA requirement for moderation actions
      ELEVATED = 1, //	guild has a 2FA requirement for moderation actions
}
export enum EXPLICIT_CONTENT_LEVEL {
      DISABLED = 0, //	media content will not be scanned
      MEMBERS_WITHOUT_ROLES = 1, //	media content sent by members without roles will be scanned
      ALL_MEMBERS = 2, //	media content sent by all members will be scanned
}
export enum NSFW_LEVEL {
      DEFAULT = 0,
      EXPLICIT = 1,
      SAFE = 2,
      AGE_RESTRICTED = 3,
}
export enum VERIFICATION_LEVEL {
      NONE = 0, //	unrestricted
      LOW = 1, //	must have verified email on account
      MEDIUM = 2, //	must be registered on Discord for longer than 5 minutes
      HIGH = 3, //	must be a member of the server for longer than 10 minutes
      VERY_HIGH = 4, //	must have a verified phone number
}
