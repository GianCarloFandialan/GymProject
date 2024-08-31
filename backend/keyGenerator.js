import crypto from "crypto";

//QUESTO MODULO FORNISCE FUNZIONALITÀ DI CRITTOGRAFIA, COMPRESE LE FUNZIONI PER GENERARE NUMERI CASUALI SICURI.
console.log(crypto.randomBytes(64).toString("hex"));
