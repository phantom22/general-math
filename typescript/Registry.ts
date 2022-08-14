/** 
 * @module
 * This module helps to create unique identifiers and store them in a registry. 
 */
const Registry = (): undefined => void 0;
/** Object that contains all the uuid/value pairs. */
Registry.generated = {};
/** Lookup table, needed for uuid generation. */
Registry.lut = "000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f606162636465666768696a6b6c6d6e6f707172737475767778797a7b7c7d7e7f808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdcecfd0d1d2d3d4d5d6d7d8d9dadbdcdddedfe0e1e2e3e4e5e6e7e8e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfeff".match(/.{1,2}/g);
Object.freeze(Registry.lut);
/**
 * Retrieve the value of a given uuid.
 * @param {string} u uuid.
 */
Registry.get = (u:string): unknown => Registry.generated[u];
/**
 * Retrieve all generated uuids.
 */
Registry.getKeys = (): string[] => Object.keys(Registry.generated);
/**
 * Deletes a given uuid from the registry.
 * @param {string} u uuid.
 */
Registry.delete = (u:string) => delete Registry.generated[u];
/**
 * Ties a given value to a randomized uuid.
 * @param {any} v value.
 * @returns {string}
 */
Registry.generateUUID = (v: any) => {
    const t = Registry.lut;
    const [a,b,c,d] = [Math.random()*0xffffffff|0,Math.random()*0xffffffff|0,Math.random()*0xffffffff|0,Math.random()*0xffffffff|0];
	const uuid = (t[a&0xff]+t[a>>8&0xff]+t[a>>16&0xff]+t[a>>24&0xff]+'-'+t[b&0xff]+t[b>>8&0xff]+'-'+t[b>>16&0x0f|0x40]+t[b>>24&0xff]+'-'+t[c&0x3f|0x80]+t[c>>8&0xff]+'-'+t[c>>16&0xff]+t[c>>24&0xff]+t[d&0xff]+t[d>>8&0xff]+t[d>>16&0xff]+t[d>>24&0xff]).toLowerCase();
    Registry.generated[uuid] = v;
	return uuid;
}
Object.freeze(Registry);