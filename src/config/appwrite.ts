import { Account, Avatars, Client, Databases, Storage } from 'appwrite';
import { playForward, storefront } from 'ionicons/icons';


const client = new Client()
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
const account = new Account(client);
const database = new Databases(client);
const avatars = new Avatars(client);

export {client, account, database, avatars}