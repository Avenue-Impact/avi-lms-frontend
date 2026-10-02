/**
 * Utility functions for generating, formatting, and validating payment references.
 */

// Maximum supported character limit for standard payment references (35 chars)
export const MAX_PAYMENT_REF_LENGTH = 35;

/**
 * Format and sanitize a raw reference string according to payment processor rules:
 * - Removes unsupported special characters (allows letters, numbers, spaces, hyphens, underscores)
 * - Strips leading and trailing spaces
 * - Collapses multiple internal spaces
 * - Enforces maximum character length
 * 
 * @param {string} rawText 
 * @param {number} [maxLength=MAX_PAYMENT_REF_LENGTH] 
 * @returns {string}
 */
export function formatPaymentReference(rawText, maxLength = MAX_PAYMENT_REF_LENGTH) {
  if (!rawText || typeof rawText !== "string") return "";

  // Strip unsupported special characters (keep letters, digits, spaces, hyphens, underscores)
  const sanitized = rawText.replace(/[^\p{L}\p{N}\s\-_]/gu, "");

  // Remove leading/trailing spaces and collapse inner spaces
  const trimmed = sanitized.trim().replace(/\s+/g, " ");

  // Truncate to maximum character limit
  if (trimmed.length > maxLength) {
    return trimmed.slice(0, maxLength).trim();
  }

  return trimmed;
}

/**
 * Automatically populates payment reference from a user profile object in format "FirstName LastName".
 * Handles missing fields and formatting limits.
 * 
 * @param {Object} user 
 * @param {number} [maxLength=MAX_PAYMENT_REF_LENGTH] 
 * @returns {string}
 */
export function getAutoPaymentReference(user, maxLength = MAX_PAYMENT_REF_LENGTH) {
  if (!user || typeof user !== "object") return "";

  const firstName = user.first_name || user.firstname || user.firstName || "";
  const lastName = user.last_name || user.lastname || user.lastName || "";

  const fullName = `${firstName} ${lastName}`.trim();
  return formatPaymentReference(fullName, maxLength);
}

/**
 * Validates a payment reference string before submission.
 * 
 * @param {string} reference 
 * @param {number} [maxLength=MAX_PAYMENT_REF_LENGTH] 
 * @returns {{ isValid: boolean, formatted: string, error?: string }}
 */
export function validatePaymentReference(reference, maxLength = MAX_PAYMENT_REF_LENGTH) {
  const formatted = formatPaymentReference(reference, maxLength);
  
  if (!formatted) {
    return {
      isValid: false,
      formatted: "",
      error: "Please enter a valid payment reference before payment submission.",
    };
  }

  return {
    isValid: true,
    formatted,
  };
}
