import { pack, unpack } from "msgpackr";
import { randomBytes } from "@noble/ciphers/utils.js";
import { gcm } from "@noble/ciphers/aes.js";
import { scrypt } from "@noble/hashes/scrypt.js";

/**
 * Encrypts data using AES-GCM with a password-derived key.
 *
 * @param data - Any serializable data to encrypt
 * @param password - Password string for encryption
 * @returns Encrypted data as Uint8Array
 *
 * @example
 * ```ts
 * const encrypted = encrypt({ secret: "data" }, "myPassword123");
 * ```
 */
export function encrypt(data: unknown, password: string): Uint8Array {
	const salt = randomBytes(24);
	const key = scrypt(password, salt, {
		N: 2 ** 10,
		r: 8,
		dkLen: 32,
		p: 1,
	});
	const nonce = randomBytes(24);
	const aes = gcm(key, nonce);
	const buffer = aes.encrypt(pack(data));
	return pack([salt, nonce, buffer]);
}

/**
 * Decrypts data encrypted with the encrypt function.
 *
 * @param data - Encrypted Uint8Array from encrypt()
 * @param password - Password string used for encryption
 * @returns Decrypted data with original type
 *
 * @example
 * ```ts
 * const decrypted = decrypt<{ secret: string }>(encrypted, "myPassword123");
 * console.log(decrypted.secret); // "data"
 * ```
 */
export function decrypt<T = unknown>(data: Uint8Array, password: string): T {
	const [salt, nonce, buffer] = unpack(data);
	const key = scrypt(password, salt, {
		N: 2 ** 10,
		r: 8,
		dkLen: 32,
		p: 1,
	});
	const aes = gcm(key, nonce);
	return unpack(aes.decrypt(buffer));
}
