import mongoose, {Mongoose} from 'mongoose';

const MONGODB_URL ="mongodb+srv://admin:9954@vino.krv1jrw.mongodb.net/?retryWrites=true&w=majority&appName=vino";

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// cahing now for flushing and making server clearn and work in proper memory management

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
  cached = (global as any).mongoose = { 
    conn: null, promise: null 
  }
}

export const connectToDatabase = async () => {
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'vino-saas-ai', bufferCommands: false 
    })

  cached.conn = await cached.promise;

  return cached.conn;
} // go after documentation {it is copied so read properly}
