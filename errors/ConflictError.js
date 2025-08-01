/**
 * ConflictError is a custom error type used to represent a conflict error,
 * such as when a resource already exists.
 *
 * Supports both single and multiple error messages and formats them
 * for consistent API responses.
 *
 * The HTTP status code is set to 409 (Conflict).
 *
 * Example usage:
 *
 * throw new ConflictError('Username already exists');
 *
 * throw new ConflictError([
 *  'Username already exists',
 *  'Email already registered'
 * ]);
 */

class ConflictError extends Error {
  /**
   * @param {string|string[]} messageOrMessages - A single error message or an array of messages.
   */
  constructor(messageOrMessages) {
    // Convert an array of messages into a string or pass through a string directly
    const message = Array.isArray(messageOrMessages)
      ? messageOrMessages.join('; ')
      : messageOrMessages;

    // Call the base Error constructor with the given message
    super(message);

    /** @type {string} */
    this.name = 'ConflictError';

    /** @type {number} */
    this.status = 409;

    /**
     * The original error messages as an array.
     * Use this property to access individual error messages.
     * @type {string[]}
     */
    this.details = Array.isArray(messageOrMessages)
      ? messageOrMessages
      : [messageOrMessages];
  }
}

module.exports = ConflictError;
