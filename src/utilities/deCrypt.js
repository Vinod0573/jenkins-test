import crypto from "crypto";

export const decrypt = (encryptedData) => {
  const decipher = crypto.createDecipher("aes192", "saarthi-accounts");

  let dec = decipher.update(encryptedData, "hex", "utf8");

  dec += decipher.final("utf8");
  //  console.log(dec);
  return dec;
};
