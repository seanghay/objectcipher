An efficient encryption for JSON binary.

## Install

```shell
npm install jsoncipher
```

## Usage

```typescript
import fs from 'node:fs/promises'
import { encrypt, decrypt } from 'jsoncipher'

// encrypt
const pass = "husky"
const buffer = encrypt({ msg: "secret" }, pass);

await fs.writeFile("enc.bin", buffer);

// decrypt
const out = decrypt(buffer, pass);

// => {msg: "secret"}
```
## API

### `encrypt(data, password)`

Encrypts data using AES-GCM with a password-derived key.

**Parameters:**
- `data` (unknown) - Any serializable data to encrypt
- `password` (string) - Password for encryption

**Returns:** `Uint8Array` - Encrypted data

**Example:**
```ts
const encrypted = encrypt({ secret: "data" }, "myPassword123");
```

---

### `decrypt(data, password)`

Decrypts data encrypted with the encrypt function.

**Parameters:**
- `data` (Uint8Array) - Encrypted data from `encrypt()`
- `password` (string) - Password used for encryption

**Returns:** `T` - Decrypted data with original type

**Example:**
```ts
const decrypted = decrypt<{ secret: string }>(encrypted, "myPassword123");
console.log(decrypted.secret); // "data"
```