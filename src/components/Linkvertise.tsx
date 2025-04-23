export const linkvertise = function (user_id: string, options: { whitelist?: string[]; blacklist?: string[] }) {
  convert(user_id, options);
};

const convert = async function (user_id: string, options: { whitelist?: string[]; blacklist?: string[] }) {
  function str2ab(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  const pemEncodedKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1piHDY9WRIehbfC3Fpol
Ly/WrJF8TKFVdDMobj3fkNjN/69dTv9JgXt+gcJxVn/h4NCMtQ2mCQXNBMXzLOky
HJipiFMoyPtOOlMlbWRAiaQE1GpMebGNRcsxYnWzF53v63+hUQgrMahH9X0Ii/NJ
hvDyFlPX77+z9xiyd45L+xrgayePpOxvQpj6VJDlpNNKWbuIkFvkMmUVRM2TLulL
JSgs4EgoBZgTYRpmhgR8tYfDOW+cOctffggcMAzKUC2CzYNmhzX15O7DKaZdYgfa
BR/hqvyNAxBepHOJnBfHkQqaox5diHGqdwXXLwiJKzoK5R26vaI3jg2+d69VPSGL
0QIDAQAB
-----END PUBLIC KEY-----`;

  const importKey = async function (pemEncodedKey: string): Promise<CryptoKey> {
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = pemEncodedKey.substring(
      pemHeader.length,
      pemEncodedKey.length - pemFooter.length - 1
    );
    const binaryDerString = window.atob(pemContents);
    const binaryDer = str2ab(binaryDerString);
    return await window.crypto.subtle.importKey(
      "spki",
      binaryDer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256", 
      },
      true,
      ["encrypt"]
    );
  };

  try {
    const elements = document.querySelectorAll<HTMLAnchorElement>("a[href]");

    for (const link of elements) {
      const base_href = markup(link.href);

      if (!base_href.startsWith("http://") && !base_href.startsWith("https://")) {
        continue;
      }

      if (options.blacklist?.length) {
        const filteredBlacklist = options.blacklist.filter((pattern) => pattern.trim() !== "");
        const isBlacklisted = filteredBlacklist.some((pattern) => str_is(pattern, base_href));
        if (isBlacklisted) {
          continue;
        }
      }

      if (options.whitelist?.length) {
        const isWhitelisted = options.whitelist.some((pattern) => str_is(pattern, base_href));
        if (!isWhitelisted) {
          continue;
        }
      }

      const encodedHref = new TextEncoder().encode(base_href);

      let part1: Uint8Array, part2: string;
      if (encodedHref.length > 70) {
        part1 = encodedHref.slice(0, 70);
        part2 = new TextDecoder().decode(encodedHref.slice(70));
      } else {
        part1 = encodedHref;
        part2 = "";
      }

      const encryptedHref = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        await importKey(pemEncodedKey),
        part1
      );

      let binary = "";
      const bytes = new Uint8Array(encryptedHref);
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const encryptedHrefBase64 = btoa(binary);

      const fullEncryptedHref = `${encryptedHrefBase64}${part2}`;

      const base_url = `https://link-to.net/${user_id}/${Math.random() * 1000}/dynamic/`;

      link.href = `${base_url}?r=${fullEncryptedHref}&v=2`;
      link.target = "_blank";
    }
  } catch (error) {
    console.error("Error during key import or link processing:", error);
  }
};

const markup = (href: string): string => {
  const link = document.createElement("a");
  link.href = href;
  return link.href.endsWith("/") ? link.href.slice(0, -1) : link.href;
};

const str_is = (pattern: string, value: string): boolean => {
  if (!pattern.includes("*")) pattern = `*${pattern}*`;
  const regexPattern = pattern.replace(/\*/g, ".*");
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(value);
};