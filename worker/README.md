# Gaileia shared visibility service

This Cloudflare Worker stores the entry IDs marked **GM Only**. PC browsers read the shared list, while updates require the GM passcode.

Deployment checklist:

1. Create a Cloudflare KV namespace for the compendium visibility list.
2. Replace both placeholder namespace IDs in `wrangler.toml`.
3. Set the Worker secret `GM_PASSCODE_SHA256` to the SHA-256 hash of the GM passcode.
4. Deploy the Worker.
5. Put the deployed Worker URL in `preview/assets/js/visibility-config.js`.

The service controls what ordinary PC viewers see in the interface. Because GitHub Pages and this repository are public, it does not encrypt or remove the underlying catalogue text from the published JavaScript files.
