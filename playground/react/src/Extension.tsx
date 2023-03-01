import { getPubkeyFromExtension, useCurrentUser } from "@nostr-stack/react";
/**
 * Testing out event signing with browser extension like nos2x
 */

export const Extension = () => {
  const { pubkey } = useCurrentUser();
  console.log(pubkey);
  return null;
};
