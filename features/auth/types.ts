export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
  PENDING = "pending",
}

export enum SocialMediaPlatform {
  FACEBOOK = "facebook",
  TWITTER = "twitter",
  INSTAGRAM = "instagram",
  LINKEDIN = "linkedin",
  TIKTOK = "tiktok",
}

export enum UserRole {
  superAdmin = "superAdmin",
  admin = "admin",
  warehouseManager = "warehouseManager",
  billingManager = "billingManager",
  orderManager = "orderManager",
  invoiceManager = "invoiceManager",
  vendor = "vendor",
  storeKeeper = "storeKeeper",
  driver = "driver",
  user = "user",
}

// Permission interface
export interface Permission {
  resource: string; // e.g., "orders", "products"
  actions: string[]; // e.g., ["create", "read", "update", "delete"]
}

// Role interface
export interface Role {
  _id?: string;
  name: string;
  permissions: Permission[];
  level: number;
  created_at?: string;
  updated_at?: string;
}

// User Settings - Notifications
export interface Notifications {
  email_notifications: boolean;
  sms_notifications: boolean;
  app_alerts: boolean;
  newsletter: boolean;
  promotion: boolean;
}

// User Settings
export interface UserSettings {
  _id?: string;
  user: string;
  dark_mode?: boolean;
  two_factor_authentication?: boolean;
  notifications: Notifications;
}

// User Metadata
export interface UserMetadata {
  _id?: string;
  user: string;
  session_count?: number;
  account_deactivated_at?: string;
  account_activated_at?: string;
  last_activation_email_sent_at?: string;
  last_login_at?: string;
  last_failed_login_at?: string;
  last_successful_login_at?: string;
  last_logout_at?: string;
  last_logout_all_at?: string;
  last_refresh_at?: string;
  last_activity_at?: string;
  last_password_change_at?: string;
  last_password_reset_at?: string;
}

// User interface
export interface User {
  _id?: string;
  full_name: string;
  email: string;
  role: Role | string;
  postgres_id?: string;
  address_line_1?: string;
  address_line_2?: string;
  phone_number: string;
  social_media?: Record<string, string>;
  avatar?: string;
  role_name: string;
  status: UserStatus;
  email_verified: boolean;
  settings?: UserSettings | string;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
}
