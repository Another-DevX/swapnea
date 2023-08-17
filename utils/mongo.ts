const { MongoClient, ObjectId } = require("mongodb");
// URL de conexión a tu base de datos MongoDB
const url =
  "mongodb+srv://alejandro99s:ethargentina123@cluster0.4azsyw7.mongodb.net/"; // Cambia esto según tu configuración

// Nombre de la base de datos
const dbName = "ethargentina"; // Cambia esto según tu base de datos

export async function addProvider(data: any) {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("providers");
    // Insertar el objeto en la colección
    await collection.findOneAndUpdate(
      { from: data.from },
      { $set: data },
      { upsert: true }
    );
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Cerrar la conexión
    client.close();
  }
}
export async function getTrx(country: string) {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("providers");
    const validator = await collection.findOne({ country });
    return validator;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Cerrar la conexión
    client.close();
  }
}

export async function validateValue(data: any) {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("providers");
    // Insertar el objeto en la colección
    const _provider = await collection.findOne({ from: data.provider });
    return {
      isValid: _provider.price * data.amountUsed - data.amount == 0,
      address: _provider.address,
    };
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Cerrar la conexión
    client.close();
  }
}

export async function createTrx(data: any) {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("trxs");
    const _trx = await collection.insertOne(data);
    return _trx;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Cerrar la conexión
    client.close();
  }
}

export async function validateTrx(id: string) {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("trxs");
    const _trx = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { state: "validated" } }
    );
    return _trx;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Cerrar la conexión
    client.close();
  }
}
export async function updateTrx(data: any, id: string) {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("trxs");
    const _trx = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return _trx;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Cerrar la conexión
    client.close();
  }
}
