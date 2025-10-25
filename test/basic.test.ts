import { expect, test } from "vitest";
import { decrypt, encrypt } from "../src";

test("basic encrypt", () => {
	const data = { message: "Hello" };
	const buffer = encrypt(data, "pass");
	expect(buffer).toBeTypeOf("object");
	const out = decrypt(buffer, "pass");
	expect(out).toStrictEqual(data);
});
