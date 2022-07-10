// based on https://gist.github.com/devsnek/77275f6e3f810a9545440931ed314dc1

'use strict';

function hex2bin(hex) {
  const buf = new Uint8Array(Math.ceil(hex.length / 2));
  for (var i = 0; i < buf.length; i++) {
    buf[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return buf;
}

const publicKey = key =>
  crypto.subtle.importKey(
    'raw',
    hex2bin(key),
    {
      name: 'NODE-ED25519',
      namedCurve: 'NODE-ED25519',
    },
    true,
    ['verify']
  );

const encoder = new TextEncoder();

export async function verify(body, signature, timestamp, pubKey) {
  const signatureBin = hex2bin(signature);
  return await crypto.subtle.verify(
    'NODE-ED25519',
    await publicKey(pubKey),
    signatureBin,
    encoder.encode(timestamp + body)
  );
}
