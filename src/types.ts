// src/types.ts

// Utility type for optional properties
type Optional<T> = {
    [K in keyof T]?: T[K];
};

// Type for payment arguments when creating a payment
export type PaymentArgs = {
    amount: number;       // The amount to be paid
    memo: string;         // A memo or note associated with the payment
    metadata: Record<string, any>; // Additional metadata related to the payment
    uid: string;          // User identifier
};

// Type for transaction data used in payment processing
export type TransactionData = {
    amount: number;               // The amount to be transferred
    paymentIdentifier: string;     // Unique identifier for the payment
    fromAddress: string;          // Address from which the payment is sent
    toAddress: string;            // Address to which the payment is sent
};

// Type for the payment data transfer object (DTO)
export type PaymentDTO = {
    identifier: string;           // Unique identifier for the payment
    user_uid: string;             // User identifier associated with the payment
    amount: number;               // Amount of the payment
    memo: string;                 // Memo associated with the payment
    metadata: Record<string, any>; // Additional metadata related to the payment
    from_address: string;         // Address from which the payment is sent
    to_address: string;           // Address to which the payment is sent
    direction: Direction;         // Direction of the payment (user to app or app to user)
    status: PaymentStatus;        // Status of the payment
    transaction: TransactionDetails | null; // Transaction details or null if not applicable
    created_at: string;          // Timestamp of when the payment was created
    network: NetworkPassphrase;   // Network passphrase (e.g., Pi Network or Pi Testnet)
};

// Type for payment status
export type PaymentStatus = {
    developer_approved: boolean;      // Indicates if the payment is approved by the developer
    transaction_verified: boolean;    // Indicates if the transaction is verified
    developer_completed: boolean;     // Indicates if the payment is completed by the developer
    cancelled: boolean;                // Indicates if the payment is cancelled
    user_cancelled: boolean;          // Indicates if the payment is cancelled by the user
};

// Type for transaction details
export type TransactionDetails = {
    txid: string;                     // Transaction ID
    verified: boolean;                // Indicates if the transaction is verified
    _link: string;                    // Link to the transaction details
};

// Type for network passphrase options
export type NetworkPassphrase = "Pi Network" | "Pi Testnet";

// Type for payment direction
export type Direction = "user_to_app" | "app_to_user";

// Type for Axios client options
export type AxiosClientOptions = {
    baseUrl?: string; // Optional base URL for Axios requests
    timeout?: number; // Optional timeout for requests
    headers?: Record<string, string>; // Optional headers for requests
};

// Type for API response structure
export interface ApiResponse<T> {
    success: boolean; // Indicates if the API call was successful
    data: T;         // The data returned from the API
    message?: string; // Optional message for additional context
}

// Type for user profile
export interface UserProfile {
    id: string;          // Unique identifier for the user
    username: string;    // Username of the user
    email: string;       // Email address of the user
    role: UserRole;      // Role of the user (e.g., admin, user)
    createdAt: string;   // Timestamp of when the user was created
    updatedAt: string;   // Timestamp of the last update
}

// Type for user roles
export type UserRole = "user" | "admin" | "support";

// Type for notification settings
export interface NotificationSettings {
    email: boolean; // Whether email notifications are enabled
    sms: boolean;   // Whether SMS notifications are enabled
    push: boolean;  // Whether push notifications are enabled
}

// Type for performance metrics
export interface PerformanceMetrics {
    responseTime: number; // Average response time in milliseconds
    memoryUsage: number;   // Memory usage in percentage
    cpuLoad: number;       // CPU load in percentage
}

// Type for logging events
export interface LogEvent {
    timestamp: string; // Timestamp of the log event
    level: LogLevel;   // Log level (e.g., info, error)
    message: string;   // Log message;   // Log message
    context?: Record<string, any>; // Optional context for additional information
}

// Type for log levels
export type LogLevel = "info" | "warn" | "error" | "debug";

// Type for application settings
export interface AppSettings {
    theme: "light" | "dark"; // Theme preference
    language: string;        // Language preference
    notifications: NotificationSettings; // User notification settings
}

// Type for feature flags
export interface FeatureFlags {
    newDashboard: boolean; // Flag for enabling the new dashboard feature
    betaAccess: boolean;   // Flag for beta access to new features
}

// Type for user session
export interface UserSession {
    userId: string;        // Unique identifier for the user
    token: string;         // Authentication token
    expiresAt: string;     // Expiration timestamp of the session
}

// Type for error handling
export interface ErrorResponse {
    code: number;          // Error code
    message: string;       // Error message
    details?: string;      // Optional error details
  }
